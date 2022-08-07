import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchInput from "../../components/SearchInput/SearchInput";
import TableComponent from "../../components/table/TableComponent";
import { getRepositories } from "../../services/api";
import { RepoTyp } from "../../utils/types";
import { BOX_STYLE, CONTAINER_STYLE } from "./styles";

const TOPIC = "react";
const COUNT = 50;

const RepositoryList = () => {
  const [repoList, setRepoList] = useState([]);
  const [masterList, setMasterList] = useState([]);

  useEffect(() => {
    // to get repolist
    const fetchRepos = async () => {
      const response = await getRepositories(TOPIC, COUNT);
      setRepoList(response);
      setMasterList(response);
    };
    fetchRepos();
  }, []);

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
    <Box sx={BOX_STYLE}>
      <SearchInput onChange={filterRepos} />
      <div style={CONTAINER_STYLE}>
        <TableComponent repos={repoList} />
      </div>
    </Box>
  );
};

export default RepositoryList;
