import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, Calendar, Users, MapPin, Quote } from 'lucide-react';

const heroSlides = [
  '/hero-slide-1.webp',
  '/hero-slide-2.jpg',
  '/hero-slide-3.jpg',
];

const venueHighlights = [
  { icon: Star, title: 'Elegant atmosphere', text: 'A refined setting designed for memorable arrivals, speeches, and celebrations.' },
  { icon: Calendar, title: 'Flexible occasions', text: 'From weddings and birthdays to seminars and corporate functions.' },
  { icon: MapPin, title: 'Prime Ikeja address', text: 'A central Lagos location that is convenient for guests and planners.' },
  { icon: Users, title: 'Dedicated support', text: 'A responsive team ready to guide your event planning from inquiry to day-of.' },
];

const servicesPreview = [
  {
    title: 'Weddings',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop',
    desc: 'Celebrate your special day in a romantic and elegant atmosphere.',
  },
  {
    title: 'Corporate Events',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop',
    desc: 'Host professional seminars, conferences, and business meetings.',
  },
  {
    title: 'Celebrations',
    image: '/celebration.webp',
    desc: 'From intimate gatherings to grand birthday parties.',
  },
];

const testimonials = [
  {
    name: 'Sarah & John',
    role: 'Wedding Reception',
    text: "Ever After made our dream wedding a reality. The venue was breathtaking, and the staff was incredibly attentive to every single detail. We couldn't have asked for a better experience.",
  },
  {
    name: 'TechCorp Nigeria',
    role: 'Corporate Retreat',
    text: 'A highly professional environment. The flexible setup allowed us to transition seamlessly from our daytime seminar to the evening gala. Highly recommended for corporate events.',
  },
  {
    name: 'Aisha Bello',
    role: '50th Birthday Celebration',
    text: 'I could not have asked for a better place to celebrate my milestone. The ambiance is unmatched in Ikeja, and my guests are still talking about how beautiful the hall looked.',
  },
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full overflow-hidden bg-bg-warm">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 bg-ink">
          {heroSlides.map((slide, index) => (
            <img
              key={index}
              src={slide}
              alt={`Event venue preview ${index + 1}`}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
              referrerPolicy="no-referrer"
            />
          ))}
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(36,48,38,0.22),rgba(36,48,38,0.62)_56%,rgba(36,48,38,0.82))]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(229,177,100,0.28),transparent_28%)]" />
        </div>

        <div className="absolute bottom-24 left-0 right-0 z-20 flex justify-center gap-3 md:bottom-28">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                index === currentSlide ? 'w-8 bg-gold' : 'w-2 bg-bg-warm/50 hover:bg-bg-warm'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="relative z-10 mx-auto mt-20 max-w-5xl px-6 pb-28 text-center pointer-events-none md:pb-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pointer-events-auto"
          >
            <span className="text-gold text-sm uppercase tracking-[0.3em] mb-6 block">Welcome to Ever After</span>
            <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif text-bg-warm mb-6 leading-[1.03]">
              Where Every Celebration Becomes <span className="italic text-gold-light">Ever After</span>
            </h1>
            <p className="text-bg-warm/88 text-lg md:text-xl font-light max-w-3xl mx-auto mb-10 leading-relaxed">
              A refined and elegant venue designed to host unforgettable weddings, vibrant celebrations, and professional gatherings.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/bookings"
                className="inline-flex items-center gap-2 rounded-full bg-gold text-ink px-8 py-4 uppercase tracking-[0.24em] text-sm hover:bg-bg-warm transition-colors duration-300"
              >
                Book Your Event Today
                <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 rounded-full border border-bg-warm/40 px-8 py-4 text-bg-warm uppercase tracking-[0.24em] text-sm hover:bg-bg-warm hover:text-ink transition-colors duration-300"
              >
                Explore Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 -mt-16 px-6">
        <div className="max-w-6xl mx-auto editorial-panel rounded-[2rem] p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-[0.92fr_1.08fr] gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="aspect-[4/5] w-full max-w-md mx-auto overflow-hidden rounded-[2rem] arch-mask">
                <img
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
                  alt="Event hall interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-2 rounded-[1.5rem] bg-sage px-5 py-4 text-bg-warm shadow-[0_16px_40px_rgba(36,48,38,0.16)]">
                <p className="text-[11px] uppercase tracking-[0.24em] text-gold-light">Ever After Centre</p>
                <p className="mt-1 text-lg font-serif">Elevated events in Ikeja</p>
              </div>
            </div>

            <div className="order-1 lg:order-2">
              <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block">The Venue Experience</span>
              <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
                A Beautiful Beginning & <br />
                <span className="italic text-sage">A Lasting Memory</span>
              </h2>
              <p className="text-ink/70 leading-relaxed mb-8 text-lg font-light">
                At Ever After, every celebration is shaped with elegance, flow, and thoughtful hospitality. Whether you are planning a dream wedding, a lively birthday celebration, or a corporate seminar, our venue gives you a polished setting that feels memorable from the first arrival to the final toast.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                {venueHighlights.map((feature) => (
                  <div key={feature.title} className="rounded-[1.5rem] border border-sage/12 bg-white/72 p-5">
                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gold/12 text-gold">
                      <feature.icon size={18} />
                    </div>
                    <h3 className="text-lg font-serif mb-2">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-ink/65">{feature.text}</p>
                  </div>
                ))}
              </div>

              <p className="text-xl font-serif italic text-ink/80 border-l-2 border-gold pl-6 py-2">
                Create moments that feel graceful, effortless, and worth remembering.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between mb-14">
            <div>
              <span className="text-gold text-xs uppercase tracking-[0.2em] mb-4 block">Our Offerings</span>
              <h2 className="text-4xl md:text-5xl font-serif">Versatile, Refined, and Ready for Every Occasion</h2>
            </div>
            <p className="max-w-xl text-ink/65 leading-relaxed">
              From intimate celebrations to large-format corporate gatherings, our spaces are styled to feel polished, warm, and adaptable.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {servicesPreview.map((service) => (
              <Link to="/services" key={service.title} className="group block rounded-[1.75rem] border border-sage/12 bg-white/72 p-4 shadow-[0_18px_40px_rgba(36,48,38,0.06)] transition-transform duration-500 hover:-translate-y-1">
                <div className="aspect-[3/4] overflow-hidden rounded-[1.35rem] mb-6 relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(36,48,38,0.18))]" />
                </div>
                <h3 className="text-2xl font-serif mb-3 group-hover:text-gold transition-colors">{service.title}</h3>
                <p className="text-ink/62 font-light text-sm leading-relaxed">{service.desc}</p>
              </Link>
            ))}
          </div>

          <div className="text-center mt-14">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-full border border-sage/18 px-6 py-3 uppercase tracking-[0.24em] text-xs text-ink hover:border-gold hover:text-gold transition-colors"
            >
              View All Services
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <section className="px-6 pb-28">
        <div className="max-w-7xl mx-auto editorial-panel rounded-[2rem] p-8 md:p-12 section-frame">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-gold text-xs uppercase tracking-[0.2em] mb-4 block">Gallery</span>
              <h2 className="text-4xl md:text-5xl font-serif">Moments Captured</h2>
            </div>
            <Link
              to="/about"
              className="inline-block border-b border-sage pb-1 uppercase tracking-[0.24em] text-xs text-sage hover:text-gold hover:border-gold transition-colors"
            >
              Discover Our Story
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="aspect-[3/4] lg:translate-y-8 overflow-hidden rounded-[1.5rem]">
              <img src="/moments-1.jpg" alt="Wedding celebration moment" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-[3/4] overflow-hidden rounded-[1.5rem]">
              <img src="/moments-2.jpg" alt="Dance floor celebration" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-[3/4] lg:translate-y-12 overflow-hidden rounded-[1.5rem]">
              <img src="/moments-3.jpg" alt="Traditional wedding entrance" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
            <div className="aspect-[3/4] lg:-translate-y-4 overflow-hidden rounded-[1.5rem]">
              <img src="/moments-4.jpg" alt="Live performance at an event" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-gold text-xs uppercase tracking-[0.2em] mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-serif">Words from Our Clients</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="editorial-panel rounded-[1.75rem] p-8 relative hover:-translate-y-1 transition-transform duration-300">
                <Quote size={38} className="text-gold/20 absolute top-6 right-6" />
                <div className="flex gap-1 text-gold mb-6">
                  {[...Array(5)].map((_, index) => <Star key={index} size={14} fill="currentColor" />)}
                </div>
                <p className="text-ink/80 font-light leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <h4 className="font-serif text-lg">{testimonial.name}</h4>
                  <span className="text-xs uppercase tracking-[0.24em] text-ink/50">{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-[linear-gradient(135deg,#243026_0%,#6a7557_100%)] px-8 py-16 md:px-14 md:py-20 text-bg-warm max-w-7xl mx-auto">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop"
              alt="Background"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,177,100,0.32),transparent_24%)]" />
          <div className="relative z-10 max-w-4xl text-center mx-auto">
            <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
              Ready to Plan Your <br /><span className="italic text-gold-light">Unforgettable Event?</span>
            </h2>
            <p className="text-bg-warm/76 text-lg font-light mb-10 max-w-2xl mx-auto leading-relaxed">
              Contact our dedicated team today to schedule a tour of the venue and discuss how we can bring your vision to life.
            </p>
            <Link
              to="/bookings"
              className="inline-flex items-center gap-2 rounded-full bg-gold text-ink px-10 py-5 uppercase tracking-[0.24em] text-sm hover:bg-bg-warm transition-colors duration-300"
            >
              Secure Your Date
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
