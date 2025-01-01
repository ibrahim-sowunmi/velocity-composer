"use client";

import { Config } from "@measured/puck";
import { useCallback, useState } from "react";

type ImageBlockProps = {
  imageUrl: string;
  altText: string;
  width?: string;
  height?: string;
  alignment?: "left" | "center" | "right";
};

const MAX_FILE_SIZE = 256 * 1024; // 256KB in bytes
const MAX_IMAGE_DIMENSION = 1920; // Maximum width or height in pixels

// Function to create a blob with specific format and quality
const createBlob = (canvas: HTMLCanvasElement, format: string, quality?: number, addWhiteBackground: boolean = false): Promise<Blob | null> => {
  return new Promise((resolve) => {
    if (addWhiteBackground) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Save the current canvas state
        ctx.save();
        // Draw white background
        ctx.globalCompositeOperation = 'destination-over';
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // Restore to the state before we added the white background
        ctx.restore();
      }
    }

    canvas.toBlob(
      (blob) => resolve(blob),
      format,
      quality
    );
  });
};

// Function to downscale image if needed
const downscaleImage = async (file: File, currentQuality: number = 0.9): Promise<{ blob: Blob, format: string } | null> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = async () => {
      URL.revokeObjectURL(img.src);

      // Calculate scale factor based on dimensions
      let scale = 1;
      if (img.width > MAX_IMAGE_DIMENSION || img.height > MAX_IMAGE_DIMENSION) {
        const widthScale = MAX_IMAGE_DIMENSION / img.width;
        const heightScale = MAX_IMAGE_DIMENSION / img.height;
        scale = Math.min(widthScale, heightScale);
      }

      const newWidth = img.width * scale;
      const newHeight = img.height * scale;

      const canvas = document.createElement('canvas');
      canvas.width = newWidth;
      canvas.height = newHeight;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) {
        resolve(null);
        return;
      }

      // Draw image and check for transparency
      ctx.drawImage(img, 0, 0, newWidth, newHeight);
      let hasTransparency = false;
      try {
        const imageData = ctx.getImageData(0, 0, newWidth, newHeight);
        const data = imageData.data;
        for (let i = 3; i < data.length; i += 4) {
          if (data[i] < 255) {
            hasTransparency = true;
            break;
          }
        }
      } catch (e) {
        hasTransparency = false;
      }

      // Try original format first
      const originalBlob = await createBlob(canvas, file.type);
      if (originalBlob && originalBlob.size <= MAX_FILE_SIZE) {
        resolve({ blob: originalBlob, format: file.type });
        return;
      }

      // If original format is too large and image has transparency, try PNG
      if (hasTransparency) {
        const pngBlob = await createBlob(canvas, 'image/png');
        if (pngBlob && pngBlob.size <= MAX_FILE_SIZE) {
          resolve({ blob: pngBlob, format: 'image/png' });
          return;
        }
      }

      // Last resort: try JPEG with quality setting and white background
      const jpegBlob = await createBlob(canvas, 'image/jpeg', currentQuality, true);
      if (jpegBlob) {
        resolve({ blob: jpegBlob, format: 'image/jpeg' });
        return;
      }

      resolve(null);
    };

    img.onerror = () => resolve(null);
    img.src = URL.createObjectURL(file);
  });
};

// Function to progressively reduce quality until size is under limit
const getDownscaledImage = async (file: File): Promise<{ blob: Blob, quality: number, format: string } | null> => {
  // Try with original quality first
  const firstTry = await downscaleImage(file, 1);
  if (firstTry && firstTry.blob.size <= MAX_FILE_SIZE) {
    return { blob: firstTry.blob, quality: 1, format: firstTry.format };
  }

  // If still too large, try progressive JPEG compression
  let quality = 0.9;
  const minQuality = 0.1;
  const qualityStep = 0.1;

  while (quality >= minQuality) {
    const result = await downscaleImage(file, quality);
    if (!result) return null;

    if (result.blob.size <= MAX_FILE_SIZE) {
      return { blob: result.blob, quality, format: result.format };
    }

    quality -= qualityStep;
  }

  return null;
};

