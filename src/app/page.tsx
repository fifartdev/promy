export default function LandingPage() {
  return (
    <>
      {/* ── Nav ──────────────────────────────────────────────────────────────── */}
      <nav className="nav">
        <div className="container nav-inner">
          <span className="nav-logo">Promy</span>
          <ul className="nav-links">
            <li><a href="#features">Features</a></li>
            <li><a href="#how">How It Works</a></li>
            <li><a href="#roles">For Businesses</a></li>
            <li>
              <a href="/admin" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }}>
                Admin Login
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container">
          <div className="hero-badge">📍 Proximity Marketing</div>
          <h1>
            Discover promotions the moment you&nbsp;<span>arrive</span>
          </h1>
          <p>
            Promy sends you a notification the second you step near a participating business —
            no searching, no app-opening required.
          </p>
          <div className="hero-actions">
            <a href="#download" className="btn btn-primary">
              ⬇ Download the App
            </a>
            <a href="/admin" className="btn btn-outline">
              Business Login
            </a>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────────── */}
      <section className="features" id="features">
        <div className="container">
          <p className="section-label">Why Promy</p>
          <h2 className="section-title">Hyperlocal. Instant. Effortless.</h2>
          <p className="section-subtitle">
            Promy combines precise geofencing with real-time promotions so customers
            never miss a deal when they&apos;re already nearby.
          </p>
          <div className="features-grid">
            {[
              {
                icon: '📡',
                title: '25-Metre Precision',
                desc: 'Geofences accurate to 25 metres mean notifications fire exactly when a customer reaches your door — not half a kilometre away.',
              },
              {
                icon: '⚡',
                title: 'Instant Notifications',
                desc: 'Background geofencing works even when the app is closed. Your promo reaches the customer at the perfect moment.',
              },
              {
                icon: '🏷️',
                title: 'Live Promotions',
                desc: 'Update your promo title, description, and CTA link from the Business Admin panel. Changes go live within minutes.',
              },
              {
                icon: '🗂️',
                title: 'Category Discovery',
                desc: 'Customers can browse businesses by category — restaurants, retail, wellness and more — and favourite their go-to spots.',
              },
              {
                icon: '🔗',
                title: 'Deep-Link CTAs',
                desc: 'Tapping a notification opens your promo page or any external URL directly — frictionless for the customer.',
              },
              {
                icon: '🔒',
                title: 'Privacy First',
                desc: 'No user accounts required. Location data never leaves the device. Only push tokens are stored — nothing else.',
              },
            ].map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ─────────────────────────────────────────────────────── */}
      <section className="how" id="how">
        <div className="container">
          <p className="section-label">The Flow</p>
          <h2 className="section-title">How Promy Works</h2>
          <div className="steps">
            {[
              { n: 1, title: 'Download PromyApp', desc: 'Available on iOS and Android. No account needed — just allow location & notifications.' },
              { n: 2, title: 'Discover Businesses', desc: 'Browse featured businesses and category tiles on your personalised dashboard.' },
              { n: 3, title: 'Walk Near a Business', desc: 'PromyApp silently monitors your position in the background using geofencing.' },
              { n: 4, title: 'Get Notified', desc: 'The moment you enter a 25-metre radius, a rich notification with the business promo arrives instantly.' },
              { n: 5, title: 'Claim the Offer', desc: 'Tap the notification to open the promo detail or go straight to the CTA link.' },
            ].map((s) => (
              <div key={s.n} className="step">
                <div className="step-number">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roles ────────────────────────────────────────────────────────────── */}
      <section className="roles" id="roles">
        <div className="container">
          <p className="section-label">Access Levels</p>
          <h2 className="section-title">Built for Every Stakeholder</h2>
          <p className="section-subtitle">
            Promy has three distinct roles — from platform super-admins to individual
            business owners updating today&apos;s special.
          </p>
          <div className="roles-grid">
            <div className="role-card highlight">
              <p className="role-tag">Super Admin</p>
              <h3>Platform Owner</h3>
              <ul>
                <li>Full CMS access via /admin</li>
                <li>Create & manage all businesses</li>
                <li>Manage categories & media</li>
                <li>View guest push tokens</li>
                <li>Create Business Admin accounts</li>
              </ul>
            </div>
            <div className="role-card">
              <p className="role-tag">Business Admin</p>
              <h3>Business Owner</h3>
              <ul>
                <li>Login to /admin panel</li>
                <li>Edit promo title & description</li>
                <li>Update promo image</li>
                <li>Change the CTA link anytime</li>
                <li>No access to other businesses</li>
              </ul>
            </div>
            <div className="role-card">
              <p className="role-tag">Guest User</p>
              <h3>App User</h3>
              <ul>
                <li>No registration required</li>
                <li>Browse businesses & categories</li>
                <li>Receive geofence notifications</li>
                <li>Tap to claim offers</li>
                <li>Zero data stored (only push token)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="cta-section" id="download">
        <div className="container">
          <h2>Ready to reach customers at the door?</h2>
          <p>Download PromyApp or log in to the business admin panel to get started.</p>
          <div className="stores">
            <div className="store-badge">
              <span style={{ fontSize: '1.5rem' }}></span>
              <span>App Store</span>
            </div>
            <div className="store-badge">
              <span style={{ fontSize: '1.5rem' }}>▶</span>
              <span>Google Play</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────────────────── */}
      <footer className="footer">
        <div className="container footer-inner">
          <span className="footer-logo">Promy</span>
          <span className="footer-copy">© {new Date().getFullYear()} Promy. All rights reserved.</span>
          <a href="/admin" className="footer-link">Business Admin →</a>
        </div>
      </footer>
    </>
  )
}
