import axios from "axios";

/**
 *
 * @param {string} user username
 * @param {object} option
 * @return {string[]}
 */
export const listRepos = async (user) => {
  const endpoint = "https://api.github.com/graphql";
  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    throw new Error("no GITHUB_TOKEN variable found.");
  }

  const repositories = [];
  let nextCursor = null;
  let isCompleted = false;

  while (!isCompleted) {
    const gqlargument = nextCursor
      ? `first: 100, after: "${nextCursor}"`
      : "first: 100";
    const { data } = await axios
      .post(
        endpoint,
        {
          query: `query {
            user(login: "${user}") {
              repositories(${gqlargument}) {
                edges {
                  cursor
                  node {
                    name
                  }
                }
              }
            }
          }`,
        },
        {
          headers: {
            Authorization: `bearer ${token}`,
          },
        }
      )
      .catch((err) => {
        throw err;
      });

    const { edges } = data.data.user.repositories;
    if (edges.length === 0) {
      isCompleted = true;
    } else {
      const result = edges.reduce(
        (prev, edge) => {
          prev.names.push(`${user}/${edge.node.name}`);
          prev.nextCursor = edge.cursor;
          return prev;
        },
        { names: [], nextCursor: null }
      );
      repositories.push(...result.names);
      nextCursor = result.nextCursor;
    }
  }

  return repositories;
};
