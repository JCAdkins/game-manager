import { useState } from "react";

export default function ImageUploader({
  images,
  setImages,
}: {
  images: string[];
  setImages: (imgs: string[]) => void;
}) {
  const [newImage, setNewImage] = useState("");

  const handleAddImage = () => {
    if (newImage.trim()) {
      setImages([...images, newImage]);
      setNewImage("");
    }
  };

  return (
    <div>
      <span className="text-sm">Screenshots:</span>
      <div className="flex space-x-2 overflow-x-auto p-2">
        {images.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`Screenshot ${i + 1}`}
            className="w-24 h-24 object-cover rounded shadow"
          />
        ))}
      </div>
      <div className="flex space-x-2 mt-2">
        <input
          type="text"
          placeholder="Image URL"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
          className="w-full p-2 border rounded"
        />
        <button
          onClick={handleAddImage}
          className="bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}
