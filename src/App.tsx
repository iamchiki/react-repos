import { Button, Stack } from "@mui/material";

function App() {
  return (
    <div className="App">
      <h1>app</h1>
      <Stack direction="row" spacing={2}>
        <Button variant="contained">Contained</Button>
        <Button variant="contained" disabled>
          Disabled
        </Button>
        <Button variant="contained" href="#contained-buttons">
          Link
        </Button>
      </Stack>
    </div>
  );
}

export default App;