export const ImageBlock: Config<{ ImageBlock: ImageBlockProps }>["components"] = {
  ImageBlock: {
    fields: {
      imageUrl: {
        type: "custom",
        label: "Upload or URL",
        render: ({ name, onChange, value, field }) => {
          const [localUrl, setLocalUrl] = useState(value);
          const [error, setError] = useState<string | null>(null);

          const handleFileUpload = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
            const file = e.target.files?.[0];
            if (!file) return;

            try {
              // Try to downscale if needed
              const result = await getDownscaledImage(file);

              if (result) {
                const { blob, quality, format } = result;
                const objectUrl = URL.createObjectURL(blob);
                setError(null);
                setLocalUrl(objectUrl);
                onChange(objectUrl);

                if (quality < 1 || format !== file.type) {
                  const formatChanged = format !== file.type ? ` (converted to ${format.split('/')[1]})` : '';
                  const qualityInfo = quality < 1 ? ` (quality: ${Math.round(quality * 100)}%)` : '';
                  setError(`Image was compressed to ${(blob.size / 1024).toFixed(1)}KB${formatChanged}${qualityInfo}`);
                }
              } else {
                setError('Unable to compress image below 256KB. Please try a different image.');
                e.target.value = '';
              }
            } catch (err) {
              setError('Error processing image. Please try another file.');
              e.target.value = '';
            }
          }, [onChange]);

          return (
            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              <p style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#6B7280",
                margin: "0"
              }}>Upload image or Enter URL (images will be automatically resized if needed)</p>
              <input
                type="text"
                value={localUrl || ""}
                onChange={(e) => {
                  setError(null);
                  setLocalUrl(e.target.value);
                  onChange(e.target.value);
                }}
                placeholder="Enter image URL"
                style={{
                  width: "100%",
                  padding: "8px",
                  border: "1px solid #ccc",
                  borderRadius: "4px"
                }}
              />

              <div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  style={{ marginTop: "8px" }}
                />
                {error && (
                  <p style={{
                    color: error.includes("compressed to") ? "#059669" : "#DC2626",
                    fontSize: "12px",
                    margin: "4px 0 0 0"
                  }}>
                    {error}
                  </p>
                )}
              </div>

              {localUrl && (
                <div style={{ marginTop: "8px" }}>
                  <img
                    src={localUrl}
                    alt="Preview"
                    style={{
                      maxWidth: "200px",
                      maxHeight: "200px",
                      objectFit: "contain"
                    }}
                  />
                </div>
              )}
            </div>
          );
        }
      },

      alignment: {
        type: "radio",
        label: "Alignment",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" }
        ]
      },

      altText: {
        type: "text",
        label: "Alt Text",
      },

      width: {
        type: "text",
        label: "Width (e.g., 100%, 200px)",
      },
      height: {
        type: "text",
        label: "Height (e.g., auto, 200px)",
      }
    },

    defaultProps: {
      imageUrl: "",
      altText: "",
      width: "100%",
      height: "auto",
      alignment: "left"
    },

    render: ({ imageUrl, altText, width, height, alignment }) => {
      const containerStyle = {
        display: "flex",
        justifyContent: alignment === "center" ? "center" : alignment === "right" ? "flex-end" : "flex-start",
        width: "100%"
      };

      if (!imageUrl) {
        return (
          <div style={{
            padding: "20px",
            background: "#f5f5f5",
            border: "2px dashed #ccc",
            borderRadius: "4px",
            textAlign: "center",
            color: "#666"
          }}>
            Please add an image
          </div>
        );
      }

      return (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div style={containerStyle}>
            <img
              src={imageUrl}
              alt={altText}
              style={{
                display: "block",
                width: width || "100%",
                height: height || "auto",
                objectFit: "contain"
              }}
            />
          </div>
        </div>
      );
    }
  }
};