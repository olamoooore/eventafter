import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="page-shell pt-32 pb-24 px-6 bg-bg-warm min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="editorial-panel rounded-[2rem] p-8 md:p-12"
          >
            <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block">Our Story</span>
            <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
              About <br /><span className="italic text-sage">Ever After Centre</span>
            </h1>

            <div className="space-y-6 text-ink/70 font-light text-lg leading-relaxed">
              <p>
                Ever After Centre is a premier event venue located in the heart of Ikeja, designed to host a wide range of memorable occasions. We pride ourselves on offering a classic and elegant environment where every event is treated with attention to detail and excellence.
              </p>
              <p>
                Our goal is to provide a space where celebrations come alive and professional events are executed seamlessly. With a commitment to quality service and client satisfaction, Ever After Centre has become a trusted choice for weddings, birthdays, seminars, and corporate gatherings.
              </p>
              <p>
                We understand that every event is unique, which is why we offer flexible arrangements to suit your specific needs.
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {['Thoughtful hospitality', 'Versatile event setting', 'Trusted venue in Ikeja'].map((item) => (
                <div key={item} className="rounded-[1.25rem] border border-sage/10 bg-white/70 px-4 py-4 text-sm text-ink/70">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative section-frame"
          >
            <div className="aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-[2rem] border border-sage/10 shadow-[0_24px_60px_rgba(36,48,38,0.1)]">
              <img
                src="/hero-slide-1.webp"
                alt="Ever After Centre exterior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full bg-bg-warm/88 px-5 py-3 text-xs uppercase tracking-[0.24em] text-sage shadow-lg">
              Excellence in Every Detail
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {[
            {
              title: 'Purposeful design',
              text: 'Elegant architecture and welcoming interiors create a timeless backdrop for every event style.',
            },
            {
              title: 'Flexible occasions',
              text: 'Our venue supports weddings, birthdays, seminars, corporate events, and social gatherings with ease.',
            },
            {
              title: 'Client-focused planning',
              text: 'We work closely with clients to shape experiences that feel personal, organized, and memorable.',
            },
          ].map((item) => (
            <div key={item.title} className="editorial-panel rounded-[1.75rem] p-8">
              <p className="text-[11px] uppercase tracking-[0.24em] text-gold mb-3">Ever After Value</p>
              <h3 className="text-2xl font-serif mb-3">{item.title}</h3>
              <p className="text-sm leading-relaxed text-ink/68">{item.text}</p>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[linear-gradient(135deg,#243026_0%,#6a7557_100%)] text-bg-warm p-12 md:p-20 text-center rounded-[2rem] relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <img
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop"
              alt="Background texture"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-serif italic mb-8">
              "At Ever After Centre, your event is not just hosted — it is celebrated."
            </h2>
            <Link
              to="/contact"
              className="inline-block rounded-full border border-gold text-gold px-8 py-3 uppercase tracking-[0.24em] text-xs hover:bg-gold hover:text-ink transition-colors duration-300"
            >
              Get In Touch
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
