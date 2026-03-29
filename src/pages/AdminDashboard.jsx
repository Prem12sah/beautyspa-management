import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { STORAGE_KEYS } from '../constants'
import '../styles/admin-dashboard.css'

const PAGES = {
  dashboard: 'Dashboard',
  services: 'Services',
  employees: 'Employees',
  booking: 'Booking',
  payment: 'Payment',
  'business-profile': 'Business Profile',
}

const NAV_ITEMS = [
  { id: 'dashboard', icon: '▦', label: 'Dashboard' },
  { id: 'services', icon: '◎', label: 'Services' },
  { id: 'employees', icon: '👥', label: 'Employees' },
  { id: 'booking', icon: '📅', label: 'Booking' },
  { id: 'payment', icon: '💳', label: 'Payment' },
  { id: 'business-profile', icon: '🏢', label: 'Business Profile' },
]

const BUSINESS_FIELDS = ['businessName', 'logoText', 'businessAddress', 'businessPhone', 'businessEmail', 'businessHours']

export default function AdminDashboard() {
  const [page, setPage] = useState('dashboard')
  const [businessProfile, setBusinessProfile] = useState({
    businessName: 'Geek Beauty Spa',
    logoText: 'GBS',
    businessAddress: 'Kathmandu, Nepal',
    businessPhone: '+977 980000000',
    businessEmail: 'geekbeautyspa@gmail.com',
    businessHours: 'Sun-Fri: 8:00 AM- 8:00 PM',
  })
  const [bookings, setBookings] = useState([])

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEYS.businessProfile)
    if (raw) {
      try {
        setBusinessProfile((prev) => ({ ...prev, ...JSON.parse(raw) }))
      } catch (_) {}
    }
    const bRaw = localStorage.getItem(STORAGE_KEYS.bookings)
    if (bRaw) {
      try {
        setBookings(JSON.parse(bRaw))
      } catch (_) {}
    }
  }, [])

  const confirmedBookings = bookings.filter((b) => b.status !== 'cancelled')
  const totalRevenue = confirmedBookings.reduce((sum, b) => sum + (b.amount || 0), 0)

  const handleBusinessSave = (e) => {
    e.preventDefault()
    const form = e.target
    const data = {}
    BUSINESS_FIELDS.forEach((f) => {
      const el = form[f]
      if (el) data[f] = el.value
    })
    localStorage.setItem(STORAGE_KEYS.businessProfile, JSON.stringify(data))
    setBusinessProfile((prev) => ({ ...prev, ...data }))
    alert('Business profile saved.')
  }

  return (
    <div className="admin-dashboard-body">
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <p className="admin-sidebar-label">Admin Dashboard</p>
          <Link to="/" className="admin-brand">
            <img src="/assets/images/logo1.png" alt="Geek Beauty Spa" className="admin-brand-img" />
            <span className="admin-brand-sub">__ Beauty Spa __</span>
          </Link>
          <hr className="admin-divider" />
          <nav className="admin-nav">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                type="button"
                className={`admin-nav-link ${page === item.id ? 'active' : ''}`}
                onClick={() => setPage(item.id)}
              >
                <span className="admin-nav-icon">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
          <hr className="admin-divider" />
          <div className="admin-user">
            <div className="admin-user-avatar"></div>
            <div className="admin-user-info">
              <span className="admin-user-name">Admin User</span>
              <span className="admin-user-email">example@123.com</span>
            </div>
          </div>
        </aside>

        <main className="admin-main">
          <header className="admin-main-header">
            <h1 className="admin-page-title">{PAGES[page]}</h1>
            <button type="button" className="admin-logout" onClick={() => window.location.href = '/'}>
              Log Out
            </button>
          </header>

          {page === 'dashboard' && (
            <section className="admin-page active">
              <div className="admin-cards">
                <div className="admin-card">
                  <div className="admin-card-icon admin-card-icon-blue">▦</div>
                  <div>
                    <p className="admin-card-label">Total Bookings</p>
                    <p className="admin-card-value">{confirmedBookings.length}</p>
                  </div>
                </div>
                <div className="admin-card">
                  <div className="admin-card-icon admin-card-icon-green">$</div>
                  <div>
                    <p className="admin-card-label">Total Revenue</p>
                    <p className="admin-card-value">Rs.{totalRevenue.toLocaleString()}</p>
                  </div>
                </div>
                <div className="admin-card">
                  <div className="admin-card-icon admin-card-icon-purple">⚙</div>
                  <div>
                    <p className="admin-card-label">Active Services</p>
                    <p className="admin-card-value">6</p>
                  </div>
                </div>
                <div className="admin-card">
                  <div className="admin-card-icon admin-card-icon-red">👥</div>
                  <div>
                    <p className="admin-card-label">Team Members</p>
                    <p className="admin-card-value">3</p>
                  </div>
                </div>
              </div>
              <h2 className="admin-section-title">Recent Bookings</h2>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>CUSTOMER</th>
                      <th>SERVICE</th>
                      <th>DATE</th>
                      <th>STATUS</th>
                      <th>AMOUNT</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmedBookings.slice(0, 5).map((b) => (
                      <tr key={b.id}>
                        <td>{b.customerName}<br /><small>{b.customerEmail}</small></td>
                        <td>{b.serviceName}</td>
                        <td>{b.date} {b.time}</td>
                        <td><span className="admin-status admin-status-confirmed">{b.status || 'Confirmed'}</span></td>
                        <td>Rs.{(b.amount || 0).toLocaleString()}</td>
                      </tr>
                    ))}
                    {confirmedBookings.length === 0 && (
                      <tr><td colSpan="5" style={{ textAlign: 'center', padding: '24px' }}>No bookings yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {page === 'services' && (
            <section className="admin-page active">
              <div className="admin-page-head">
                <h2 className="admin-section-title admin-section-title-lg">Service Management</h2>
                <button type="button" className="admin-btn-add">+ Add Service</button>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>CATEGORY</th>
                      <th>PRICE</th>
                      <th>DURATION</th>
                      <th>STATUS</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Haircut & Styling', price: 3500, duration: '40min' },
                      { name: 'MakeUp', price: 2000, duration: '40min' },
                      { name: 'Manicure & Pedicure', price: 4000, duration: '60min' },
                      { name: 'Massage', price: 4500, duration: '45min' },
                    ].map((s, i) => (
                      <tr key={i}>
                        <td>{s.name}</td>
                        <td>Salon & Spa Service</td>
                        <td>Rs.{s.price.toLocaleString()}</td>
                        <td>{s.duration}</td>
                        <td><span className="admin-status admin-status-active">Active</span></td>
                        <td className="admin-actions">
                          <button type="button" className="admin-btn-icon admin-btn-edit" title="Edit">✎</button>
                          <button type="button" className="admin-btn-icon admin-btn-delete" title="Delete">🗑</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {page === 'employees' && (
            <section className="admin-page active">
              <div className="admin-page-head">
                <h2 className="admin-section-title admin-section-title-lg">Employee Management</h2>
                <button type="button" className="admin-btn-add">+ Add Employee</button>
              </div>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>NAME</th>
                      <th>EMAIL</th>
                      <th>PHONE</th>
                      <th>ROLE</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Aaysha Malla', email: 'aaysha@gmail.com', phone: '+977 9841111111', role: 'Founder' },
                      { name: 'Priyanka Neupane', email: 'priyanka@gmail.com', phone: '+977 9842222222', role: 'Employee' },
                      { name: 'Jasmine Malla', email: 'jasmine@gmail.com', phone: '+977 9843333333', role: 'Employee' },
                    ].map((e, i) => (
                      <tr key={i}>
                        <td>{e.name}</td>
                        <td>{e.email}</td>
                        <td>{e.phone}</td>
                        <td>{e.role}</td>
                        <td><span className="admin-status admin-status-active">Active</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {page === 'booking' && (
            <section className="admin-page active">
              <h2 className="admin-section-title admin-section-title-lg">Booking Management</h2>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>CUSTOMER</th>
                      <th>SERVICE</th>
                      <th>DATE & TIME</th>
                      <th>STATUS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {confirmedBookings.map((b) => (
                      <tr key={b.id}>
                        <td>{b.customerName}</td>
                        <td>{b.serviceName}</td>
                        <td>{b.date} {b.time}</td>
                        <td><span className="admin-status admin-status-confirmed">{b.status || 'Confirmed'}</span></td>
                      </tr>
                    ))}
                    {confirmedBookings.length === 0 && (
                      <tr><td colSpan="4" style={{ textAlign: 'center', padding: '24px' }}>No bookings yet</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {page === 'payment' && (
            <section className="admin-page active">
              <h2 className="admin-section-title admin-section-title-lg">Payments</h2>
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>PAYMENT ID</th>
                      <th>BOOKING ID</th>
                      <th>GATEWAY</th>
                      <th>AMOUNT</th>
                      <th>STATUS</th>
                      <th>DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Sample</td>
                      <td>ESEWA</td>
                      <td>Rs.5,000</td>
                      <td><span className="admin-status admin-status-completed">Completed</span></td>
                      <td>2026-01-25</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {page === 'business-profile' && (
            <section className="admin-page active">
              <h2 className="admin-section-title admin-section-title-lg">Business Profile</h2>
              <form id="businessProfileForm" className="admin-profile-form" onSubmit={handleBusinessSave}>
                <div className="admin-form-row">
                  <div className="admin-form-group admin-form-group-flex">
                    <label htmlFor="businessName">Business Name</label>
                    <input type="text" id="businessName" name="businessName" defaultValue={businessProfile.businessName} />
                  </div>
                  <div className="admin-form-group admin-form-group-narrow">
                    <label htmlFor="logoText">LOGO Text</label>
                    <input type="text" id="logoText" name="logoText" defaultValue={businessProfile.logoText} />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label htmlFor="businessAddress">Address</label>
                  <input type="text" id="businessAddress" name="businessAddress" defaultValue={businessProfile.businessAddress} />
                </div>
                <div className="admin-form-row">
                  <div className="admin-form-group admin-form-group-flex">
                    <label htmlFor="businessPhone">Phone</label>
                    <input type="tel" id="businessPhone" name="businessPhone" defaultValue={businessProfile.businessPhone} />
                  </div>
                  <div className="admin-form-group admin-form-group-flex">
                    <label htmlFor="businessEmail">E-mail</label>
                    <input type="email" id="businessEmail" name="businessEmail" defaultValue={businessProfile.businessEmail} />
                  </div>
                </div>
                <div className="admin-form-group">
                  <label htmlFor="businessHours">Business Hours</label>
                  <input type="text" id="businessHours" name="businessHours" defaultValue={businessProfile.businessHours} />
                </div>
                <button type="submit" className="admin-btn-save">Save Changes</button>
              </form>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}
