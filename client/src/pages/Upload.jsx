import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  TextInput,
  Button,
  Title,
  Stack,
  Image,
  Paper,
  Text,
  CloseButton,
  Box,
  Group,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";

import ReactCrop, { cropToCanvas } from "react-image-crop";

import "./Upload.css";
import "react-image-crop/dist/ReactCrop.css";

function Upload() {
  const [plateNumber, setPlateNumber] = useState("");

  const [draftImage, setDraftImage] = useState(null);
  const [draftImageUrl, setDraftImageUrl] = useState("");

  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const [preview, setPreview] = useState(null);

  const [crop, setCrop] = useState(null);

  const [completedCrop, setCompletedCrop] = useState(null);

  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  useEffect(() => {
    if (
      completedCrop?.width &&
      completedCrop?.height &&
      imgRef.current &&
      previewCanvasRef.current
    ) {
      cropToCanvas(imgRef.current, previewCanvasRef.current, completedCrop);
    }
  }, [completedCrop]);

  const handleImageSelected = (files) => {
    const file = files[0];

    if (!file) return;

    setDraftImage(file);
    setDraftImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("plateNumber", plateNumber);
    formData.append("image", image);

    await axios.post("http://localhost:5000/upload", formData);
    alert("Uploaded!");
  };

  const handleClose = () => {
    setDraftImage(null);
    setDraftImageUrl("");

    setImage(null);
    setImageUrl("");

    setCrop(null);
    setCompletedCrop(null);
  };

  const handleConfirmCrop = () => {
    if (!completedCrop || !imgRef.current || !draftImage) {
      return;
    }

    const image = imgRef.current;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height,
    );

    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }

      const croppedFile = new File([blob], draftImage.name, {
        type: draftImage.type,
      });

      // Logging
      console.log("Natural:", image.naturalWidth, image.naturalHeight);
      console.log("Displayed:", image.width, image.height);
      console.log("Crop:", completedCrop);
      console.log("Scale:", scaleX, scaleY);
      console.log("Output:", canvas.width, canvas.height);

      setImage(croppedFile);
      setImageUrl(URL.createObjectURL(croppedFile));
    }, draftImage.type);
  };

  return (
    <>
      <Title className="page-title">Upload Plate</Title>

      <Stack>
        {!draftImageUrl && (
          <Dropzone
            className="dropzone-box"
            multiple={false}
            accept={["image/jpeg", "image/png", "image/webp"]}
            maxSize={10 * 1024 * 1024}
            onDrop={handleImageSelected}
          >
            <div className="upload-box">
              Drag or click to upload carplate image
            </div>
          </Dropzone>
        )}
        {/* Once user uploads (store image details in draftImage and draftImageUrl) 
        -> allow user to edit/crop his image 
        -> once all edits are done, user clicks a confirm button to confirm the image
        -> store edited image details in image and imageUrl */}
        {!!draftImageUrl && !imageUrl && (
          <Paper shadow="sm" p="md" radius="md" withBorder>
            <Stack>
              <Box pos="relative">
                <Text fw={600}>Crop Image</Text>
                <CloseButton
                  pos="absolute"
                  top={0}
                  right={0}
                  onClick={handleClose}
                ></CloseButton>
              </Box>

              <Group align="flex-start" grow>
                <Box>
                  <Text size="sm" fw={500} mb="xs">
                    Original
                  </Text>
                  <ReactCrop
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                  >
                    <img
                      ref={imgRef}
                      src={draftImageUrl}
                      alt="Crop"
                      style={{
                        maxWidth: "100%",
                        maxHeight: 500,
                      }}
                    />
                  </ReactCrop>
                </Box>

                <Box>
                  <Text size="sm" fw={500} mb="xs">
                    Preview
                  </Text>
                  {completedCrop && (
                    <canvas
                      ref={previewCanvasRef}
                      style={{
                        border: "1px solid black",
                        objectFit: "contain",
                        maxWidth: "100%",
                        maxHeight: 500,
                      }}
                    />
                  )}
                </Box>
              </Group>
              <Button onClick={handleConfirmCrop}>Confirm</Button>
            </Stack>
          </Paper>
        )}
        {/* Only shows when user has clicked confirm button to confirm the crop */}
        {!!imageUrl && (
          <Paper shadow="sm" p="md" radius="md" withBorder>
            <Stack>
              <Box pos="relative">
                <Text fw={600}>Final Image</Text>
                <CloseButton
                  pos="absolute"
                  top={0}
                  right={0}
                  onClick={handleClose}
                ></CloseButton>
              </Box>
              <Image
                src={imageUrl}
                alt="Cropped Image"
                radius="md"
                fits="contain"
                maw="100%"
              />
              <Text size="sm" c="dimmed">
                {image?.name}
              </Text>
            </Stack>
          </Paper>
        )}
        {!!imageUrl && (
          <TextInput
            label="Plate Number"
            placeholder="SMW1111L"
            value={plateNumber}
            onChange={(e) => setPlateNumber(e.target.value)}
          />
        )}
        {preview && (
          <Paper shadow="sm" p="md" radius="md" withBorder>
            <Stack gap="sm">
              <Text fw={600}>Preview</Text>

              <Image
                src={preview}
                alt="Plate preview"
                radius="md"
                fit="contain"
                h={300}
              />

              <Text size="sm" c="dimmed">
                {image.name}
              </Text>
            </Stack>
          </Paper>
        )}

        <Button onClick={handleSubmit}>Upload</Button>
      </Stack>
    </>
  );
}

export default Upload;
