import { useState } from "react";
import axios from "axios";
import {
  TextInput,
  Button,
  Grid,
  Card,
  Image,
  Text,
  Title,
  Stack,
} from "@mantine/core";
import "./Search.css";

function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await axios.get(`http://localhost:5000/search?plate=${query}`);
    setResults(res.data);
  };

  return (
    <>
      <Title className="page-title">Search Plates</Title>

      <Stack mb="md">
        <TextInput
          placeholder="Enter plate number (e.g. SMW)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </Stack>

      <Grid>
        {results.map((plate) => (
          <Grid.Col span={3} key={plate.id}>
            <Card withBorder className="plate-card">
              <Card.Section>
                <Image
                  src={`http://localhost:5000/uploads/${plate.image}`}
                  height={160}
                />
              </Card.Section>

              <Text fw={700} mt="sm">
                {plate.plate_number}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}

export default Search;
