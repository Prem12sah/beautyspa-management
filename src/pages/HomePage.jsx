import { useEffect } from 'react'
import Header from '../components/landing/Header'
import Hero from '../components/landing/Hero'
import WhoWeAre from '../components/landing/WhoWeAre'
import WhyChooseUs from '../components/landing/WhyChooseUs'
import OurServices from '../components/landing/OurServices'
import Pricing from '../components/landing/Pricing'
import OurTeam from '../components/landing/OurTeam'
import BookService from '../components/landing/BookService'
import Footer from '../components/landing/Footer'

export default function HomePage() {
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]')
      const navLinks = document.querySelectorAll('.nav-link')
      let current = ''
      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        if (window.scrollY >= sectionTop - 200) {
          current = section.getAttribute('id')
        }
      })
      navLinks.forEach((link) => {
        link.classList.remove('active')
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active')
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <Header />
      <Hero />
      <WhoWeAre />
      <WhyChooseUs />
      <OurServices />
      <Pricing />
      <OurTeam />
      <BookService />
      <Footer />
    </>
  )
}
