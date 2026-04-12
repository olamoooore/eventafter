import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { User, Phone, Mail, Calendar, Users, MessageSquare, Sparkles } from 'lucide-react';

type BookingFormData = {
  fullName: string;
  phone: string;
  email: string;
  eventType: string;
  eventDate: string;
  guests: string;
  details: string;
};

export default function Bookings() {
  const [searchParams] = useSearchParams();
  const defaultEventType = searchParams.get('type') || '';
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<BookingFormData>({
    defaultValues: {
      eventType: defaultEventType
    }
  });

  const onSubmit = (data: BookingFormData) => {
    console.log(data);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  return (
    <div className="pt-32 pb-24 px-6 bg-bg-warm min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column - Editorial & Info */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 lg:sticky lg:top-32 h-fit"
          >
            <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block">Reservations</span>
            <h1 className="text-5xl md:text-6xl font-serif mb-6 leading-tight">
              Book Your <br/><span className="italic text-gold">Event</span>
            </h1>
            <p className="text-ink/70 font-light text-lg leading-relaxed mb-10">
              Ready to host your event at Ever After? Fill out the booking request form, and our dedicated concierge team will get back to you promptly to curate your perfect day.
            </p>
            
            <div className="hidden lg:block aspect-[3/4] w-full max-w-sm arch-mask overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" 
                alt="Elegant table setting" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-ink/10"></div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="bg-white p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-ink/5">
              {isSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 px-6 border border-gold/20 bg-gold/5"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm border border-gold/20">
                    <Sparkles className="text-gold" size={32} />
                  </div>
                  <h2 className="text-3xl font-serif mb-4 text-ink">Request Received</h2>
                  <p className="text-ink/70 font-light leading-relaxed max-w-md mx-auto mb-10">
                    Thank you for choosing Ever After. Our team will review your request and contact you shortly to confirm availability and finalize arrangements.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="border-b border-ink pb-1 uppercase tracking-widest text-xs hover:text-gold hover:border-gold transition-colors"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-3 font-medium text-ink/80">Full Name *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold/70">
                          <User size={18} />
                        </div>
                        <input 
                          {...register("fullName", { required: "Full name is required" })}
                          className="w-full bg-bg-warm/30 border border-ink/10 py-4 pl-12 pr-4 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm"
                          placeholder="Jane Doe"
                        />
                      </div>
                      {errors.fullName && <span className="text-red-500 text-xs mt-2 block">{errors.fullName.message}</span>}
                    </div>

                    {/* Phone */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-3 font-medium text-ink/80">Phone Number *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold/70">
                          <Phone size={18} />
                        </div>
                        <input 
                          {...register("phone", { required: "Phone number is required" })}
                          className="w-full bg-bg-warm/30 border border-ink/10 py-4 pl-12 pr-4 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm"
                          placeholder="+234 800 000 0000"
                        />
                      </div>
                      {errors.phone && <span className="text-red-500 text-xs mt-2 block">{errors.phone.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Email */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-3 font-medium text-ink/80">Email Address *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold/70">
                          <Mail size={18} />
                        </div>
                        <input 
                          type="email"
                          {...register("email", { 
                            required: "Email is required",
                            pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                          })}
                          className="w-full bg-bg-warm/30 border border-ink/10 py-4 pl-12 pr-4 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm"
                          placeholder="jane@example.com"
                        />
                      </div>
                      {errors.email && <span className="text-red-500 text-xs mt-2 block">{errors.email.message}</span>}
                    </div>

                    {/* Event Type */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-3 font-medium text-ink/80">Event Type *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold/70">
                          <Sparkles size={18} />
                        </div>
                        <select 
                          {...register("eventType", { required: "Please select an event type" })}
                          className="w-full bg-bg-warm/30 border border-ink/10 py-4 pl-12 pr-4 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm appearance-none"
                        >
                          <option value="" disabled>Select event type</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Birthday">Birthday Celebration</option>
                          <option value="Seminar">Seminar & Conference</option>
                          <option value="Corporate">Corporate Event</option>
                          <option value="Other">Other Event</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-ink/40">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                      {errors.eventType && <span className="text-red-500 text-xs mt-2 block">{errors.eventType.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Event Date */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-3 font-medium text-ink/80">Event Date *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold/70">
                          <Calendar size={18} />
                        </div>
                        <input 
                          type="date"
                          {...register("eventDate", { required: "Event date is required" })}
                          className="w-full bg-bg-warm/30 border border-ink/10 py-4 pl-12 pr-4 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm"
                        />
                      </div>
                      {errors.eventDate && <span className="text-red-500 text-xs mt-2 block">{errors.eventDate.message}</span>}
                    </div>

                    {/* Guests */}
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-3 font-medium text-ink/80">Estimated Guests</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold/70">
                          <Users size={18} />
                        </div>
                        <select 
                          {...register("guests")}
                          className="w-full bg-bg-warm/30 border border-ink/10 py-4 pl-12 pr-4 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm appearance-none"
                        >
                          <option value="">Select guest count</option>
                          <option value="1-50">1 - 50</option>
                          <option value="51-100">51 - 100</option>
                          <option value="101-300">101 - 300</option>
                          <option value="301-500">301 - 500</option>
                          <option value="500+">500+</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-ink/40">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-3 font-medium text-ink/80">Additional Details</label>
                    <div className="relative">
                      <div className="absolute top-4 left-0 pl-4 pointer-events-none text-gold/70">
                        <MessageSquare size={18} />
                      </div>
                      <textarea 
                        {...register("details")}
                        rows={4}
                        className="w-full bg-bg-warm/30 border border-ink/10 py-4 pl-12 pr-4 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm resize-none"
                        placeholder="Tell us more about your event requirements, special requests, or questions..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full bg-ink text-bg-warm px-12 py-5 uppercase tracking-widest text-sm hover:bg-gold transition-colors duration-300 flex justify-center items-center gap-3"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
