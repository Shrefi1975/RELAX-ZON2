import Image from 'next/image'

type SlideshowImage = {
  desktop: string
  mobile: string
}

type ApartmentPhotoSlideshowProps = {
  images: SlideshowImage[]
  className: string
  label: string
  priority?: boolean
  activeIndex?: number
}

export function ApartmentPhotoSlideshow({ images, className, label, priority = false, activeIndex }: ApartmentPhotoSlideshowProps) {
  const controlledClass = activeIndex === undefined ? '' : ' apartment-photo-slideshow-controlled'

  return <div className={`apartment-photo-slideshow ${className}${controlledClass}`} role="img" aria-label={label}>
    {images.map((image, index) => {
      const slideNumber = index + 1
      const isPriorityImage = priority && slideNumber === 1
      const isActiveImage = activeIndex === index
      const activeClass = activeIndex !== undefined && isActiveImage ? ' apartment-photo-slide-current' : ''
      return <picture key={image.desktop} className={`apartment-photo-slide apartment-photo-slide-${slideNumber}${activeClass}`}>
        <source media="(max-width: 800px)" srcSet={image.mobile} />
        <Image
          src={image.desktop}
          alt=""
          aria-hidden="true"
          fill
          unoptimized
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={isPriorityImage ? 'high' : 'auto'}
          decoding="async"
          className="apartment-photo-slide-image"
        />
      </picture>
    })}
  </div>
}
