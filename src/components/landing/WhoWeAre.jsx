export default function WhoWeAre() {
  return (
    <section id="about" className="who-we-are">
      <div className="container">
        <div className="section-content">
          <div className="section-text">
            <h2 className="section-title">Who we Are?</h2>
            <h3 className="section-subtitle">High-Quality Service. Comfort. Excellence.</h3>
            <p className="section-description">
              We offer quality services in a comfortable setting, ensuring professionalism, care, and a great client experience.
            </p>
            <div className="opening-hours">
              <h4 className="hours-title">Opening Hours</h4>
              <div className="hours-list">
                <div className="hours-item">
                  <span className="clock-icon">🕐</span>
                  <span>Sunday - Thursday: 8:00 AM - 8:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="clock-icon">🕐</span>
                  <span>Friday: 8:00 AM - 3:00 PM</span>
                </div>
                <div className="hours-item">
                  <span className="clock-icon">🕐</span>
                  <span>Saturday: Closed</span>
                </div>
              </div>
            </div>
          </div>
          <div className="section-image">
            <div className="image-wrapper">
              <div className="profile-image"></div>
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
