import React from 'react'
import Hero from '../Sections/Hero'
import About from '../Sections/About'
import Categories from '../Sections/Categories'
import Testimonals from '../Sections/Testimonial'

export default function Home():React.ReactNode {
  return (
    <>
      <Hero />
      <About />
      <Categories />
      <Testimonals />
    </>
  )
}
