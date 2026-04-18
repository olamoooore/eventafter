import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="page-shell pt-32 pb-24 px-6 bg-bg-warm min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="rounded-[2.2rem] border border-sage/12 bg-[linear-gradient(135deg,rgba(106,117,87,0.12),rgba(229,177,100,0.18))] p-10 md:p-14 mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block text-center"
          >
            Contact Us
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif mb-6 text-center"
          >
            Get In <span className="italic text-sage">Touch</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-ink/70 font-light text-lg leading-relaxed text-center max-w-3xl mx-auto"
          >
            We would love to hear from you. Whether you are making an inquiry or ready to book, our team is here to assist you.
          </motion.p>

          <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
            {[
              'Call us directly on 0805 956 5056',
              'Visit us in Ikeja, Lagos',
              'Monday to Saturday, 9:00 AM to 6:00 PM',
            ].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-sage/12 bg-white/70 px-5 py-4 text-sm leading-relaxed text-ink/70">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="editorial-panel rounded-[2rem] p-10 md:p-16"
          >
            <h2 className="text-2xl font-serif mb-10">Contact Information</h2>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-medium mb-2">Address</h3>
                  <p className="text-ink/70 font-light leading-relaxed">
                    6 Bolaji Street,<br />
                    Off Kudirat Abiola Way / Oregun Road,<br />
                    Ikeja, Lagos, Nigeria
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-medium mb-2">Phone</h3>
                  <p className="text-ink/70 font-light leading-relaxed">
                    0805 956 5056
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-medium mb-2">Email</h3>
                  <p className="text-ink/70 font-light leading-relaxed">
                    hello@everaftercentre.com<br />
                    bookings@everaftercentre.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h3 className="text-sm uppercase tracking-widest font-medium mb-2">Business Hours</h3>
                  <p className="text-ink/70 font-light leading-relaxed">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br />
                    Sunday: By Appointment Only
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="h-full min-h-[460px] rounded-[2rem] border border-sage/12 bg-ink/5 relative overflow-hidden shadow-[0_20px_50px_rgba(36,48,38,0.08)]"
          >
            <iframe
              title="Ever After Centre location map"
              src="https://www.google.com/maps?q=6%20Bolaji%20Street%2C%20Off%20Kudirat%20Abiola%20Way%20Oregun%20Road%2C%20Ikeja%2C%20Lagos%2C%20Nigeria&z=16&output=embed"
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
            <div className="absolute inset-x-0 bottom-0 flex justify-center p-6 pointer-events-none">
              <div className="bg-bg-warm/92 backdrop-blur-sm p-6 text-center shadow-lg rounded-[1.5rem]">
                <MapPin size={32} className="mx-auto text-gold mb-2" />
                <p className="font-serif text-xl">Ikeja, Lagos</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 editorial-panel rounded-[2rem] px-8 py-12 text-center max-w-4xl mx-auto">
          <p className="text-2xl font-serif italic text-ink/80 mb-6">
            Reach out today and let's start planning your perfect event.
          </p>
          <p className="text-sm uppercase tracking-[0.24em] text-sage">Phone: 0805 956 5056</p>
        </div>
      </div>
    </div>
  );
}
