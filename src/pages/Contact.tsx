import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 px-6 bg-bg-warm min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block"
          >
            Contact Us
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif mb-6"
          >
            Get In <span className="italic text-gold">Touch</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-ink/70 font-light text-lg leading-relaxed"
          >
            We would love to hear from you. Whether you are making an inquiry or ready to book, our team is here to assist you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-10 md:p-16 shadow-sm border border-ink/5"
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
                    6 Bolaji Street,<br/>
                    Off Kudirat Abiola Way / Oregun Road,<br/>
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
                    +234 (0) 800 000 0000<br/>
                    +234 (0) 800 000 0001
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
                    hello@everaftercentre.com<br/>
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
                    Monday – Saturday: 9:00 AM – 6:00 PM<br/>
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
            className="h-full min-h-[400px] bg-ink/5 relative overflow-hidden"
          >
            {/* Placeholder for a map or an image of the location */}
            <img 
              src="https://images.unsplash.com/photo-1522083111333-8114a2e0bc98?q=80&w=2070&auto=format&fit=crop" 
              alt="Ever After Centre Location" 
              className="w-full h-full object-cover grayscale opacity-80 mix-blend-multiply"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-bg-warm/90 backdrop-blur-sm p-6 text-center shadow-lg">
                <MapPin size={32} className="mx-auto text-gold mb-2" />
                <p className="font-serif text-xl">Ikeja, Lagos</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-2xl font-serif italic text-ink/80">
            Reach out today and let's start planning your perfect event.
          </p>
        </div>
      </div>
    </div>
  );
}
