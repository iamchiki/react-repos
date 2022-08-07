export const TABLE_CONTAINER_STYLE = {
  width: "60%",
  margin: "auto",
  height: "55vh",
};
export const TABLE_STYLE = { minWidth: 500, height: "55vh" };
export const TABLE_CELL_STYLE = { width: 160 };
export const TABLE_FOOTER_STYLE = {
  position: "sticky",
  bottom: 0,
  background: "#fff",
};
export let tableRowStyle = (emptyRowCount: number) => {
  return { height: 53 * emptyRowCount };
};
