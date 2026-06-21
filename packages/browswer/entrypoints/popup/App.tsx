import { Button, ToggleButton, Container, Reshaped } from "reshaped";
import ToggleSvgIcon from "../../components/toggle-icon";
import "./App.css";
import ServerStatus from "../../components/status";
function App() {
  return (
    <Reshaped colorMode="dark" theme="slate">
      <Container width="352px" className="popup">
        <h1>SkullMaster 💀</h1>
        <ServerStatus />
        <ToggleButton size="xlarge" color="critical" icon={<ToggleSvgIcon />}></ToggleButton>
        <Button href="ajth.in/skullmaster">Docs</Button>
      </Container>
    </Reshaped>
  );
}

export default App;
