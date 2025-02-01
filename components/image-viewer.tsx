import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageViewerProps {
  images: string[];
}

const ImageViewer: React.FC<ImageViewerProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

  const goPrev = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full max-w-lg mx-auto">
      {/* Image Display */}
      <div className="relative flex items-center justify-center w-full h-80 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="object-contain w-full h-full"
        />
      </div>

      {/* Navigation Controls */}
      <button
        onClick={goPrev}
        // disabled={currentIndex === 0}
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goNext}
        // disabled={currentIndex === images.length - 1}
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ChevronRight size={24} />
      </button>

      {/* Image Counter */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/70 text-white text-sm px-3 py-1 rounded-lg">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
};

export default ImageViewer;
