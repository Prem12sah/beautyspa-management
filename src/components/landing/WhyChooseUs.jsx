export default function WhyChooseUs() {
  const scrollToContact = (e) => {
    e.preventDefault()
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section className="why-choose-us">
      <div className="container">
        <div className="section-content reverse">
          <div className="section-text">
            <h2 className="section-title">
              Why Our <span className="underline">Clients</span> Choose Us?
            </h2>
            <p className="section-description">
              We create a comfortable, welcoming space where quality and care come first, delivering professional, reliable services that ensure every visit is smooth and enjoyable.
            </p>
            <a href="#contact" className="btn btn-outline-large" onClick={scrollToContact}>Book Now</a>
          </div>
          <div className="section-image">
            <div className="image-collage-two">
              <div className="image-rect image-4"></div>
              <div className="image-rect image-5"></div>
              <div className="decorative-leaf leaf-1"></div>
              <div className="decorative-circle circle-3"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
