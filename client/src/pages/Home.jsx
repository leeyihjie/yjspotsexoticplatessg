import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Card, Image, Text, Title } from "@mantine/core";
import "./Home.css";

function Home() {
  const [plates, setPlates] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/plates")
      .then((res) => setPlates(res.data));
  }, []);

  return (
    <>
      <Title className="page-title">License Plates</Title>

      <Grid>
        {plates.map((plate) => (
          <Grid.Col span={3} key={plate.id}>
            <Card
              shadow="sm"
              padding="md"
              radius="md"
              withBorder
              className="plate-card"
            >
              <Card.Section>
                <Image
                  src={`http://localhost:5000/uploads/${plate.image}`}
                  height={160}
                  className="plate-image"
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

export default Home;
