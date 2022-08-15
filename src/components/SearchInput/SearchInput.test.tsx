import { render, screen } from "@testing-library/react";
import SearchInput from "./SearchInput";

describe("test SearchInput", () => {
  it("should render input field", () => {
    render(<SearchInput onChange={() => {}} />);
    const searchInput = screen.getByTestId("searchInput");
    expect(searchInput).toBeTruthy();
  });
});
