import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Star, Calendar, Users, MapPin, Quote } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop" 
            alt="Elegant wedding venue setup" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-ink/40"></div>
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-gold text-sm uppercase tracking-[0.3em] mb-6 block">Welcome to Ever After</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-bg-warm mb-6 leading-[1.1]">
              Where Every Celebration Becomes <span className="italic text-gold-light">Ever After</span>
            </h1>
            <p className="text-bg-warm/90 text-lg md:text-xl font-light max-w-2xl mx-auto mb-10">
              A refined and elegant venue designed to host unforgettable weddings, vibrant celebrations, and professional gatherings.
            </p>
            <Link 
              to="/bookings"
              className="inline-flex items-center gap-2 bg-gold text-ink px-8 py-4 uppercase tracking-widest text-sm hover:bg-bg-warm transition-colors duration-300"
            >
              Book Your Event Today
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="py-24 md:py-32 px-6 bg-bg-warm">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="aspect-[4/5] w-full max-w-md mx-auto arch-mask overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" 
                alt="Event hall interior" 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-gold/10 rounded-full -z-10 blur-2xl"></div>
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight">
              A Beautiful Beginning & <br/>
              <span className="italic text-gold">A Lasting Memory</span>
            </h2>
            <p className="text-ink/70 leading-relaxed mb-8 text-lg font-light">
              At Ever After, we believe every event deserves a beautiful beginning and a lasting memory. Whether you are planning a dream wedding, a lively birthday celebration, or a corporate seminar, our venue provides the perfect setting tailored to your needs.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              {[
                { icon: Star, text: "Elegant & spacious hall" },
                { icon: Calendar, text: "Suitable for all events" },
                { icon: MapPin, text: "Prime location in Ikeja" },
                { icon: Users, text: "Professional support team" }
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center text-gold shrink-0">
                    <feature.icon size={18} />
                  </div>
                  <span className="text-sm uppercase tracking-wider">{feature.text}</span>
                </div>
              ))}
            </div>
            
            <p className="text-xl font-serif italic text-ink/80 border-l-2 border-gold pl-6 py-2">
              Create moments that last forever at Ever After.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services Preview */}
      <section className="py-24 bg-ink text-bg-warm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold text-xs uppercase tracking-[0.2em] mb-4 block">Our Offerings</span>
            <h2 className="text-4xl md:text-5xl font-serif">Versatile & Stylish Spaces</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Weddings",
                image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop",
                desc: "Celebrate your special day in a romantic and elegant atmosphere."
              },
              {
                title: "Corporate Events",
                image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop",
                desc: "Host professional seminars, conferences, and business meetings."
              },
              {
                title: "Celebrations",
                image: "https://images.unsplash.com/photo-1530103862676-de8892b12a15?q=80&w=2070&auto=format&fit=crop",
                desc: "From intimate gatherings to grand birthday parties."
              }
            ].map((service, idx) => (
              <Link to="/services" key={idx} className="group block">
                <div className="aspect-[3/4] overflow-hidden mb-6 relative">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-ink/20 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>
                <h3 className="text-2xl font-serif mb-3 group-hover:text-gold transition-colors">{service.title}</h3>
                <p className="text-bg-warm/60 font-light text-sm">{service.desc}</p>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <Link 
              to="/services"
              className="inline-block border-b border-gold text-gold pb-1 uppercase tracking-widest text-sm hover:text-bg-warm hover:border-bg-warm transition-colors"
            >
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery / Moments Section */}
      <section className="py-24 bg-bg-warm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
              <span className="text-gold text-xs uppercase tracking-[0.2em] mb-4 block">Gallery</span>
              <h2 className="text-4xl md:text-5xl font-serif">Moments Captured</h2>
            </div>
            <Link 
              to="/about"
              className="inline-block border-b border-ink pb-1 uppercase tracking-widest text-xs hover:text-gold hover:border-gold transition-colors"
            >
              Discover Our Story
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="aspect-[3/4] lg:translate-y-8 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop" alt="Wedding table setup" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-[3/4] overflow-hidden">
              <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop" alt="Event details" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-[3/4] lg:translate-y-12 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1522413452208-99690151f234?q=80&w=2070&auto=format&fit=crop" alt="Corporate event" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-[3/4] lg:-translate-y-4 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1478146896981-b80fe463b330?q=80&w=2070&auto=format&fit=crop" alt="Party lights" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-ink/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-gold text-xs uppercase tracking-[0.2em] mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-serif">Words from Our Clients</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah & John",
                role: "Wedding Reception",
                text: "Ever After made our dream wedding a reality. The venue was breathtaking, and the staff was incredibly attentive to every single detail. We couldn't have asked for a better experience."
              },
              {
                name: "TechCorp Nigeria",
                role: "Corporate Retreat",
                text: "A highly professional environment. The flexible setup allowed us to transition seamlessly from our daytime seminar to the evening gala. Highly recommended for corporate events."
              },
              {
                name: "Aisha Bello",
                role: "50th Birthday Celebration",
                text: "I couldn't have asked for a better place to celebrate my milestone. The ambiance is unmatched in Ikeja, and my guests are still talking about how beautiful the hall looked."
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-bg-warm p-10 border border-ink/5 relative hover:shadow-md transition-shadow duration-300">
                <Quote size={40} className="text-gold/20 absolute top-6 right-6" />
                <div className="flex gap-1 text-gold mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="currentColor" />)}
                </div>
                <p className="text-ink/80 font-light leading-relaxed mb-8 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <h4 className="font-serif text-lg">{testimonial.name}</h4>
                  <span className="text-xs uppercase tracking-widest text-ink/50">{testimonial.role}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-ink text-bg-warm relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=2098&auto=format&fit=crop" 
            alt="Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-7xl font-serif mb-8 leading-tight">
            Ready to Plan Your <br/><span className="italic text-gold">Unforgettable Event?</span>
          </h2>
          <p className="text-bg-warm/70 text-lg font-light mb-10 max-w-2xl mx-auto">
            Contact our dedicated team today to schedule a tour of the venue and discuss how we can bring your vision to life.
          </p>
          <Link 
            to="/bookings"
            className="inline-flex items-center gap-2 bg-gold text-ink px-10 py-5 uppercase tracking-widest text-sm hover:bg-bg-warm transition-colors duration-300"
          >
            Secure Your Date
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
