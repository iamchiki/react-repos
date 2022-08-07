import { API_URL, AUTH_TOKEN } from "../utils/constants";

let myHeaders = new Headers();
myHeaders.append("Authorization", `Bearer ${AUTH_TOKEN}`);
myHeaders.append("Content-Type", "application/json");

// fetch all repos github api
export const getRepositories = async (topic: string, totalCount: number) => {
  let repoList = [];

  const graphql = JSON.stringify({
    query: `{
      search(type: REPOSITORY, query: "topic:${topic}", last: ${totalCount}) {
        repos: edges {
          repo: node {
            ... on Repository {
              name
              forkCount
              stargazerCount
              url
            }
          }
        }
      }
    }`,
    variables: {},
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: graphql,
  };
  try {
    const url = API_URL; //github api url
    const response = await fetch(url, requestOptions as RequestInit);
    const result = await response.json();
    repoList = result.data.search.repos;
  } catch (error) {}

  return repoList;
};
