import { Link, Outlet, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';
  const isTransparentDark = isHome && !isScrolled;
  const headerTextColor = isTransparentDark ? 'text-bg-warm' : 'text-ink';
  const headerHoverColor = isTransparentDark ? 'hover:text-gold-light' : 'hover:text-gold';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col selection:bg-gold/30 selection:text-ink">
      {/* Navigation */}
      <header 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-bg-warm/95 backdrop-blur-md py-4 shadow-sm' 
            : 'bg-transparent py-6'
        } ${headerTextColor}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <Link to="/" className="z-50 relative flex items-center gap-3 group">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform duration-500 group-hover:rotate-90 ${isTransparentDark ? 'text-gold-light' : 'text-gold'}`}>
              <path d="M12 2L14.5 8.5L21 11L14.5 13.5L12 20L9.5 13.5L3 11L9.5 8.5L12 2Z" />
            </svg>
            <h1 className="text-2xl md:text-3xl font-serif font-medium tracking-tight uppercase">
              Ever After
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className={`text-sm uppercase tracking-widest transition-colors ${headerHoverColor} ${
                  location.pathname === link.path 
                    ? (isTransparentDark ? 'text-gold-light font-medium' : 'text-gold font-medium') 
                    : (isTransparentDark ? 'text-bg-warm/80' : 'text-ink/70')
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link 
              to="/bookings"
              className={`px-6 py-3 border text-xs uppercase tracking-widest transition-colors duration-300 ${
                isTransparentDark 
                  ? 'border-bg-warm text-bg-warm hover:bg-bg-warm hover:text-ink' 
                  : 'border-ink text-ink hover:bg-ink hover:text-bg-warm'
              }`}
            >
              Book Event
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden z-50 relative p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} className="text-ink" /> : <Menu size={24} className={isTransparentDark ? 'text-bg-warm' : 'text-ink'} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-bg-warm flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-3xl font-serif hover:text-gold transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/bookings"
                className="mt-4 px-8 py-4 bg-ink text-bg-warm text-sm uppercase tracking-widest"
              >
                Book Your Event
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-ink text-bg-warm pt-20 pb-10 px-6 md:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-gold">
                <path d="M12 2L14.5 8.5L21 11L14.5 13.5L12 20L9.5 13.5L3 11L9.5 8.5L12 2Z" />
              </svg>
              <h2 className="text-3xl font-serif uppercase tracking-tight">Ever After</h2>
            </div>
            <p className="text-bg-warm/70 max-w-md font-light leading-relaxed">
              A refined and elegant venue designed to host unforgettable weddings, vibrant celebrations, and professional gatherings in the heart of Ikeja.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm uppercase tracking-widest text-gold mb-6">Contact</h3>
            <ul className="space-y-4 text-bg-warm/70 font-light text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-1 shrink-0" />
                <span>6 Bolaji Street,<br/>Off Kudirat Abiola Way / Oregun Road,<br/>Ikeja, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="shrink-0" />
                <span>+234 (0) 800 000 0000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="shrink-0" />
                <span>hello@everaftercentre.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-widest text-gold mb-6">Follow Us</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-bg-warm/20 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-bg-warm/20 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-bg-warm/20 flex items-center justify-center hover:bg-gold hover:border-gold transition-colors">
                <Twitter size={18} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-bg-warm/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-bg-warm/50 uppercase tracking-wider">
          <p>&copy; {new Date().getFullYear()} Ever After Centre. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
