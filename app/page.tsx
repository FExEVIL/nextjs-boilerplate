export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-light">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-normal tracking-tight">
              EllingtonhartCapital
            </div>
            <div className="hidden md:flex space-x-12">
              <a href="#companies" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-normal">Companies</a>
              <a href="#team" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-normal">Team</a>
              <a href="#insights" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-normal">Insights</a>
              <a href="#contact" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-normal">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-32 px-8">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-7xl md:text-9xl font-extralight leading-none mb-16 tracking-tighter">
            We partner<br />
            with bold<br />
            <span className="italic">founders</span>
          </h1>
          <div className="max-w-2xl">
            <p className="text-2xl md:text-3xl text-gray-600 font-light leading-relaxed mb-12">
              Building enduring companies that shape the future of finance, technology, and human progress.
            </p>
            <a 
              href="#contact" 
              className="inline-block text-sm font-normal tracking-wide uppercase border-b border-gray-900 pb-1 hover:border-gray-600 transition-colors"
            >
              For Founders
            </a>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
            <div>
              <h2 className="text-5xl md:text-6xl font-extralight leading-tight mb-12 tracking-tight">
                Our philosophy
              </h2>
            </div>
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-normal mb-4 tracking-wide">Partnership first</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  We believe in rolling up our sleeves alongside exceptional founders. 
                  Our success is measured by the lasting impact our companies create.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-normal mb-4 tracking-wide">Patient capital</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Great companies take time to build. We provide the runway and support 
                  needed to think in decades, not quarters.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-normal mb-4 tracking-wide">Conviction-driven</h3>
                <p className="text-gray-600 text-lg leading-relaxed">
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
      <section className="py-32 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-16">
            <div>
              <div className="text-5xl md:text-6xl font-extralight mb-4 tracking-tight">$2.5B</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Assets Under Management</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-extralight mb-4 tracking-tight">47</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Portfolio Companies</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-extralight mb-4 tracking-tight">12</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Successful Exits</div>
            </div>
            <div>
              <div className="text-5xl md:text-6xl font-extralight mb-4 tracking-tight">15+</div>
              <div className="text-gray-600 text-sm uppercase tracking-wider">Years of Experience</div>
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {[
              { name: 'FinanceFlow', description: 'Next-generation payment infrastructure', stage: 'Series B' },
              { name: 'DataVault', description: 'Enterprise data security platform', stage: 'Series A' },
              { name: 'HealthLink', description: 'AI-powered healthcare analytics', stage: 'Series C' },
              { name: 'CloudCore', description: 'Distributed computing infrastructure', stage: 'Seed' },
              { name: 'TradeTech', description: 'Institutional trading platform', stage: 'Series A' },
              { name: 'InsureTech', description: 'Digital insurance marketplace', stage: 'Series B' }
            ].map((company, index) => (
              <div key={index} className="group">
                <div className="border border-gray-200 hover:border-gray-400 transition-colors p-8 h-full">
                  <h3 className="text-2xl font-light mb-4">{company.name}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{company.description}</p>
                  <div className="text-xs uppercase tracking-wider text-gray-400">{company.stage}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section id="team" className="py-32 px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-extralight leading-tight mb-20 tracking-tight">
            Our team
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            <div className="group">
              <div className="aspect-square bg-gray-200 mb-6 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Photo
                </div>
              </div>
              <h3 className="text-2xl font-light mb-2">Sarah Chen</h3>
              <p className="text-gray-600 text-sm mb-4 uppercase tracking-wider">Managing Partner</p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Former Goldman Sachs VP and McKinsey Principal. 
                Led investments in 15+ unicorn companies over the past decade.
              </p>
            </div>

            <div className="group">
              <div className="aspect-square bg-gray-200 mb-6 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Photo
                </div>
              </div>
              <h3 className="text-2xl font-light mb-2">Marcus Rodriguez</h3>
              <p className="text-gray-600 text-sm mb-4 uppercase tracking-wider">Partner</p>
              <p className="text-gray-600 leading-relaxed text-sm">
                Serial entrepreneur with two successful exits. 
                Expertise in fintech and enterprise software scaling.
              </p>
            </div>

            <div className="group">
              <div className="aspect-square bg-gray-200 mb-6 overflow-hidden">
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  Photo
                </div>
              </div>
              <h3 className="text-2xl font-light mb-2">Dr. Emily Watson</h3>
              <p className="text-gray-600 text-sm mb-4 uppercase tracking-wider">Partner</p>
              <p className="text-gray-600 leading-relaxed text-sm">
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
          <p className="text-2xl md:text-3xl text-gray-600 font-light leading-relaxed mb-16 max-w-3xl mx-auto">
            Building something that could change an industry? 
            We'd love to hear from you.
          </p>
          <div className="space-y-6">
            <a 
              href="mailto:hello@ellingtonhart.com" 
              className="inline-block text-lg font-normal tracking-wide border-b-2 border-gray-900 pb-2 hover:border-gray-600 transition-colors"
            >
              hello@ellingtonhart.com
            </a>
            <div className="text-gray-600">
              <p className="mb-2">New York Office</p>
              <p className="text-sm">+1 (212) 555-0123</p>
            </div>
          </div>
        </div>
      </section>

{/* Sequoia-Style Green Footer */}
<footer className="bg-emerald-600 text-white py-16 px-8">
  <div className="max-w-6xl mx-auto">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
      {/* About Column */}
      <div>
        <h4 className="text-sm font-normal mb-6 uppercase tracking-wider">About</h4>
        <div className="space-y-4">
          <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Our Ethos</a>
          <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Our History</a>
          <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Jobs</a>
          <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Legal</a>
        </div>
      </div>

      {/* Business Entities Column */}
      <div>
        <h4 className="text-sm font-normal mb-6 uppercase tracking-wider">Business Entities</h4>
        <div className="space-y-4">
          <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Ellington Hart Capital</a>
          <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Ellington Hart Ventures</a>
          <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Ellington Hart Global Equities</a>
        </div>
      </div>

      {/* Login Column */}
      <div>
        <h4 className="text-sm font-normal mb-6 uppercase tracking-wider">Login</h4>
        <div className="space-y-4">
          <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">LP Login</a>
          <a href="#" className="block text-white hover:text-emerald-200 text-sm transition-colors">Ellington Hart Ampersand Login</a>
        </div>
      </div>

      {/* Motion Column */}
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
          © 2025 Ellington Hart Capital
        </div>
      </div>
    </div>
  </div>
</footer>

    </main>
  );
}

