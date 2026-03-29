const team = [
  { name: 'Priyanka Neupane', role: 'Expert Hair Stylist', imgClass: 'team-1' },
  { name: 'Pinky Ada', role: 'Professional Massage Therapist', imgClass: 'team-2' },
  { name: 'Aayusha Malla', role: 'Founder & Cosmetologist', imgClass: 'team-3' },
]

export default function OurTeam() {
  return (
    <section className="our-team">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title-center">Our Professional Team</h2>
          <p className="section-subtitle-center">Our goal is to deliver reliable, high-quality services in a comfortable and welcoming environment.</p>
        </div>
        <div className="team-grid">
          {team.map((t, i) => (
            <div key={i} className="team-card">
              <div className="team-image-wrapper">
                <div className={`team-image ${t.imgClass}`}></div>
                <div className="team-decorative"></div>
              </div>
              <h3 className="team-name">{t.name}</h3>
              <p className="team-role">{t.role}</p>
            </div>
          ))}
        </div>
        <div className="team-button-wrapper">
          <button type="button" className="btn btn-primary-large">View All Team</button>
        </div>
      </div>
    </section>
  )
}
