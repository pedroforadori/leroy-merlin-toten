import React from 'react'
import Lightbox from 'react-image-lightbox'
import 'react-image-lightbox/style.css'

export default function ImageViewer({
  images,
  index,
  isOpen,
  onCloseRequest,
  onMovePrevRequest,
  onMoveNextRequest,
  children,
  ...props
}) {
  const nextIndex = (index + 1) % images.length
  const prevIndex = (index + images.length - 1) % images.length

  return (
    isOpen && (
      <Lightbox
        {...props}
        mainSrc={images[index]}
        nextSrc={images[nextIndex]}
        prevSrc={images[prevIndex]}
        onMoveNextRequest={() => onMoveNextRequest(nextIndex)}
        onMovePrevRequest={() => onMovePrevRequest(prevIndex)}
        onCloseRequest={onCloseRequest}
      />
    )
  )
}
