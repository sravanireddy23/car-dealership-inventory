import { useState } from 'react'

function VehicleGallery({ vehicle }) {
  const images = vehicle.gallery?.length
    ? vehicle.gallery
    : vehicle.image
      ? [vehicle.image]
      : []

  const [selectedImage, setSelectedImage] = useState(0)

  if (images.length === 0) {
    return (
      <div className="flex h-80 items-center justify-center rounded-2xl bg-gray-100">
        <div className="text-center text-gray-400">
          <p className="text-6xl">🚗</p>
          <p className="mt-3 text-sm">
            Images coming soon
          </p>
        </div>
      </div>
    )
  }

  const currentImage =
    images[selectedImage] || images[0]

  const nextImage = () => {
    setSelectedImage(
      (current) => (current + 1) % images.length
    )
  }

  const previousImage = () => {
    setSelectedImage(
      (current) =>
        (current - 1 + images.length) %
        images.length
    )
  }

  return (
    <div className="space-y-4">
      {/* MAIN IMAGE */}
      <div className="relative overflow-hidden rounded-2xl bg-gray-100">
        <img
          src={currentImage}
          alt={`${vehicle.make} ${vehicle.model}`}
          className="h-[420px] w-full object-cover"
        />

        {/* PREVIOUS */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={previousImage}
            aria-label="Previous image"
            className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow-md transition hover:bg-white"
          >
            ←
          </button>
        )}

        {/* NEXT */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={nextImage}
            aria-label="Next image"
            className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-xl shadow-md transition hover:bg-white"
          >
            →
          </button>
        )}

        {/* IMAGE COUNT */}
        {images.length > 1 && (
          <div className="absolute bottom-4 right-4 rounded-full bg-black/70 px-3 py-1 text-xs font-medium text-white">
            {selectedImage + 1} / {images.length}
          </div>
        )}
      </div>

      {/* THUMBNAILS */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() =>
                setSelectedImage(index)
              }
              className={`overflow-hidden rounded-xl border-2 ${
                selectedImage === index
                  ? 'border-black'
                  : 'border-transparent'
              }`}
            >
              <img
                src={image}
                alt={`${vehicle.make} ${vehicle.model} view ${
                  index + 1
                }`}
                className="h-20 w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default VehicleGallery