import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Gem, PartyPopper, Mic, Briefcase, Sparkles, ArrowRight } from 'lucide-react';

export default function Services() {
  const services = [
    {
      id: 'weddings',
      number: '01',
      title: 'Weddings',
      icon: Gem,
      desc: 'Celebrate your special day in a romantic and elegant atmosphere. Our venue is perfect for traditional and white weddings, receptions, and engagement ceremonies.',
      image: '/service-wedding.webp',
    },
    {
      id: 'birthdays',
      number: '02',
      title: 'Birthday Celebrations',
      icon: PartyPopper,
      desc: 'From intimate gatherings to grand parties, Ever After provides the perfect setting to make your birthday truly memorable.',
      image: '/service-birthday.jpg',
    },
    {
      id: 'seminars',
      number: '03',
      title: 'Seminars & Conferences',
      icon: Mic,
      desc: 'Host professional and well-organized seminars, conferences, and business meetings in a comfortable and conducive environment.',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop',
    },
    {
      id: 'corporate',
      number: '04',
      title: 'Corporate Events',
      icon: Briefcase,
      desc: 'Ideal for company events, workshops, product launches, and training sessions. We provide flexible setups to match your corporate identity.',
      image: '/service-corporate.jpg',
    },
    {
      id: 'other',
      number: '05',
      title: 'Other Events',
      icon: Sparkles,
      desc: 'We also cater to anniversaries, receptions, social gatherings, and more. Whatever you are celebrating, we bring your vision to life.',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069&auto=format&fit=crop',
    },
  ];

  return (
    <div className="page-shell pt-32 pb-24 bg-bg-warm min-h-screen overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[2.25rem] border border-sage/12 bg-[linear-gradient(135deg,rgba(106,117,87,0.12),rgba(229,177,100,0.18))] p-10 md:p-14 mb-20 section-frame"
        >
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block">Our Offerings</span>
              <h1 className="text-5xl md:text-7xl font-serif mb-6 leading-[1.02]">
                Exceptional <span className="italic text-sage">Services</span>
              </h1>
              <p className="max-w-2xl text-ink/70 font-light text-lg leading-relaxed">
                Ever After offers a versatile and stylish venue experience for celebrations, business gatherings, and milestone moments that deserve a polished setting.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {['Weddings and private celebrations', 'Corporate events and seminars', 'Professional support from inquiry to booking'].map((item) => (
                <div key={item} className="rounded-[1.5rem] border border-sage/12 bg-white/70 px-5 py-4 text-sm leading-relaxed text-ink/70">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="space-y-16 md:space-y-20">
          {services.map((service, index) => {
            const isEven = index % 2 === 0;
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.8 }}
                className={`editorial-panel rounded-[2rem] p-5 md:p-6 flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-6 relative`}
              >
                <div className="w-full md:w-3/5 relative z-0">
                  <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden rounded-[1.6rem]">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-1000"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>

                <div className={`w-full md:w-2/5 relative z-10 ${isEven ? 'md:-ml-12' : 'md:-mr-12'}`}>
                  <div className="rounded-[1.75rem] bg-bg-warm/96 p-8 md:p-10 shadow-[0_20px_50px_rgb(36,48,38,0.08)] border border-sage/10 relative overflow-hidden group">
                    <div className="absolute -top-6 -right-4 text-[120px] font-serif font-bold text-gold/12 z-0 select-none transition-transform duration-700 group-hover:scale-110">
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
                        className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] font-medium text-sage hover:text-gold transition-colors"
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

        <div className="mt-24 editorial-panel rounded-[2rem] text-center pt-16 pb-14 px-6 max-w-4xl mx-auto">
          <p className="text-3xl md:text-4xl font-serif italic text-ink/90 mb-10 leading-tight">
            No matter the occasion, Ever After is designed to bring your vision to life.
          </p>
          <Link
            to="/bookings"
            className="inline-flex items-center gap-2 rounded-full bg-sage text-bg-warm px-10 py-5 uppercase tracking-[0.24em] text-sm hover:bg-gold hover:text-ink transition-colors duration-300"
          >
            Start Planning
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
}
