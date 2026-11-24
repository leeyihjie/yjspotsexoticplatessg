import { useState } from "react";
import Cropper from "react-easy-crop";

import { Paper, Stack, Group, Button, Text, Slider } from "@mantine/core";

import { getEditedImage } from "../../utils/imageUtils";

import "./ImageEditor.css";

function ImageEditor({ imageUrl, onSave, onCancel }) {
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });

  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const handleCropComplete = (_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleReset = () => {
    setCrop({
      x: 0,
      y: 0,
    });

    setZoom(1);
  };

  const handleSave = async () => {
    try {
      const editedImage = await getEditedImage(imageUrl, croppedAreaPixels);

      onSave(editedImage);
    } catch (error) {
      console.error("Failed to edit image:", error);
    }
  };

  return (
    <Paper className="image-editor" shadow="md" radius="md" p="lg" withBorder>
      <Stack gap="lg">
        <Text fw={700} size="xl">
          Edit Image
        </Text>

        {/* Image crop area */}
        <div className="crop-container">
          <Cropper
            image={imageUrl}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={handleCropComplete}
            showGrid={true}
          />
        </div>

        {/* Zoom */}
        <Stack gap="xs">
          <Group justify="space-between">
            <Text fw={600}>Zoom</Text>

            <Text size="sm" c="dimmed">
              {zoom.toFixed(1)}x
            </Text>
          </Group>

          <Slider
            value={zoom}
            onChange={setZoom}
            min={1}
            max={3}
            step={0.1}
            label={(value) => `${value.toFixed(1)}x`}
          />
        </Stack>

        {/* Buttons */}
        <Group justify="space-between">
          <Button variant="light" color="gray" onClick={handleReset}>
            Reset
          </Button>

          <Group>
            <Button variant="default" onClick={onCancel}>
              Cancel
            </Button>

            <Button onClick={handleSave}>Save Changes</Button>
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
}

export default ImageEditor;
