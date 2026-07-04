import { Group, Button, Title, Box, Text } from "@mantine/core";
import { Link } from "react-router";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar">
      <Group justify="space-between">
        <Box>
          <Title order={3} fw={700}>
            SG Plate Collection
          </Title>

          <Text size="xs" c="dimmed" fw={500} mt={-2}>
            Made by YJSpotsExoticPlates
          </Text>
        </Box>

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
