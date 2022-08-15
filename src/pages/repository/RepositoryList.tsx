import { Box } from "@mui/material";
import React, { useState } from "react";
import SearchInput from "../../components/SearchInput/SearchInput";
import TableComponent from "../../components/table/TableComponent";
import { RepoTyp } from "../../utils/types";
import { BOX_STYLE, CONTAINER_STYLE } from "./styles";
import { gql, useQuery } from "@apollo/client";

const TOPIC_QUERY = "topic:react";
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
      repositoryCount
      pageInfo {
        hasNextPage
        endCursor
        startCursor
      }
    }
  }
`;

const RepositoryList = () => {
  const [limit, setLimit] = useState<number | null>(5);
  const [firstCount, setFirstCount] = useState<number | null>(5);
  const [lastCount, setLastCount] = useState<number | null>();
  const [after, setAfter] = useState<string | null>();
  const [before, setBefore] = useState<string | null>();

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

  let totalRepos: number = 0;
  if (data) {
    totalRepos = data.search.repositoryCount;
  }
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

  // change handler called after changing page
  const changeHandler = (pageDirection: string) => {
    if (pageDirection === "next") {
      setAfter(data.search.pageInfo.endCursor);
      setBefore(null);
      setLastCount(null);
      setFirstCount(limit);
    } else if (pageDirection === "prev") {
      setBefore(data.search.pageInfo.startCursor);
      setLastCount(limit);
      setFirstCount(null);
      setAfter(null);
    }
  };

  const limitChangeHandler = (pageLimit: number) => {
    setLimit(pageLimit);
    setFirstCount(pageLimit);
    setAfter(null);
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
        <TableComponent
          repos={list}
          onPageChange={changeHandler}
          onChangeLimit={limitChangeHandler}
          repositoryCount={totalRepos}
        />
      </div>
    </Box>
  );
};

export default RepositoryList;
