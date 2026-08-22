import { useEffect, useState } from 'react'

function Vehicle360Viewer({
  vehicle,
  onClose,
}) {
  const gallery = vehicle?.gallery || []

  const images =
    gallery.length > 0
      ? gallery
      : vehicle?.image
        ? [vehicle.image]
        : []

  const [currentIndex, setCurrentIndex] = useState(0)

  const [isDragging, setIsDragging] =
    useState(false)

  const [startX, setStartX] = useState(0)

  useEffect(() => {
    setCurrentIndex(0)
  }, [vehicle])

  const nextImage = () => {
    if (images.length <= 1) return

    setCurrentIndex(
      (currentIndex + 1) % images.length
    )
  }

  const previousImage = () => {
    if (images.length <= 1) return

    setCurrentIndex(
      (currentIndex - 1 + images.length) %
        images.length
    )
  }

  const handlePointerDown = (event) => {
    if (images.length <= 1) return

    setIsDragging(true)
    setStartX(event.clientX)

    event.currentTarget.setPointerCapture(
      event.pointerId
    )
  }

  const handlePointerMove = (event) => {
    if (!isDragging || images.length <= 1) {
      return
    }

    const difference =
      event.clientX - startX

    const threshold = 35

    if (Math.abs(difference) >= threshold) {
      if (difference < 0) {
        nextImage()
      } else {
        previousImage()
      }

      setStartX(event.clientX)
    }
  }

  const handlePointerUp = () => {
    setIsDragging(false)
  }

  if (!vehicle) {
    return null
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b px-5 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {vehicle.make} {vehicle.model}
            </h2>

            <p className="text-sm text-gray-500">
              {vehicle.year} • 360° View
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-gray-100 px-4 py-2 text-xl font-semibold text-gray-700 transition hover:bg-gray-200"
            aria-label="Close 360 degree viewer"
          >
            ×
          </button>
        </div>

        {/* VIEWER */}
        <div
          className="relative flex h-[60vh] min-h-[350px] select-none items-center justify-center overflow-hidden bg-gray-100 touch-none"
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          style={{
            cursor:
              images.length > 1
                ? isDragging
                  ? 'grabbing'
                  : 'grab'
                : 'default',
          }}
        >
          {images.length > 0 ? (
            <img
              src={images[currentIndex]}
              alt={`${vehicle.make} ${vehicle.model} 360 degree view`}
              className="h-full w-full object-contain"
              draggable="false"
            />
          ) : (
            <div className="text-center text-gray-400">
              <p className="text-6xl">🚗</p>

              <p className="mt-3">
                360° images coming soon
              </p>
            </div>
          )}

          {/* PREVIOUS */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-2xl shadow-lg transition hover:bg-white"
              aria-label="Previous vehicle angle"
            >
              ‹
            </button>
          )}

          {/* NEXT */}
          {images.length > 1 && (
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 px-4 py-3 text-2xl shadow-lg transition hover:bg-white"
              aria-label="Next vehicle angle"
            >
              ›
            </button>
          )}

          {/* DRAG INSTRUCTION */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/70 px-4 py-2 text-xs font-medium text-white">
              Drag left or right to rotate
            </div>
          )}
        </div>

        {/* THUMBNAILS */}
        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto border-t bg-white p-4">
            {images.map(
              (image, index) => (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  onClick={() =>
                    setCurrentIndex(index)
                  }
                  className={`h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border-2 ${
                    currentIndex === index
                      ? 'border-black'
                      : 'border-transparent'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${vehicle.make} ${vehicle.model} angle ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              )
            )}
          </div>
        )}

        {/* FOOTER */}
        <div className="border-t bg-gray-50 px-5 py-4 text-center text-sm text-gray-500">
          {images.length > 1
            ? `Angle ${currentIndex + 1} of ${images.length}`
            : '360° viewer'}
        </div>
      </div>
    </div>
  )
}

export default Vehicle360Viewer