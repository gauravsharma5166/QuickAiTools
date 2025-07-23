import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AiTools from '../components/AiTools'
import { useNavigate } from 'react-router-dom'
import { useUser } from '@clerk/clerk-react'
import Testimonial from '../components/Testimonial'
import Plan from '../components/Plan'

const Home = () => {

  return (
    <>
    <Navbar />
    <Hero />
    <AiTools />
    <Testimonial />
    <Plan />
    </>
  )
}

export default Home