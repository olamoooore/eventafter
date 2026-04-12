import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      id: "weddings",
      title: "Weddings",
      icon: "💍",
      desc: "Celebrate your special day in a romantic and elegant atmosphere. Our venue is perfect for traditional and white weddings, receptions, and engagement ceremonies.",
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "birthdays",
      title: "Birthday Celebrations",
      icon: "🎉",
      desc: "From intimate gatherings to grand parties, Ever After Centre provides the perfect setting to make your birthday truly memorable.",
      image: "https://images.unsplash.com/photo-1530103862676-de8892b12a15?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "seminars",
      title: "Seminars & Conferences",
      icon: "🎤",
      desc: "Host professional and well-organized seminars, conferences, and business meetings in a comfortable and conducive environment.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop"
    },
    {
      id: "corporate",
      title: "Corporate Events",
      icon: "🏢",
      desc: "Ideal for company events, workshops, product launches, and training sessions.",
      image: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=2070&auto=format&fit=crop"
    },
    {
      id: "other",
      title: "Other Events",
      icon: "🎊",
      desc: "We also cater to anniversaries, receptions, social gatherings, and more.",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop"
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-bg-warm min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif mb-6"
          >
            Our <span className="italic text-gold">Services</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-ink/70 font-light text-lg leading-relaxed"
          >
            Ever After Centre offers a versatile and stylish space suitable for a wide range of events. We are committed to providing an exceptional experience for every occasion.
          </motion.p>
        </div>

        <div className="space-y-24">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'} gap-12 items-center`}
            >
              <div className="w-full md:w-1/2">
                <div className="aspect-[4/3] overflow-hidden rounded-sm">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              
              <div className="w-full md:w-1/2 md:px-12">
                <span className="text-4xl mb-4 block">{service.icon}</span>
                <h2 className="text-3xl md:text-4xl font-serif mb-6">{service.title}</h2>
                <p className="text-ink/70 font-light leading-relaxed mb-8 text-lg">
                  {service.desc}
                </p>
                <Link 
                  to={`/bookings?type=${service.title}`}
                  className="inline-block border-b border-ink pb-1 uppercase tracking-widest text-xs hover:text-gold hover:border-gold transition-colors"
                >
                  Inquire Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center border-t border-ink/10 pt-16">
          <p className="text-2xl md:text-3xl font-serif italic text-ink/80 mb-8">
            No matter the occasion, Ever After Centre is designed to bring your vision to life.
          </p>
          <Link 
            to="/bookings"
            className="inline-block bg-ink text-bg-warm px-8 py-4 uppercase tracking-widest text-sm hover:bg-gold transition-colors duration-300"
          >
            Start Planning
          </Link>
        </div>
      </div>
    </div>
  );
}
