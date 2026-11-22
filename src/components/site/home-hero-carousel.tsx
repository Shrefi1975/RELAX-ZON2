'use client'

import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { ApartmentPhotoSlideshow } from './apartment-photo-slideshow'

const homeHeroSlides = [
  { desktop: '/hero-01-desktop.webp', mobile: '/hero-01-mobile.webp' },
  { desktop: '/hero-02-desktop.webp', mobile: '/hero-02-mobile.webp' },
  { desktop: '/hero-03-desktop.webp', mobile: '/hero-03-mobile.webp' },
  { desktop: '/hero-04-desktop.webp', mobile: '/hero-04-mobile.webp' },
]

const homeHeroMessages = [
  { first: 'نوم هادئ', second: 'وبداية أجمل' },
  { first: 'جلسات تجمعكم', second: 'براحة وخصوصية' },
  { first: 'تفاصيل أنيقة', second: 'تمنحك الراحة' },
  { first: 'مساحة رحبة', second: 'في قلب جدة' },
]

type HomeHeroCarouselProps = {
  children: ReactNode
}

export function HomeHeroCarousel({ children }: HomeHeroCarouselProps) {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0)

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const interval = window.setInterval(() => {
      setActiveSlideIndex((currentIndex) => (currentIndex + 1) % homeHeroSlides.length)
    }, reducedMotion ? 6000 : 4000)

    return () => window.clearInterval(interval)
  }, [])

  return <section className="home-hero" id="home" aria-labelledby="home-title">
    <ApartmentPhotoSlideshow
      images={homeHeroSlides}
      className="home-hero-slideshow"
      label="لقطات من الشقق"
      priority
      activeIndex={activeSlideIndex}
    />
    <div className="home-hero-shade bg-gradient-to-l from-black/75 via-black/50 to-black/20" aria-hidden="true" />
    <div className="home-hero-content">
      <div className="home-hero-copy">
        <span className="eyebrow">جدة - حي الشاطئ</span>
        <h1 id="home-title" className="home-hero-headline">
          <span className="sr-only">شقق مفروشة تمنحك الراحة في قلب جدة</span>
          <span className="home-hero-headline-visual relative block w-full min-w-0 overflow-hidden" aria-hidden="true">
            <span className="home-hero-headline-sizer">
              {homeHeroMessages.map((message) => <span className="home-hero-headline-sizer-line" key={message.first}><span>{message.first}</span><em>{message.second}</em></span>)}
            </span>
            {homeHeroMessages.map((message, index) => {
              const isActive = index === activeSlideIndex
              const visibility = isActive ? 'visible opacity-100 z-20' : 'invisible opacity-0 z-0'

              return <span
                key={message.first}
                className={`home-hero-message absolute inset-0 flex min-w-0 flex-col items-start text-right ${visibility}`}
                aria-hidden={!isActive}
              >
                <span>{message.first}</span>
                <em>{message.second}</em>
              </span>
            })}
          </span>
        </h1>
        <p>شقق مفروشة تمنحك مساحة أوسع وراحة أقرب، في قلب جدة.</p>
      </div>
      {children}
    </div>
  </section>
}
