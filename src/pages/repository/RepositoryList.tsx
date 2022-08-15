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
  query Repos(
    $query: String!
    $first: Int
    $after: String
    $before: String
    $last: Int
  ) {
    search(
      type: REPOSITORY
      query: $query
      first: $first
      after: $after
      before: $before
      last: $last
    ) {
      repos: edges {
        cursor
        repo: node {
          ... on Repository {
            name
            forkCount
            stargazerCount
            url
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
`;

const RepositoryList = () => {
  const [firstCount, setFirstCount] = useState<number | null>(5);
  const [lastCount, setLastCount] = useState<number | null>();
  const [after, setAfter] = useState();
  const [before, setBefore] = useState();

  const [repoList, setRepoList] = useState([]);
  const { data, loading } = useQuery(GET_REPOS, {
    variables: {
      query: TOPIC_QUERY,
      first: firstCount,
      after: after,
      before: before,
      last: lastCount,
    },
  });

  const masterList = data?.search?.repos;

  // console.log("data", data);

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
  // console.log("list", list);

  // change handler called after changing page
  const changeHandler = (pageDirection: string) => {
    console.log("direction", pageDirection);
    if (pageDirection === "next") {
      setAfter(data.search.pageInfo.endCursor);
    } else if (pageDirection === "prev") {
      console.log("start", data.search.pageInfo.startCursor);
      setBefore(data.search.pageInfo.startCursor);
      setLastCount(5);
      setFirstCount(null);
    }
  };

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
        <TableComponent repos={list} onPageChange={changeHandler} />
      </div>
    </Box>
  );
};

export default RepositoryList;
