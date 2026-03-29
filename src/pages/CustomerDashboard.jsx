import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { STORAGE_KEYS, MOCK_SERVICES } from '../constants'
import '../styles/dashboard.css'

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: '▦' },
  { id: 'booking', label: 'Book Services', icon: '📅' },
  { id: 'profile', label: 'My Profile', icon: '👤' },
]

export default function CustomerDashboard() {
  const [page, setPage] = useState('dashboard')
  const [profile, setProfile] = useState({ name: 'Customer User', email: 'customer@gmail.com', phone: '', address: '' })
  const [bookings, setBookings] = useState([])
  const [services] = useState(MOCK_SERVICES)
  const [confirmation, setConfirmation] = useState(null)
  const [profileSaved, setProfileSaved] = useState(false)
  const [bookingForm, setBookingForm] = useState({ service: '', date: '', time: '', notes: '' })

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.profile)
    if (raw) {
      try {
        setProfile((prev) => ({ ...prev, ...JSON.parse(raw) }))
      } catch (_) {}
    }
    const bookingsRaw = localStorage.getItem(STORAGE_KEYS.bookings)
    if (bookingsRaw) {
      try {
        setBookings(JSON.parse(bookingsRaw))
      } catch (_) {}
    }
  }, [])

  const confirmedBookings = bookings.filter((b) => b.status !== 'cancelled')
  const stats = {
    total: confirmedBookings.length,
    pending: confirmedBookings.filter((b) => b.status === 'pending' || !b.status).length,
    completed: confirmedBookings.filter((b) => b.status === 'completed' || b.status === 'confirmed').length,
    totalSpent: confirmedBookings.reduce((sum, b) => {
      const svc = services.find((s) => s.id === b.serviceId)
      return sum + (svc?.price || b.amount || 0)
    }, 0),
  }

  const handleSaveProfile = (e) => {
    e.preventDefault()
    const form = e.target
    const p = {
      name: form.profileName?.value?.trim() || '',
      email: form.profileEmail?.value?.trim() || '',
      phone: form.profilePhone?.value?.trim() || '',
      address: form.profileAddress?.value?.trim() || '',
    }
    localStorage.setItem(STORAGE_KEYS.profile, JSON.stringify(p))
    setProfile((prev) => ({ ...prev, ...p }))
    setProfileSaved(true)
    setTimeout(() => setProfileSaved(false), 3000)
  }

  const handleBookingSubmit = (e) => {
    e.preventDefault()
    const form = e.target
    const serviceId = form.bookingService?.value
    const date = form.bookingDate?.value
    const time = form.bookingTime?.value
    const notes = form.bookingNotes?.value?.trim() || ''
    if (!serviceId || !date || !time) {
      alert('Please select service, date and time.')
      return
    }
    const svc = services.find((s) => s.id === serviceId)
    const booking = {
      id: 'b_' + Date.now(),
      serviceId,
      serviceName: svc?.name || 'Service',
      amount: svc?.price || 0,
      date,
      time,
      notes,
      customerName: profile.name,
      customerEmail: profile.email,
      customerPhone: profile.phone,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }
    const updated = [booking, ...bookings]
    setBookings(updated)
    localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(updated))
    setConfirmation(booking)
    setPage('confirmation')
    setBookingForm({ service: '', date: '', time: '', notes: '' })
  }

  const handleCancelBooking = (id) => {
    if (!window.confirm('Cancel this booking?')) return
    const updated = bookings.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))
    setBookings(updated)
    localStorage.setItem(STORAGE_KEYS.bookings, JSON.stringify(updated))
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <div className="dashboard-body">
      <div className="dashboard-layout">
        <aside className="dashboard-sidebar">
          <Link to="/" className="dashboard-brand">
            <img src="/assets/images/logo1.png" alt="Geek Beauty Spa" className="dashboard-brand-img" />
            <span className="dashboard-brand-sub">__ Beauty Spa __</span>
          </Link>
          <nav className="dashboard-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`dashboard-nav-link ${page === item.id ? 'active' : ''}`}
                onClick={() => setPage(item.id)}
              >
                <span className="dashboard-nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <div className="dashboard-user">
            <div className="dashboard-user-avatar"></div>
            <div className="dashboard-user-info">
              <span className="dashboard-user-name">{profile.name || 'Customer User'}</span>
              <span className="dashboard-user-email">{profile.email || 'customer@gmail.com'}</span>
            </div>
          </div>
        </aside>

        <main className="dashboard-main">
          {page === 'dashboard' && (
            <section className="dashboard-page active">
              <header className="dashboard-main-header">
                <h1 className="dashboard-page-title">Dashboard</h1>
                <div className="dashboard-header-actions">
                  <Link to="/" className="dashboard-btn-logout">Log Out</Link>
                  <Link to="/#contact" className="dashboard-btn-book">Book Now</Link>
                </div>
              </header>
              <div className="dashboard-cards">
                <div className="dashboard-card">
                  <div className="dashboard-card-icon dashboard-card-icon-blue">↻</div>
                  <div>
                    <p className="dashboard-card-label">Total Bookings</p>
                    <p className="dashboard-card-value">{stats.total}</p>
                  </div>
                </div>
                <div className="dashboard-card">
                  <div className="dashboard-card-icon dashboard-card-icon-yellow">◷</div>
                  <div>
                    <p className="dashboard-card-label">Pending</p>
                    <p className="dashboard-card-value">{stats.pending}</p>
                  </div>
                </div>
                <div className="dashboard-card">
                  <div className="dashboard-card-icon dashboard-card-icon-green">✓</div>
                  <div>
                    <p className="dashboard-card-label">Completed</p>
                    <p className="dashboard-card-value">{stats.completed}</p>
                  </div>
                </div>
                <div className="dashboard-card">
                  <div className="dashboard-card-icon dashboard-card-icon-purple">$</div>
                  <div>
                    <p className="dashboard-card-label">Total Spent</p>
                    <p className="dashboard-card-value">{stats.totalSpent}</p>
                  </div>
                </div>
              </div>
              <h2 className="dashboard-section-title">My Bookings</h2>
              {confirmedBookings.length === 0 ? (
                <div className="dashboard-empty-state">
                  <div className="dashboard-empty-icon">📦</div>
                  <p className="dashboard-empty-title">No Booking yet</p>
                  <p className="dashboard-empty-msg">Start by booking a service to see your history here.</p>
                  <button type="button" className="dashboard-btn-book" onClick={() => setPage('booking')}>Book Now</button>
                </div>
              ) : (
                <div className="dashboard-table-wrap">
                  <table className="dashboard-table">
                    <thead>
                      <tr>
                        <th>SERVICE</th>
                        <th>DATE & TIME</th>
                        <th>STATUS</th>
                        <th>PAYMENT</th>
                        <th>AMOUNT</th>
                        <th>ACTIONS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {confirmedBookings.map((b) => {
                        const svc = services.find((s) => s.id === b.serviceId) || { name: b.serviceName || 'Service', price: 0 }
                        const statusClass = (b.status || '').toLowerCase().includes('pending') ? 'dashboard-status-pending' : 'dashboard-status-confirmed'
                        return (
                          <tr key={b.id}>
                            <td>{svc.name}</td>
                            <td>{[b.date, b.time].filter(Boolean).join(' ')}</td>
                            <td><span className={`dashboard-status ${statusClass}`}>{b.status || 'Confirmed'}</span></td>
                            <td>—</td>
                            <td>Rs.{(svc.price || 0).toLocaleString()}</td>
                            <td>
                              <button type="button" className="dashboard-btn-cancel" onClick={() => handleCancelBooking(b.id)}>Cancel</button>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}

          {page === 'booking' && (
            <section className="dashboard-page active">
              <header className="dashboard-main-header">
                <h1 className="dashboard-page-title">Book a Service</h1>
              </header>
              <form className="dashboard-booking-form" onSubmit={handleBookingSubmit}>
                <div className="dashboard-booking-form-grid">
                  <div className="dashboard-form-group">
                    <label htmlFor="bookingService">Select Service *</label>
                    <select id="bookingService" name="bookingService" required>
                      <option value="">Choose a service</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>{s.name} — Rs.{(s.price || 0).toLocaleString()}</option>
                      ))}
                    </select>
                  </div>
                  <div className="dashboard-form-group">
                    <label htmlFor="bookingDate">Date *</label>
                    <input type="date" id="bookingDate" name="bookingDate" required min={today} />
                  </div>
                  <div className="dashboard-form-group">
                    <label htmlFor="bookingTime">Time *</label>
                    <input type="time" id="bookingTime" name="bookingTime" required />
                  </div>
                </div>
                <div className="dashboard-form-group">
                  <label htmlFor="bookingNotes">Additional notes (optional)</label>
                  <textarea id="bookingNotes" name="bookingNotes" rows="3" placeholder="Any special requirements..." />
                </div>
                <button type="submit" className="dashboard-btn-submit">Submit Booking</button>
              </form>
            </section>
          )}

          {page === 'confirmation' && confirmation && (
            <section className="dashboard-page active">
              <div className="dashboard-confirmation-card">
                <div className="dashboard-confirmation-icon">✓</div>
                <h2 className="dashboard-confirmation-title">Booking Confirmed</h2>
                <p className="dashboard-confirmation-msg">Your appointment has been booked successfully.</p>
                <div className="dashboard-confirmation-details">
                  <p><strong>Service:</strong> {confirmation.serviceName}</p>
                  <p><strong>Date:</strong> {confirmation.date}</p>
                  <p><strong>Time:</strong> {confirmation.time}</p>
                  {confirmation.notes && <p><strong>Notes:</strong> {confirmation.notes}</p>}
                </div>
                <button type="button" className="dashboard-btn-book" onClick={() => setPage('dashboard')}>View My Bookings</button>
              </div>
            </section>
          )}

          {page === 'profile' && (
            <section className="dashboard-page active">
              <header className="dashboard-main-header dashboard-profile-header">
                <h1 className="dashboard-page-title">My Profile</h1>
                <div className="dashboard-header-actions">
                  <Link to="/" className="dashboard-btn-logout">Log Out</Link>
                  <Link to="/#contact" className="dashboard-btn-book">Book Now</Link>
                  <button type="submit" form="profileForm" className="dashboard-btn-edit">Edit Profile</button>
                </div>
              </header>
              <div className="dashboard-profile-layout">
                <div className="dashboard-profile-card">
                  <div className="dashboard-profile-avatar">{(profile.name || 'C').charAt(0).toUpperCase()}</div>
                  <p className="dashboard-profile-name">{profile.name || 'Customer User'}</p>
                  <p className="dashboard-profile-email">{profile.email || 'customer@gmail.com'}</p>
                  <span className="dashboard-profile-badge">Customer</span>
                </div>
                <form id="profileForm" className="dashboard-profile-form" onSubmit={handleSaveProfile}>
                  <div className="dashboard-profile-info-card">
                    <h3 className="dashboard-profile-info-title">Personal Information</h3>
                    <div className="dashboard-profile-field">
                      <span className="dashboard-profile-field-icon">👤</span>
                      <div className="dashboard-profile-field-input">
                        <label htmlFor="profileName">Full Name</label>
                        <input type="text" id="profileName" name="profileName" defaultValue={profile.name} placeholder="Enter your full name" />
                      </div>
                    </div>
                    <div className="dashboard-profile-field">
                      <span className="dashboard-profile-field-icon">✉</span>
                      <div className="dashboard-profile-field-input">
                        <label htmlFor="profileEmail">Email Address</label>
                        <input type="email" id="profileEmail" name="profileEmail" defaultValue={profile.email} placeholder="Enter your email" />
                      </div>
                    </div>
                    <div className="dashboard-profile-field">
                      <span className="dashboard-profile-field-icon">📞</span>
                      <div className="dashboard-profile-field-input">
                        <label htmlFor="profilePhone">Phone Number</label>
                        <input type="tel" id="profilePhone" name="profilePhone" defaultValue={profile.phone} placeholder="Enter your Phone Number" />
                      </div>
                    </div>
                    <div className="dashboard-profile-field">
                      <span className="dashboard-profile-field-icon">📍</span>
                      <div className="dashboard-profile-field-input">
                        <label htmlFor="profileAddress">Address</label>
                        <input type="text" id="profileAddress" name="profileAddress" defaultValue={profile.address} placeholder="Enter your address" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              {profileSaved && <p className="dashboard-form-success">Profile saved successfully.</p>}
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
