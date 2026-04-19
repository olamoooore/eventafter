import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { User, Phone, Mail, Calendar, Users, MessageSquare, Sparkles } from 'lucide-react';
import { fetchApiJson } from '../lib/api';

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      eventType: defaultEventType,
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const { response, data: payload } = await fetchApiJson<{ message?: string }>('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(payload.message || 'Unable to submit your booking request right now.');
      }

      setIsSubmitted(true);
      reset({
        fullName: '',
        phone: '',
        email: '',
        eventType: defaultEventType,
        eventDate: '',
        guests: '',
        details: '',
      });
    } catch (error) {
      setSubmissionError(
        error instanceof Error
          ? error.message
          : 'Unable to submit your booking request right now. Please call 0805 956 5056.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-shell pt-32 pb-24 px-6 bg-bg-warm min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-[2.2rem] min-h-[26rem] mb-16"
        >
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop"
            alt="Ever After booking experience"
            className="absolute inset-0 h-full w-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(36,48,38,0.82)_0%,rgba(36,48,38,0.58)_45%,rgba(36,48,38,0.25)_100%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(229,177,100,0.28),transparent_24%)]" />

          <div className="relative z-10 flex h-full flex-col justify-end px-8 py-10 md:px-12 md:py-14 lg:max-w-3xl">
            <span className="mb-4 text-gold text-xs uppercase tracking-[0.3em]">Reservations</span>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif text-bg-warm leading-[1.02] mb-5">
              Book Your <span className="italic text-gold-light">Event</span>
            </h1>
            <p className="max-w-2xl text-bg-warm/82 text-lg font-light leading-relaxed mb-8">
              Start your event inquiry with Ever After and let our team help shape a celebration or gathering that feels polished, welcoming, and memorable from the very first step.
            </p>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                'Choose your event type and preferred date.',
                'Share guest estimates and planning notes.',
                'Our team follows up to confirm details and next steps.',
              ].map((item) => (
                <div key={item} className="rounded-[1.4rem] border border-white/12 bg-bg-warm/10 px-5 py-4 text-sm leading-relaxed text-bg-warm/88 backdrop-blur-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-5 lg:sticky lg:top-32 h-fit"
          >
            <span className="text-gold text-xs uppercase tracking-[0.3em] mb-4 block">Booking Steps</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">
              A Smooth <span className="italic text-sage">Inquiry Process</span>
            </h2>
            <p className="text-ink/70 font-light text-lg leading-relaxed mb-10">
              Fill out the request form with your key event details. Once submitted, our concierge team will review your inquiry and reach out to guide the next stage of planning.
            </p>

            <div className="grid gap-4 mb-10">
              {[
                'Submit your preferred event type and date.',
                'Share guest estimates and planning notes.',
                'Our team will follow up to confirm details and next steps.',
              ].map((item) => (
                <div key={item} className="editorial-panel rounded-[1.5rem] px-5 py-4 text-sm leading-relaxed text-ink/70">
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7"
          >
            <div className="editorial-panel rounded-[2rem] p-8 md:p-12">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-20 px-6 rounded-[1.75rem] border border-gold/20 bg-gold/6"
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
                    className="border-b border-sage pb-1 uppercase tracking-[0.24em] text-xs text-sage hover:text-gold hover:border-gold transition-colors"
                  >
                    Submit Another Request
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {submissionError && (
                    <div className="rounded-[1.25rem] border border-red-200 bg-red-50 px-5 py-4 text-sm leading-relaxed text-red-700">
                      {submissionError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-3 font-medium text-ink/80">Full Name *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold/70">
                          <User size={18} />
                        </div>
                        <input
                          {...register('fullName', { required: 'Full name is required' })}
                          className="w-full rounded-[1.1rem] bg-bg-warm/50 border border-sage/10 py-4 pl-12 pr-4 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm"
                          placeholder="Jane Doe"
                        />
                      </div>
                      {errors.fullName && <span className="text-red-500 text-xs mt-2 block">{errors.fullName.message}</span>}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-3 font-medium text-ink/80">Phone Number *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold/70">
                          <Phone size={18} />
                        </div>
                        <input
                          {...register('phone', { required: 'Phone number is required' })}
                          className="w-full rounded-[1.1rem] bg-bg-warm/50 border border-sage/10 py-4 pl-12 pr-4 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm"
                          placeholder="0800 000 0000"
                        />
                      </div>
                      {errors.phone && <span className="text-red-500 text-xs mt-2 block">{errors.phone.message}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-3 font-medium text-ink/80">Email Address *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold/70">
                          <Mail size={18} />
                        </div>
                        <input
                          type="email"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' },
                          })}
                          className="w-full rounded-[1.1rem] bg-bg-warm/50 border border-sage/10 py-4 pl-12 pr-4 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm"
                          placeholder="jane@example.com"
                        />
                      </div>
                      {errors.email && <span className="text-red-500 text-xs mt-2 block">{errors.email.message}</span>}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-3 font-medium text-ink/80">Event Type *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold/70">
                          <Sparkles size={18} />
                        </div>
                        <select
                          {...register('eventType', { required: 'Please select an event type' })}
                          className="w-full rounded-[1.1rem] bg-bg-warm/50 border border-sage/10 py-4 pl-12 pr-4 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm appearance-none"
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
                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-3 font-medium text-ink/80">Event Date *</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold/70">
                          <Calendar size={18} />
                        </div>
                        <input
                          type="date"
                          {...register('eventDate', { required: 'Event date is required' })}
                          className="w-full rounded-[1.1rem] bg-bg-warm/50 border border-sage/10 py-4 pl-12 pr-4 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm"
                        />
                      </div>
                      {errors.eventDate && <span className="text-red-500 text-xs mt-2 block">{errors.eventDate.message}</span>}
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-widest mb-3 font-medium text-ink/80">Estimated Guests</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gold/70">
                          <Users size={18} />
                        </div>
                        <select
                          {...register('guests')}
                          className="w-full rounded-[1.1rem] bg-bg-warm/50 border border-sage/10 py-4 pl-12 pr-4 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm appearance-none"
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

                  <div>
                    <label className="block text-xs uppercase tracking-widest mb-3 font-medium text-ink/80">Additional Details</label>
                    <div className="relative">
                      <div className="absolute top-4 left-0 pl-4 pointer-events-none text-gold/70">
                        <MessageSquare size={18} />
                      </div>
                      <textarea
                        {...register('details')}
                        rows={4}
                        className="w-full rounded-[1.1rem] bg-bg-warm/50 border border-sage/10 py-4 pl-12 pr-4 focus:outline-none focus:border-gold focus:bg-white transition-all text-sm resize-none"
                        placeholder="Tell us more about your event requirements, special requests, or questions..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-sage text-bg-warm px-12 py-5 uppercase tracking-[0.24em] text-sm hover:bg-gold hover:text-ink transition-colors duration-300 flex justify-center items-center gap-3"
                    >
                      {isSubmitting ? 'Sending Request...' : 'Submit Request'}
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
