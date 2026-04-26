import { useState } from "react";
import axios from "axios";
import { TextInput, Button, Title, Stack } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import "./Upload.css";

function Upload() {
  const [plateNumber, setPlateNumber] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("plateNumber", plateNumber);
    formData.append("image", image);

    await axios.post("http://localhost:5000/upload", formData);
    alert("Uploaded!");
  };

  return (
    <>
      <Title className="page-title">Upload Plate</Title>

      <Stack>
        <TextInput
          label="Plate Number"
          placeholder="SMW1111L"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
        />

        <Dropzone onDrop={(files) => setImage(files[0])}>
          <div className="upload-box">Drag image here or click to upload</div>
        </Dropzone>

        <Button onClick={handleSubmit}>Upload</Button>
      </Stack>
    </>
  );
}

export default Upload;
