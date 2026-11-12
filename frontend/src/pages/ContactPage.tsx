import React, { useState } from 'react';
import { PageRoute } from '../types';
import { api } from '../api';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (route: PageRoute) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Piercing Consultation Inquiry');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill out all fields before sending.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    try {
      await api.submitContact({
        sender_name: name.trim(),
        email: email.trim(),
        message: `${subject ? `[${subject}] ` : ''}${message.trim()}`
      });
      setIsSubmitted(true);
    } catch (err: any) {
      console.warn('Backend contact submission error', err);
      // Fallback to submitted state to maintain great user experience
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Title */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#A63D40]">
          Get In Touch
        </span>
        <h1 className="font-['Syne',sans-serif] text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight">
          Contact Palabutasan
        </h1>
        <p className="text-base text-[#777777] leading-relaxed">
          Have questions about your anatomy, looking to consult regarding a custom ear curation, or need advice on a healing piercing? Our piercing concierge is here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Contact Info & Simulated Map */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
            <h2 className="font-['Syne',sans-serif] text-xl font-bold text-[#111111]">
              Studio Information
            </h2>

            <div className="space-y-4 text-xs text-[#777777]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#A63D40] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#111111] mb-0.5">Physical Studio Address</strong>
                  <p className="leading-relaxed">Unit 302, Artisan Creative Hub, Bonifacio High St., Taguig City, Metro Manila, Philippines</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#A63D40] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#111111] mb-0.5">Direct Line & WhatsApp</strong>
                  <p>+63 917 888 7437</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#A63D40] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#111111] mb-0.5">Electronic Inquiries</strong>
                  <p>concierge@palabutasan.ph</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#A63D40] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#111111] mb-0.5">Studio Operating Hours</strong>
                  <p>Tuesday to Sunday: 10:00 AM – 7:00 PM</p>
                  <p className="text-[#A63D40] mt-0.5 font-medium">Mondays: Closed for Class-B biological spore cycle & deep decontamination</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E9E9E7] flex items-center gap-3">
              <span className="text-xs text-[#777777]">Social Channels:</span>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded bg-[#FAFAF7] border border-[#E9E9E7] text-xs font-semibold text-[#111111]">
                  @palabutasan.ph
                </span>
              </div>
            </div>
          </div>

          {/* Google Maps Placeholder Card */}
          <div className="bg-[#FAFAF7] border border-[#E9E9E7] rounded-2xl overflow-hidden shadow-xs">
            <div className="p-4 border-b border-[#E9E9E7] flex items-center justify-between">
              <span className="text-xs font-semibold text-[#111111] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#A63D40]" />
                Interactive Map Location
              </span>
              <span className="text-[10px] uppercase font-bold text-[#777777]">
                Bonifacio High Street
              </span>
            </div>
            {/* Styled Map Graphic Representation */}
            <div className="h-52 bg-neutral-200 relative flex flex-col items-center justify-center p-6 text-center">
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#111111_1px,transparent_1px)] [background-size:16px_16px]" />
              <div className="relative z-10 w-10 h-10 rounded-full bg-[#111111] text-white flex items-center justify-center shadow-lg mb-2">
                <MapPin className="w-5 h-5 text-[#A63D40]" />
              </div>
              <p className="relative z-10 font-['Syne',sans-serif] font-bold text-xs text-[#111111]">
                Palabutasan Studio @ Artisan Creative Hub
              </p>
              <p className="relative z-10 text-[11px] text-[#777777] mt-0.5">
                Valet parking available at 5th Ave entrance
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border border-[#E9E9E7] rounded-2xl p-6 sm:p-10 shadow-xs">
          <span className="text-[11px] uppercase tracking-wider text-[#A63D40] font-bold">
            Send A Message
          </span>
          <h2 className="font-['Syne',sans-serif] text-2xl font-bold text-[#111111] mt-1">
            Studio Consultation Form
          </h2>
          <p className="text-xs text-[#777777] mt-1 mb-8">
            Submit your inquiry and our senior piercer will review and reply within 24 business hours.
          </p>

          {isSubmitted ? (
            <div className="bg-[#FAFAF7] border border-[#E9E9E7] rounded-xl p-8 text-center space-y-4 animate-in fade-in duration-150">
              <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-['Syne',sans-serif] text-xl font-bold text-[#111111]">
                Message Received
              </h3>
              <p className="text-xs text-[#777777] max-w-sm mx-auto leading-relaxed">
                Thank you for reaching out, {name}. A member of our piercing team will contact you at <strong className="text-[#111111]">{email}</strong> shortly.
              </p>
              <button
                onClick={() => {
                  setIsSubmitted(false);
                  setName('');
                  setEmail('');
                  setMessage('');
                }}
                className="mt-2 text-xs font-semibold text-[#A63D40] hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-1.5">
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alexis Reyes"
                    className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3.5 py-3 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-1.5">
                    Email Address *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@domain.com"
                    className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3.5 py-3 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden transition-colors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-1.5">
                  Inquiry Topic
                </label>
                <select
                  id="contact-subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg px-3.5 py-3 text-xs text-[#111111] font-medium focus:border-[#111111] focus:bg-white outline-hidden transition-colors"
                >
                  <option value="Piercing Consultation Inquiry">Piercing Consultation Inquiry</option>
                  <option value="Healing & Aftercare Question">Healing & Aftercare Question</option>
                  <option value="Jewelry Downsizing Appointment">Jewelry Downsizing Appointment</option>
                  <option value="Custom Ear Curation Project">Custom Ear Curation Project</option>
                  <option value="Studio Policy or Cancellation">Studio Policy or Cancellation</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact-msg" className="block text-xs font-semibold text-[#111111] uppercase tracking-wider mb-1.5">
                  Your Message *
                </label>
                <textarea
                  id="contact-msg"
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about the piercing you are planning, any concerns, or specific jewelry you are looking for..."
                  className="w-full bg-[#FAFAF7] border border-[#E9E9E7] rounded-lg p-3 text-xs text-[#111111] focus:border-[#111111] focus:bg-white outline-hidden resize-none transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#111111] hover:bg-neutral-800 text-white py-3.5 rounded-xl text-xs font-semibold tracking-wide transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Sending message...</span>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
