export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", () => {
      resolve(image);
    });

    image.addEventListener("error", (error) => {
      reject(error);
    });

    image.setAttribute("crossOrigin", "anonymous");
    image.src = url;
  });

/**
 * Creates a cropped image from the crop coordinates
 * returned by react-easy-crop.
 *
 * @param {string} imageSrc
 * @param {object} croppedAreaPixels
 * @returns {Promise<{file: File, preview: string}>}
 */
export async function getEditedImage(imageSrc, croppedAreaPixels) {
  if (!croppedAreaPixels) {
    throw new Error("Crop area is not available.");
  }

  const image = await createImage(imageSrc);

  const canvas = document.createElement("canvas");

  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not create canvas context.");
  }

  const { width, height } = croppedAreaPixels;

  canvas.width = width;
  canvas.height = height;

  /*
   * Draw the selected portion of the original image
   * directly onto the canvas.
   */
  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    width,
    height,
  );

  /*
   * Convert the canvas to a JPEG Blob.
   */
  const blob = await new Promise((resolve, reject) => {
    canvas.toBlob(
      (result) => {
        if (!result) {
          reject(new Error("Failed to create image blob."));

          return;
        }

        resolve(result);
      },
      "image/jpeg",
      0.95,
    );
  });

  /*
   * Create a File from the Blob.
   *
   * This is the actual file that we will eventually
   * send to the Express backend.
   */
  const file = new File([blob], "edited-image.jpg", {
    type: "image/jpeg",
  });

  /*
   * Create a temporary URL so the edited image
   * can immediately be displayed in the UI.
   */
  const preview = URL.createObjectURL(blob);

  return {
    file,
    preview,
  };
}
