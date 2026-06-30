'use client' // Required for Swiper interactivity in Next.js App Router

import React from 'react'
import Image from 'next/image'
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
// Import Swiper modules
import { Autoplay, Navigation, Pagination } from 'swiper/modules'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const Banner = () => {
  // Mock data for multiple slides - replace with your actual image paths
  const slides = [
    { id: 1, src: '/hamimmart2.png', alt: 'Banner 1' },
    { id: 2, src: '/hamimmart.png', alt: 'Banner 2' }, // Add your second image
  
  ]

  return (
    <div className='w-11/12 mx-auto my-6'>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay]}
        className="mySwiper rounded-xl overflow-hidden"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full "> 
              <Image 
                src={slide.src} 
                alt={slide.alt}
              width={1300}
              height={200}
                priority={slide.id === 1} // Loads the first image instantly
                className="object-cover"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default Banner