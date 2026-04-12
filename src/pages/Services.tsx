import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Gem, PartyPopper, Mic, Briefcase, Sparkles, ArrowRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: "weddings",
      number: "01",
      title: "Weddings",
      icon: Gem,
      desc: "Celebrate your special day in a romantic and elegant atmosphere. Our venue is perfect for traditional and white weddings, receptions, and engagement ceremonies.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "birthdays",
      number: "02",
      title: "Birthday Celebrations",
      icon: PartyPopper,
      desc: "From intimate gatherings to grand parties, Ever After provides the perfect setting to make your birthday truly memorable.",
      image: "https://images.unsplash.com/photo-1530103862676-de8892b12a15?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "seminars",
      number: "03",
      title: "Seminars & Conferences",
      icon: Mic,
      desc: "Host professional and well-organized seminars, conferences, and business meetings in a comfortable and conducive environment.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop"
    },
    {
      id: "corporate",
      number: "04",
      title: "Corporate Events",
      icon: Briefcase,
      desc: "Ideal for company events, workshops, product launches, and training sessions. We provide flexible setups to match your corporate identity.",
      image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "other",
      number: "05",
      title: "Other Events",
      icon: Sparkles,
      desc: "We also cater to anniversaries, receptions, social gatherings, and more. Whatever you are celebrating, we bring your vision to life.",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop"
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-bg-warm min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-32">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block"
          >
            Our Offerings
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif mb-6"
          >
            Exceptional <span className="italic text-gold">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-ink/70 font-light text-lg leading-relaxed"
          >
            Ever After offers a versatile and stylish space suitable for a wide range of events. We are committed to providing an unforgettable experience for every occasion.
          </motion.p>
        </div>

        <div className="space-y-32 md:space-y-40">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            const Icon = service.icon;
            
            return (
              <motion.div 
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center relative`}
              >
                {/* Image Section */}
                <div className="w-full md:w-3/5 relative z-0">
                  <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                
                {/* Text Card Section (Overlapping) */}
                <div className={`w-full md:w-2/5 relative z-10 mt-[-40px] md:mt-0 ${isEven ? 'md:-ml-20' : 'md:-mr-20'}`}>
                  <div className="bg-white p-8 md:p-12 shadow-[0_20px_50px_rgb(0,0,0,0.05)] border border-ink/5 relative overflow-hidden group">
                    
                    {/* Large Background Number */}
                    <div className="absolute -top-6 -right-4 text-[120px] font-serif font-bold text-bg-warm/50 z-0 select-none transition-transform duration-700 group-hover:scale-110">
                      {service.number}
                    </div>

                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-full border border-gold/30 flex items-center justify-center text-gold mb-8 bg-white">
                        <Icon size={20} strokeWidth={1.5} />
                      </div>
                      
                      <h2 className="text-3xl md:text-4xl font-serif mb-4 text-ink">{service.title}</h2>
                      
                      <div className="w-12 h-[1px] bg-gold mb-6"></div>
                      
                      <p className="text-ink/70 font-light leading-relaxed mb-8 text-base">
                        {service.desc}
                      </p>
                      
                      <Link 
                        to={`/bookings?type=${service.title}`}
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-medium text-ink hover:text-gold transition-colors"
                      >
                        Inquire Now
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-40 text-center border-t border-ink/10 pt-24 max-w-4xl mx-auto">
          <p className="text-3xl md:text-4xl font-serif italic text-ink/90 mb-10 leading-tight">
            No matter the occasion, Ever After is designed to bring your vision to life.
          </p>
          <Link 
            to="/bookings"
            className="inline-flex items-center gap-2 bg-ink text-bg-warm px-10 py-5 uppercase tracking-widest text-sm hover:bg-gold transition-colors duration-300"
          >
            Start Planning
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
