import { Group, Button, Title } from "@mantine/core";
import { Link } from "react-router";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <Group justify="space-between">
        <Title order={3} className="navbar-title">
          SG Plate Collection
        </Title>

        <Group>
          <Button component={Link} to="/" variant="light">
            Home
          </Button>
          <Button component={Link} to="/search" variant="light">
            Search
          </Button>
          <Button component={Link} to="/upload">
            Upload
          </Button>
        </Group>
      </Group>
    </div>
  );
}

export default Navbar;
