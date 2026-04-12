import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';

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
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block"
          >
            Reservations
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-serif mb-6"
          >
            Book Your <span className="italic text-gold">Event</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-ink/70 font-light text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Ready to host your event at Ever After Centre? Simply fill out the booking request form below, and our team will get back to you promptly.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white p-8 md:p-16 shadow-sm border border-ink/5"
        >
          {isSubmitted ? (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">✨</span>
              </div>
              <h2 className="text-3xl font-serif mb-4">Request Received</h2>
              <p className="text-ink/70 font-light leading-relaxed max-w-md mx-auto mb-8">
                Thank you for choosing Ever After Centre. Our team will review your request and contact you shortly to confirm availability and finalize arrangements.
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                className="border-b border-ink pb-1 uppercase tracking-widest text-xs hover:text-gold hover:border-gold transition-colors"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-medium">Full Name *</label>
                  <input 
                    {...register("fullName", { required: "Full name is required" })}
                    className="w-full bg-transparent border-b border-ink/20 py-3 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Jane Doe"
                  />
                  {errors.fullName && <span className="text-red-500 text-xs mt-1 block">{errors.fullName.message}</span>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-medium">Phone Number *</label>
                  <input 
                    {...register("phone", { required: "Phone number is required" })}
                    className="w-full bg-transparent border-b border-ink/20 py-3 focus:outline-none focus:border-gold transition-colors"
                    placeholder="+234 800 000 0000"
                  />
                  {errors.phone && <span className="text-red-500 text-xs mt-1 block">{errors.phone.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-medium">Email Address *</label>
                  <input 
                    type="email"
                    {...register("email", { 
                      required: "Email is required",
                      pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                    })}
                    className="w-full bg-transparent border-b border-ink/20 py-3 focus:outline-none focus:border-gold transition-colors"
                    placeholder="jane@example.com"
                  />
                  {errors.email && <span className="text-red-500 text-xs mt-1 block">{errors.email.message}</span>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-medium">Event Type *</label>
                  <select 
                    {...register("eventType", { required: "Please select an event type" })}
                    className="w-full bg-transparent border-b border-ink/20 py-3 focus:outline-none focus:border-gold transition-colors appearance-none"
                  >
                    <option value="" disabled>Select event type</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Birthday">Birthday Celebration</option>
                    <option value="Seminar">Seminar & Conference</option>
                    <option value="Corporate">Corporate Event</option>
                    <option value="Other">Other Event</option>
                  </select>
                  {errors.eventType && <span className="text-red-500 text-xs mt-1 block">{errors.eventType.message}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-medium">Event Date *</label>
                  <input 
                    type="date"
                    {...register("eventDate", { required: "Event date is required" })}
                    className="w-full bg-transparent border-b border-ink/20 py-3 focus:outline-none focus:border-gold transition-colors"
                  />
                  {errors.eventDate && <span className="text-red-500 text-xs mt-1 block">{errors.eventDate.message}</span>}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-widest mb-2 font-medium">Estimated Guests</label>
                  <select 
                    {...register("guests")}
                    className="w-full bg-transparent border-b border-ink/20 py-3 focus:outline-none focus:border-gold transition-colors appearance-none"
                  >
                    <option value="">Select guest count</option>
                    <option value="1-50">1 - 50</option>
                    <option value="51-100">51 - 100</option>
                    <option value="101-300">101 - 300</option>
                    <option value="301-500">301 - 500</option>
                    <option value="500+">500+</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest mb-2 font-medium">Additional Details</label>
                <textarea 
                  {...register("details")}
                  rows={4}
                  className="w-full bg-transparent border-b border-ink/20 py-3 focus:outline-none focus:border-gold transition-colors resize-none"
                  placeholder="Tell us more about your event requirements..."
                ></textarea>
              </div>

              <div className="pt-6 text-center">
                <button 
                  type="submit"
                  className="bg-ink text-bg-warm px-12 py-4 uppercase tracking-widest text-sm hover:bg-gold transition-colors duration-300 w-full md:w-auto"
                >
                  Submit Request
                </button>
              </div>
            </form>
          )}
        </motion.div>

        <div className="mt-16 text-center">
          <p className="text-xl font-serif italic text-ink/80">
            Secure your date today and let Ever After Centre bring your event to life.
          </p>
        </div>
      </div>
    </div>
  );
}
