'use client';

import { useState } from 'react';

// Main App Component with Routing Logic
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.email && credentials.password) {
      setShowLoginModal(false);
      setCurrentPage('orion');
    }
  };

  const handleLogout = () => {
    // Use setTimeout to defer state updates and prevent blocking
    setTimeout(() => {
      setCurrentPage('home');
      setCredentials({ email: '', password: '' });
    }, 0);
  };

  const navigateToOrion = () => {
    setShowLoginModal(true);
  };

  // Render appropriate page based on current route
  if (currentPage === 'orion') {
    return <OrionLandingPage onLogout={handleLogout} />;
  }

  return (
    <>
      <HomePage 
        showLoginModal={showLoginModal}
        setShowLoginModal={setShowLoginModal}
        credentials={credentials}
        setCredentials={setCredentials}
        handleLogin={handleLogin}
        navigateToOrion={navigateToOrion}
      />
    </>
  );
}

// Homepage Component
function HomePage({
  showLoginModal,
  setShowLoginModal,
  credentials,
  setCredentials,
  handleLogin,
  navigateToOrion
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white text-gray-900 font-light">
      {/* Dashboard Navigation - Black Header with White Text */}
      <nav className="border-b border-gray-800 sticky top-0 bg-black z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <img 
                src="/logo.png.jpeg" 
                alt="EllingtonHart Capital Logo" 
                width={60} 
                height={60}
                className="object-contain w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
              />
              <div className="text-sm sm:text-xl md:text-2xl font-normal tracking-tight text-white">
                ELLINGTONHART CAPITAL
              </div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#overview" className="text-gray-300 hover:text-white text-sm">Overview</a>
              <a href="#markets" className="text-gray-300 hover:text-white text-sm">Markets</a>
              <a href="#derivatives" className="text-gray-300 hover:text-white text-sm">Derivatives</a>
              <a href="#news" className="text-gray-300 hover:text-white text-sm">News</a>
              <button 
                onClick={() => setShowLoginModal(true)}
                className="text-sm font-medium uppercase border border-white text-white px-6 py-2 rounded-sm hover:bg-white hover:text-black transition-all"
              >
                Login
              </button>
            </div>
            
            {/* Mobile Hamburger Menu */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-white p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-700">
              <div className="flex flex-col space-y-4">
                <a 
                  href="#overview" 
                  className="text-gray-300 hover:text-white text-sm py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Overview
                </a>
                <a 
                  href="#markets" 
                  className="text-gray-300 hover:text-white text-sm py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Markets
                </a>
                <a 
                  href="#derivatives" 
                  className="text-gray-300 hover:text-white text-sm py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Derivatives
                </a>
                <a 
                  href="#news" 
                  className="text-gray-300 hover:text-white text-sm py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  News
                </a>
                <button 
                  onClick={() => {
                    setShowLoginModal(true);
                    setMobileMenuOpen(false);
                  }}
                  className="text-sm font-medium uppercase border border-white text-white px-6 py-3 rounded-sm hover:bg-white hover:text-black transition-all text-center"
                >
                  Login
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm max-w-md w-full p-8 relative">
            <button 
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-900 text-2xl"
            >
              ×
            </button>
            <h2 className="text-3xl font-light mb-2 tracking-tight">Client Login</h2>
            <p className="text-gray-600 mb-8 text-sm">Access your morning trading data dashboard</p>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-normal mb-2 text-gray-700">Email Address</label>
                <input 
                  type="email"
                  value={credentials.email}
                  onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                  className="w-full border border-gray-300 px-4 py-3 rounded-sm focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="you@company.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-normal mb-2 text-gray-700">Password</label>
                <input 
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                  className="w-full border border-gray-300 px-4 py-3 rounded-sm focus:outline-none focus:border-gray-900 transition-colors"
                  placeholder="••••••••"
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-gray-900 hover:text-gray-600">Forgot password?</a>
              </div>

              <button 
                onClick={handleLogin}
                className="w-full bg-gray-900 text-white py-3 rounded-sm hover:bg-gray-800 transition-colors font-normal tracking-wide uppercase text-sm"
              >
                Access Dashboard
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-gray-600">
              Need access? <a href="#contact" className="text-gray-900 hover:text-gray-600 font-normal">Contact us</a>
            </p>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-extralight leading-none mb-16 tracking-tighter">
            We partner<br />
            with bold<br />
            <span className="italic font-light">founders</span>
          </h1>
          <div className="max-w-2xl">
            <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed mb-12">
              Building enduring companies that shape the future of finance, technology, and human progress.
            </p>
            <a 
              href="#contact" 
              className="inline-block text-xs font-medium tracking-widest uppercase border-b border-black pb-1 hover:border-gray-400 transition-all duration-300"
            >
              For Founders
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-5xl md:text-6xl font-extralight leading-tight mb-12 tracking-tight text-neutral-900">
                Our philosophy
              </h2>
            </div>
            <div className="space-y-16">
              <div>
                <h3 className="text-lg font-medium mb-3 tracking-wide text-neutral-900">Partnership first</h3>
                <p className="text-neutral-600 text-base leading-relaxed font-light">
                  We believe in rolling up our sleeves alongside exceptional founders. 
                  Our success is measured by the lasting impact our companies create.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 tracking-wide text-neutral-900">Patient capital</h3>
                <p className="text-neutral-600 text-base leading-relaxed font-light">
                  Great companies take time to build. We provide the runway and support 
                  needed to think in decades, not quarters.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-3 tracking-wide text-neutral-900">Conviction-driven</h3>
                <p className="text-neutral-600 text-base leading-relaxed font-light">
                  We make concentrated bets on ideas we deeply believe in, 
                  backing founders who are solving tomorrow's problems today.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas */}
      <section className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extralight leading-tight mb-20 tracking-tight max-w-4xl">
            Where we focus
          </h2>
          
          <div className="space-y-24">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              <div>
                <div className="mb-8">
                  <h3 className="text-3xl font-light mb-6">Financial Infrastructure</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Reimagining the rails of global finance—from payments and lending 
                    to wealth management and institutional services.
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-8">
                  <h3 className="text-3xl font-light mb-6">Enterprise Solutions</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Building the tools that power the next generation of business—
                    automation, intelligence, and seamless operations.
                  </p>
                </div>
              </div>

              <div>
                <div className="mb-8">
                  <h3 className="text-3xl font-light mb-6">Emerging Technologies</h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    Supporting breakthrough innovations in AI, quantum computing, 
                    and technologies that will define the next decade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-32 px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            <div>
              <div className="text-5xl md:text-6xl font-extralight mb-4 tracking-tight">$2.5B</div>
              <div className="text-black text-sm uppercase tracking-wider">Assets Under Management</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-extralight mb-4 tracking-tight">47</div>
              <div className="text-black text-sm uppercase tracking-wider">Portfolio Companies</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-extralight mb-4 tracking-tight">12</div>
              <div className="text-black text-sm uppercase tracking-wider">Successful Exits</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-extralight mb-4 tracking-tight">15+</div>
              <div className="text-black text-sm uppercase tracking-wider">Years of Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Showcase */}
      <section id="companies" className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extralight leading-tight mb-20 tracking-tight">
            Portfolio companies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { name: 'FinanceFlow', description: 'Next-generation payment infrastructure', stage: 'Series B' },
              { name: 'DataVault', description: 'Enterprise data security platform', stage: 'Series A' },
              { name: 'HealthLink', description: 'AI-powered healthcare analytics', stage: 'Series C' },
              { name: 'CloudCore', description: 'Distributed computing infrastructure', stage: 'Seed' },
              { name: 'TradeTech', description: 'Institutional trading platform', stage: 'Series A' },
              { name: 'InsureTech', description: 'Digital insurance marketplace', stage: 'Series B' }
            ].map((company, index) => (
              <div key={index} className="group">
                <div className="border border-neutral-200 hover:border-black transition-all duration-500 p-10 h-full hover:shadow-sm">
                  <h3 className="text-xl font-light mb-4 tracking-tight">{company.name}</h3>
                  <p className="text-neutral-600 mb-6 leading-relaxed text-sm font-light">{company.description}</p>
                  <div className="text-xs uppercase tracking-widest text-neutral-400 font-medium">{company.stage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-32 px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extralight leading-tight mb-20 tracking-tight">
            Our team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            <div className="group">
              <div className="aspect-square bg-black mb-8 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black"></div>
                <div className="w-full h-full flex items-center justify-center text-neutral-500 relative z-10 text-xs tracking-widest uppercase">
                  Photo
                </div>
              </div>
              <h3 className="text-xl font-light mb-2 tracking-tight">Sarah Chen</h3>
              <p className="text-neutral-500 text-xs mb-5 uppercase tracking-widest font-medium">Managing Partner</p>
              <p className="text-neutral-600 leading-relaxed text-sm font-light">
                Former Goldman Sachs VP and McKinsey Principal. 
                Led investments in 15+ unicorn companies over the past decade.
              </p>
            </div>

            <div className="group">
              <div className="aspect-square bg-black mb-8 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black"></div>
                <div className="w-full h-full flex items-center justify-center text-neutral-500 relative z-10 text-xs tracking-widest uppercase">
                  Photo
                </div>
              </div>
              <h3 className="text-xl font-light mb-2 tracking-tight">Marcus Rodriguez</h3>
              <p className="text-neutral-500 text-xs mb-5 uppercase tracking-widest font-medium">Partner</p>
              <p className="text-neutral-600 leading-relaxed text-sm font-light">
                Serial entrepreneur with two successful exits. 
                Expertise in fintech and enterprise software scaling.
              </p>
            </div>

            <div className="group">
              <div className="aspect-square bg-black mb-8 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-black"></div>
                <div className="w-full h-full flex items-center justify-center text-neutral-500 relative z-10 text-xs tracking-widest uppercase">
                  Photo
                </div>
              </div>
              <h3 className="text-xl font-light mb-2 tracking-tight">Dr. Emily Watson</h3>
              <p className="text-neutral-500 text-xs mb-5 uppercase tracking-widest font-medium">Partner</p>
              <p className="text-neutral-600 leading-relaxed text-sm font-light">
                PhD Economics from Stanford. Former head of innovation 
                at a Fortune 500 financial services company.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="py-32 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-6xl md:text-8xl font-extralight leading-none mb-16 tracking-tighter">
            Get in touch
          </h2>
          <p className="text-xl md:text-2xl text-neutral-500 font-light leading-relaxed mb-16 max-w-3xl mx-auto">
            Building something that could change an industry? 
            We'd love to hear from you.
          </p>
          <div className="space-y-8">
            <a 
              href="mailto:hello@ellingtonhart.com" 
              className="inline-block text-base font-light tracking-wide border-b border-black pb-2 hover:border-neutral-400 transition-all duration-300"
            >
              hello@ellingtonhart.com
            </a>
            <div className="text-neutral-600 font-light">
              <p className="mb-2 text-sm">New York Office</p>
              <p className="text-sm">+1 (212) 555-0123</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-emerald-600 text-white py-16 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-sm font-normal mb-6 uppercase tracking-wider">About</h4>
              <div className="space-y-4">
                <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Our Ethos</a>
                <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Our History</a>
                <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Jobs</a>
                <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Legal</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-normal mb-6 uppercase tracking-wider">Business Entities</h4>
              <div className="space-y-4">
                <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Ellington Hart Capital</a>
                <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Ellington Hart Ventures</a>
                <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Ellington Hart Global Equities</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-normal mb-6 uppercase tracking-wider">Login</h4>
              <div className="space-y-4">
                <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">LP Login</a>
                <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Ellington Hart Ampersand Login</a>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-normal mb-6 uppercase tracking-wider">Motion</h4>
              <div className="mb-6">
                <div className="flex space-x-4">
                  <button className="px-4 py-2 border border-white rounded-full text-xs font-medium hover:bg-white hover:text-emerald-600 transition-colors">
                    ON
                  </button>
                  <button className="px-4 py-2 border border-emerald-400 rounded-full text-xs font-medium text-emerald-200">
                    OFF
                  </button>
                </div>
              </div>
              <div className="text-xs text-emerald-200">
                © 2025 ELLINGTONHART CAPITAL
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ORION Landing Page Component
function OrionLandingPage({ onLogout }) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const currentDate = new Date().toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Dashboard Navigation */}
      <nav className="border-b border-gray-100 sticky top-0 bg-white z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="12" r="1.5" fill="#0A1F44"/>
                <circle cx="12" cy="16" r="1.5" fill="#0A1F44"/>
                <circle cx="20" cy="16" r="1.5" fill="#0A1F44"/>
                <line x1="16" y1="12" x2="12" y2="16" stroke="#10B981" strokeWidth="0.5"/>
                <line x1="16" y1="12" x2="20" y2="16" stroke="#10B981" strokeWidth="0.5"/>
              </svg>
              <div>
                <div className="text-xl font-bold text-[#0A1F44]">ORION</div>
                <div className="text-[8px] text-gray-500 -mt-0.5">ELLINGTONHART CAPITAL</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a href="#markets" className="text-gray-600 hover:text-[#0A1F44] text-sm transition-colors">Markets</a>
              <a href="#derivatives" className="text-gray-600 hover:text-[#0A1F44] text-sm transition-colors">Derivatives</a>
              <a href="#news" className="text-gray-600 hover:text-[#0A1F44] text-sm transition-colors">News</a>
              <button 
                onClick={onLogout}
                className="text-sm font-medium uppercase border-2 border-[#0A1F44] text-[#0A1F44] px-4 py-2 rounded-sm hover:bg-[#0A1F44] hover:text-white transition-all"
              >
                Logout
              </button>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-[#0A1F44] p-2"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <div className="flex flex-col space-y-4">
                <a href="#markets" className="text-gray-600 hover:text-[#0A1F44] text-sm py-2" onClick={() => setMobileMenuOpen(false)}>Markets</a>
                <a href="#derivatives" className="text-gray-600 hover:text-[#0A1F44] text-sm py-2" onClick={() => setMobileMenuOpen(false)}>Derivatives</a>
                <a href="#news" className="text-gray-600 hover:text-[#0A1F44] text-sm py-2" onClick={() => setMobileMenuOpen(false)}>News</a>
                <button onClick={() => { onLogout(); setMobileMenuOpen(false); }} className="text-sm font-medium uppercase border-2 border-[#0A1F44] text-[#0A1F44] px-4 py-3 rounded-sm hover:bg-[#0A1F44] hover:text-white transition-all text-center">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Educational Disclaimer */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-2">
          <p className="text-xs text-center text-amber-900">
            <strong>Educational market data only.</strong> ORION provides factual information for awareness purposes. Not investment advice.
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-12 pb-8 px-4 sm:px-8 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-5xl font-extralight mb-2 tracking-tight text-[#0A1F44]">Good Morning</h1>
              <p className="text-lg text-gray-600">Your market intelligence briefing is ready</p>
            </div>
            <div className="text-right">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-black/70 mb-2">
                <span>Last Updated: {currentDate}</span>
                <span className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded-full font-medium">Live</span>
              </div>
              <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                Export Report →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Cards */}
      <section className="px-4 sm:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { value: '$12.85B', label: 'Cash Volume', color: 'text-black', bg: 'bg-white' },
              { value: '+0.88%', label: 'Sensex Change', color: 'text-emerald-600', bg: 'bg-emerald-50' },
              { value: '-$425M', label: 'FII Flows', color: 'text-red-600', bg: 'bg-red-50' },
              { value: '+$562M', label: 'DII Flows', color: 'text-emerald-600', bg: 'bg-emerald-50' }
            ].map((stat, i) => (
              <div key={i} className={`${stat.bg} border-2 border-gray-200 p-6 rounded-sm hover:shadow-lg transition-all`}>
                <div className={`text-4xl md:text-5xl font-extralight mb-2 tracking-tight ${stat.color}`}>
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-black">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Indices */}
      <section id="markets" className="px-4 sm:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extralight mb-6 tracking-tight text-[#0A1F44]">Global Indices</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { name: 'Dow Jones', change: '+0.81%', positive: true },
              { name: 'NASDAQ', change: '+1.24%', positive: true },
              { name: 'FTSE 100', change: '-0.35%', positive: false },
              { name: 'Nikkei 225', change: '+1.15%', positive: true }
            ].map((index, i) => (
              <div key={i} className="bg-white border-2 border-gray-200 p-5 rounded-sm hover:border-emerald-500 transition-all">
                <div className="text-xs uppercase tracking-widest text-black/70 mb-3">{index.name}</div>
                <div className={`text-3xl font-light ${index.positive ? 'text-emerald-600' : 'text-red-600'}`}>
                  {index.change}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Indian Indices */}
      <section className="px-4 sm:px-8 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto py-12">
          <h2 className="text-3xl font-extralight mb-6 tracking-tight text-[#0A1F44]">Indian Indices</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { name: 'Sensex', value: '81,785.56', change: '+0.88%' },
              { name: 'Nifty 50', value: '25,014.60', change: '+0.92%' },
              { name: 'Bank Nifty', value: '51,782.35', change: '+1.12%' }
            ].map((index, i) => (
              <div key={i} className="bg-white border-2 border-gray-200 p-6 rounded-sm hover:border-emerald-500 hover:shadow-lg transition-all">
                <div className="text-xs uppercase tracking-widest text-black/70 mb-2">{index.name}</div>
                <div className="text-3xl font-light mb-2 text-[#0A1F44]">{index.value}</div>
                <div className="text-emerald-600 font-medium text-lg">{index.change}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Mood */}
      <section className="px-4 sm:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extralight mb-6 tracking-tight text-[#0A1F44]">Market Mood</h2>
          <div className="bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 p-12 rounded-sm text-center">
            <div className="text-6xl font-extralight mb-4 text-emerald-600 tracking-tight">BULLISH</div>
            <p className="text-lg text-black mb-10 max-w-2xl mx-auto font-light">
              Strong buying interest across banking and IT sectors with broad-based participation
            </p>
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div>
                <div className="text-3xl font-light mb-2 text-emerald-600">1,847 / 1,125</div>
                <div className="text-xs uppercase tracking-widest text-black">Advance/Decline</div>
              </div>
              <div>
                <div className="text-3xl font-light mb-2 text-[#0A1F44]">127</div>
                <div className="text-xs uppercase tracking-widest text-black">52-Week High</div>
              </div>
              <div>
                <div className="text-3xl font-light mb-2 text-[#0A1F44]">42</div>
                <div className="text-xs uppercase tracking-widest text-black">52-Week Low</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sectorial Indices */}
      <section className="px-4 sm:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extralight mb-6 tracking-tight text-[#0A1F44]">Sectorial Indices</h2>
          <div className="bg-white border-2 border-gray-200 rounded-sm overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-gray-200 bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-xs uppercase tracking-widest text-black font-medium">Sector</th>
                  <th className="text-right p-4 text-xs uppercase tracking-widest text-black font-medium">Value</th>
                  <th className="text-right p-4 text-xs uppercase tracking-widest text-black font-medium">Change</th>
                  <th className="text-right p-4 text-xs uppercase tracking-widest text-black font-medium">% Change</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { sector: 'BSE Auto', value: '52,847.32', change: '+485.67', percent: '+0.93%', positive: true },
                  { sector: 'BSE Bankex', value: '58,963.45', change: '+672.18', percent: '+1.15%', positive: true },
                  { sector: 'BSE IT', value: '42,156.73', change: '+598.45', percent: '+1.44%', positive: true },
                  { sector: 'BSE Metal', value: '29,458.67', change: '-487.23', percent: '-1.63%', positive: false }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-[#0A1F44] font-medium">{row.sector}</td>
                    <td className="p-4 text-right text-black">{row.value}</td>
                    <td className={`p-4 text-right ${row.positive ? 'text-emerald-600' : 'text-red-600'}`}>{row.change}</td>
                    <td className={`p-4 text-right font-medium ${row.positive ? 'text-emerald-600' : 'text-red-600'}`}>{row.percent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Top Performers */}
      <section className="px-4 sm:px-8 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto py-12">
          <h2 className="text-3xl font-extralight mb-6 tracking-tight text-[#0A1F44]">Top Performers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-sm p-6">
              <h3 className="text-xs uppercase tracking-widest text-black mb-6 font-medium">Nifty Outperformers</h3>
              <div className="space-y-4">
                {[
                  { name: 'TCS', change: '+3.24%' },
                  { name: 'Infosys', change: '+2.87%' },
                  { name: 'HDFC Bank', change: '+2.45%' },
                  { name: 'ICICI Bank', change: '+2.12%' },
                  { name: 'Wipro', change: '+1.98%' }
                ].map((stock, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-[#0A1F44] font-light">{stock.name}</span>
                    <span className="text-emerald-600 font-medium">{stock.change}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-sm p-6">
              <h3 className="text-xs uppercase tracking-widest text-black mb-6 font-medium">Nifty Underperformers</h3>
              <div className="space-y-4">
                {[
                  { name: 'Tata Steel', change: '-2.87%' },
                  { name: 'JSW Steel', change: '-2.45%' },
                  { name: 'Hindalco', change: '-1.98%' },
                  { name: 'Coal India', change: '-1.76%' },
                  { name: 'NTPC', change: '-1.54%' }
                ].map((stock, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-[#0A1F44] font-light">{stock.name}</span>
                    <span className="text-red-600 font-medium">{stock.change}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Derivatives */}
      <section id="derivatives" className="px-4 sm:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extralight mb-6 tracking-tight text-[#0A1F44]">Derivative Updates</h2>
          <div className="bg-white border-2 border-gray-200 rounded-sm overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-gray-200 bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-xs uppercase tracking-widest text-black font-medium">Stock</th>
                  <th className="text-left p-4 text-xs uppercase tracking-widest text-black font-medium">Activity</th>
                  <th className="text-right p-4 text-xs uppercase tracking-widest text-black font-medium">OI Change</th>
                  <th className="text-right p-4 text-xs uppercase tracking-widest text-black font-medium">Price Change</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { stock: 'Infosys', activity: 'Long Build Up', oi: '+15.6%', price: '+2.87%', badge: 'bg-emerald-100 text-emerald-800', positive: true },
                  { stock: 'Tata Steel', activity: 'Short Build Up', oi: '+18.4%', price: '-2.87%', badge: 'bg-red-100 text-red-800', positive: false },
                  { stock: 'SBI', activity: 'Short Covering', oi: '-12.3%', price: '+1.65%', badge: 'bg-blue-100 text-blue-800', positive: true },
                  { stock: 'Maruti', activity: 'Long Unwinding', oi: '-9.8%', price: '-1.23%', badge: 'bg-orange-100 text-orange-800', positive: false }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-[#0A1F44]">{row.stock}</td>
                    <td className="p-4">
                      <span className={`inline-block px-3 py-1 rounded-sm text-xs font-semibold uppercase ${row.badge}`}>
                        {row.activity}
                      </span>
                    </td>
                    <td className="p-4 text-right text-black">{row.oi}</td>
                    <td className={`p-4 text-right font-medium ${row.positive ? 'text-emerald-600' : 'text-red-600'}`}>{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Delivery Spikes */}
      <section className="px-4 sm:px-8 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto py-12">
          <h2 className="text-3xl font-extralight mb-6 tracking-tight text-[#0A1F44]">Delivery Spikes</h2>
          <div className="bg-white border-2 border-gray-200 rounded-sm overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-gray-200 bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-xs uppercase tracking-widest text-black font-medium">Stock</th>
                  <th className="text-right p-4 text-xs uppercase tracking-widest text-black font-medium">Volume (Mn)</th>
                  <th className="text-right p-4 text-xs uppercase tracking-widest text-black font-medium">Delivery %</th>
                  <th className="text-right p-4 text-xs uppercase tracking-widest text-black font-medium">Spike</th>
                  <th className="text-right p-4 text-xs uppercase tracking-widest text-black font-medium">Change</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { stock: 'Reliance', volume: '8.45', delivery: '78.5%', spike: '↑ 2.8x', change: '+1.24%' },
                  { stock: 'TCS', volume: '5.67', delivery: '82.3%', spike: '↑ 3.1x', change: '+3.24%' },
                  { stock: 'HDFC Bank', volume: '12.34', delivery: '71.8%', spike: '↑ 2.5x', change: '+2.45%' },
                  { stock: 'Bharti Airtel', volume: '6.89', delivery: '75.6%', spike: '↑ 2.2x', change: '+0.87%' }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-[#0A1F44] font-medium">{row.stock}</td>
                    <td className="p-4 text-right text-black">{row.volume}</td>
                    <td className="p-4 text-right text-black">{row.delivery}</td>
                    <td className="p-4 text-right text-emerald-600 font-medium">{row.spike}</td>
                    <td className="p-4 text-right text-emerald-600 font-medium">{row.change}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Bulk Deals */}
      <section className="px-4 sm:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extralight mb-6 tracking-tight text-[#0A1F44]">Bulk Deals</h2>
          <div className="bg-white border-2 border-gray-200 rounded-sm overflow-x-auto">
            <table className="w-full">
              <thead className="border-b-2 border-gray-200 bg-gray-50">
                <tr>
                  <th className="text-left p-4 text-xs uppercase tracking-widest text-black font-medium">Stock</th>
                  <th className="text-left p-4 text-xs uppercase tracking-widest text-black font-medium">Client Name</th>
                  <th className="text-center p-4 text-xs uppercase tracking-widest text-black font-medium">Buy/Sell</th>
                  <th className="text-right p-4 text-xs uppercase tracking-widest text-black font-medium">Quantity (Mn)</th>
                  <th className="text-right p-4 text-xs uppercase tracking-widest text-black font-medium">Price (₹)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { stock: 'Tech Mahindra', client: 'Morgan Stanley Asia', type: 'BUY', qty: '2.45', price: '1,287.50', buy: true },
                  { stock: 'Adani Ports', client: 'Goldman Sachs India', type: 'SELL', qty: '1.87', price: '1,542.30', buy: false },
                  { stock: 'L&T', client: 'HDFC Mutual Fund', type: 'BUY', qty: '3.12', price: '3,658.75', buy: true }
                ].map((row, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-[#0A1F44] font-medium">{row.stock}</td>
                    <td className="p-4 text-black">{row.client}</td>
                    <td className={`p-4 text-center font-semibold ${row.buy ? 'text-emerald-600' : 'text-red-600'}`}>{row.type}</td>
                    <td className="p-4 text-right text-black">{row.qty}</td>
                    <td className="p-4 text-right text-black">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* News */}
      <section id="news" className="px-4 sm:px-8 pb-12 bg-gray-50">
        <div className="max-w-7xl mx-auto py-12">
          <h2 className="text-3xl font-extralight mb-6 tracking-tight text-[#0A1F44]">Global News</h2>
          <div className="space-y-3">
            {[
              { title: 'Fed signals cautious approach to rate cuts amid inflation concerns', time: '2 hours ago' },
              { title: 'Asian markets rally on positive China manufacturing data', time: '4 hours ago' },
              { title: 'Oil prices surge 2.5% on Middle East supply concerns', time: '5 hours ago' }
            ].map((news, i) => (
              <div key={i} className="bg-white border-2 border-gray-200 border-l-4 border-l-[#0A1F44] p-5 rounded-sm hover:shadow-lg transition-all">
                <h3 className="text-base font-semibold mb-1 text-[#0A1F44]">{news.title}</h3>
                <p className="text-sm text-black/70">{news.time}</p>
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-extralight mb-6 mt-12 tracking-tight text-[#0A1F44]">Sector & Corporate News</h2>
          <div className="space-y-3">
            {[
              { title: 'IT Sector: Major cloud contracts boost revenue outlook for top firms', time: '3 hours ago' },
              { title: 'Banking: NPA ratios decline to decade-low levels across PSU banks', time: '5 hours ago' },
              { title: 'Auto: EV sales surge 45% YoY, traditional vehicles see modest growth', time: '6 hours ago' }
            ].map((news, i) => (
              <div key={i} className="bg-white border-2 border-gray-200 border-l-4 border-l-emerald-600 p-5 rounded-sm hover:shadow-lg transition-all">
                <h3 className="text-base font-semibold mb-1 text-[#0A1F44]">{news.title}</h3>
                <p className="text-sm text-black/70">{news.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Economic Calendar & Events */}
      <section className="px-4 sm:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extralight mb-6 tracking-tight text-[#0A1F44]">Economic Calendar & Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white border-2 border-gray-200 rounded-sm p-6 hover:shadow-lg transition-all">
              <h3 className="text-xs uppercase tracking-widest text-black mb-6 font-medium">This Week</h3>
              <div className="space-y-6">
                {[
                  { event: 'RBI Monetary Policy', date: 'October 9, 2025' },
                  { event: 'US Non-Farm Payrolls', date: 'Friday, 6:00 PM IST' },
                  { event: 'India CPI Inflation', date: 'Monday, 5:30 PM IST' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="font-medium mb-1 text-[#0A1F44]">{item.event}</div>
                    <div className="text-sm text-black/70">{item.date}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-sm p-6 hover:shadow-lg transition-all">
              <h3 className="text-xs uppercase tracking-widest text-black mb-6 font-medium">Upcoming Results</h3>
              <div className="space-y-6">
                {[
                  { company: 'TCS Q2 Results', date: 'October 10, 2025' },
                  { company: 'Infosys Q2 Results', date: 'October 12, 2025' },
                  { company: 'HDFC Bank Q2 Results', date: 'October 15, 2025' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="font-medium mb-1 text-[#0A1F44]">{item.company}</div>
                    <div className="text-sm text-black/70">{item.date}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border-2 border-gray-200 rounded-sm p-6 hover:shadow-lg transition-all">
              <h3 className="text-xs uppercase tracking-widest text-black mb-6 font-medium">Big Events</h3>
              <div className="space-y-6">
                {[
                  { event: 'IPO: Hyundai Motor India', date: 'October 15-17, 2025' },
                  { event: 'Fed Interest Rate Decision', date: 'Wednesday, 11:30 PM IST' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="font-medium mb-1 text-[#0A1F44]">{item.event}</div>
                    <div className="text-sm text-black/70">{item.date}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#0A1F44] to-[#1E293B] text-white py-16 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center mb-12">
            <svg className="w-10 h-10 mr-3" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="15" r="2" fill="white"/>
              <circle cx="15" cy="20" r="2" fill="white"/>
              <circle cx="25" cy="20" r="2" fill="white"/>
              <line x1="20" y1="15" x2="15" y2="20" stroke="#10B981" strokeWidth="1"/>
              <line x1="20" y1="15" x2="25" y2="20" stroke="#10B981" strokeWidth="1"/>
            </svg>
            <div>
              <div className="text-3xl font-bold">ORION</div>
              <div className="text-xs text-emerald-300">by ELLINGTONHART CAPITAL</div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-sm font-medium mb-6 uppercase tracking-wider text-emerald-300">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">About ORION</a></li>
                <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">Our Team</a></li>
                <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-6 uppercase tracking-wider text-emerald-300">Products</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">ORION Core</a></li>
                <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">ORION Pro</a></li>
                <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">ORION Enterprise</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-6 uppercase tracking-wider text-emerald-300">Resources</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">Support Center</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-6 uppercase tracking-wider text-emerald-300">Legal</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-emerald-100 hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-emerald-800 text-center">
            <p className="text-sm text-emerald-100">
              © 2025 ELLINGTONHART CAPITAL. ORION™ is a registered trademark. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}