/**
 * Dedicated About Page (/about)
 * In-depth biography of Senithu Sethmin Warnakulasooriya,
 * engineering philosophy, coursework details, and collaboration contact channel.
 */

import React, { useState } from 'react';
import { Mail, Github, Linkedin, Send, CheckCircle2, Sparkles, MapPin, GraduationCap } from 'lucide-react';
import { AboutSection } from '../components/home/AboutSection';
import { siteConfig } from '../config/site';

export const AboutPage: React.FC = () => {
  const [formSent, setFormSent] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate contact form submission
    setFormSent(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setFormSent(false);
    }, 4000);
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Creator Intro Section */}
        <AboutSection />

        {/* Contact & Collaboration Section */}
        <div className="max-w-4xl mx-auto mt-16 p-8 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs uppercase font-extrabold tracking-wider text-[#184E46] dark:text-[#4DD0B6]">
              Get in Touch
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#184E46] dark:text-[#E9F6F1] mt-1">
              Have an Idea or Want to Collaborate?
            </h2>
            <p className="text-xs sm:text-sm text-[#486962] dark:text-[#B9D6CD] mt-2">
              Whether you have questions about circuit designs, embedded firmware ideas, or academic inquiries, feel free to send a message!
            </p>
          </div>

          {formSent ? (
            <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <h3 className="font-extrabold text-sm text-emerald-800 dark:text-emerald-300">
                Message Sent Successfully!
              </h3>
              <p className="text-xs text-emerald-700 dark:text-emerald-400">
                Thank you for reaching out. Senithu will get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-bold text-[#184E46] dark:text-[#E9F6F1] mb-1">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="E.g. Elena Rostova"
                    className="w-full p-3 rounded-2xl border border-[#E2D9CC] dark:border-[#294F47] bg-[#F5EDE2]/40 dark:bg-[#112320] text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1] focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-bold text-[#184E46] dark:text-[#E9F6F1] mb-1">
                    Your Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="elena@example.com"
                    className="w-full p-3 rounded-2xl border border-[#E2D9CC] dark:border-[#294F47] bg-[#F5EDE2]/40 dark:bg-[#112320] text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1] focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contact-subject" className="block text-xs font-bold text-[#184E46] dark:text-[#E9F6F1] mb-1">
                  Topic / Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Autonomous Rover SLAM collaboration / Microcontroller discussion"
                  className="w-full p-3 rounded-2xl border border-[#E2D9CC] dark:border-[#294F47] bg-[#F5EDE2]/40 dark:bg-[#112320] text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1] focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
                />
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-bold text-[#184E46] dark:text-[#E9F6F1] mb-1">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Share details regarding your technical query or project proposal..."
                  className="w-full p-3 rounded-2xl border border-[#E2D9CC] dark:border-[#294F47] bg-[#F5EDE2]/40 dark:bg-[#112320] text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1] focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#184E46] text-white text-xs sm:text-sm font-bold hover:bg-[#123B35] transition-all shadow-md"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
