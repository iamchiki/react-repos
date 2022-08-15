import React from "react";
import TextField from "@mui/material/TextField";

type onChangeHandler = (inputValue: string) => void;

const SearchInput: React.FC<{ onChange: onChangeHandler }> = (props) => {
  const { onChange } = props;

  //take input values onchange of input field
  const inputChagneHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange(event.target.value);
  };
  return (
    <TextField
      onChange={inputChagneHandler}
      id="standard-basic"
      label="Search Name"
      variant="standard"
      data-testid="searchInput"
    />
  );
};

export default SearchInput;
