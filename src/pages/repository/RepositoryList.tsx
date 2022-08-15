import { Box } from "@mui/material";
import React, { useState } from "react";
import SearchInput from "../../components/SearchInput/SearchInput";
import TableComponent from "../../components/table/TableComponent";
import { RepoTyp } from "../../utils/types";
import { BOX_STYLE, CONTAINER_STYLE } from "./styles";
import { gql, useQuery } from "@apollo/client";

const TOPIC_QUERY = "topic:react";
const COUNT = 50;
const GET_REPOS = gql`
  query Repos($query: String!, $count: Int) {
    search(type: REPOSITORY, query: $query, first: $count) {
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
  }
`;

const RepositoryList = () => {
  const [repoList, setRepoList] = useState([]);
  const { data, loading } = useQuery(GET_REPOS, {
    variables: { query: TOPIC_QUERY, count: COUNT },
  });

  const masterList = data?.search?.repos;

  let list: {
    repo: RepoTyp;
  }[];

  if (loading) {
    list = [];
  } else if (repoList.length !== 0) {
    list = repoList;
  } else {
    list = data.search.repos;
  }

  // filter repos based on input keyword
  const filterRepos = (val: string) => {
    let filteredList = masterList.filter((item: { repo: RepoTyp }) => {
      const { repo } = item;
      return repo.name.toLowerCase().includes(val.toLowerCase());
    });
    // set new repo list after filter
    setRepoList(filteredList);
  };

  return (
    <Box sx={BOX_STYLE} data-testid="repositoryList">
      <SearchInput onChange={filterRepos} />
      <div style={CONTAINER_STYLE}>
        <TableComponent repos={list} />
      </div>
    </Box>
  );
};

export default RepositoryList;
