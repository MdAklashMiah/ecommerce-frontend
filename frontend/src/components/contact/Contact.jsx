"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, Globe } from "lucide-react";
import SectionTitle from "../common/SectionTitle";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1500);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email Correspondence",
      value: "dev.md.aklashmiah@gmail.com",
      sub: "Our team responds within 24 hours.",
      link: "mailto:dev.md.aklashmiah@gmail.com"
    },
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Phone Support",
      value: "+880 1812-429217",
      sub: "Mon - Fri, 9am - 6pm (BST)",
      link: "tel:+8801812429217"
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Design Studio",
      value: "Dhanmondi, Dhaka, Bangladesh",
      sub: "By appointment only.",
      link: "https://maps.google.com/?q=Dhanmondi,Dhaka,Bangladesh"
    }
  ];

  return (
    <section className="bg-white py-24 animate-fade-in">
      <div className="mb-20">
        <SectionTitle 
          title="Connect with Us" 
          subtitle="Whether you have a question about our collections or need assistance with an order, we are here to provide an exceptional experience."
        />
      </div>

      <div className="grid lg:grid-cols-12 gap-16 items-start">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-gray-50 rounded-[32px] p-10 border border-gray-100 space-y-10">
            <div>
              <h3 className="text-xl font-black text-gray-900 tracking-tight italic mb-2">Concierge <span className="text-gray-400">Services</span></h3>
              <p className="text-xs text-gray-400 font-medium uppercase tracking-[0.2em]">Excellence in every interaction</p>
            </div>

            <div className="space-y-8">
              {contactInfo.map((info, idx) => (
                <a 
                  key={idx} 
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-6 group"
                >
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-gray-100 transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:shadow-xl group-hover:shadow-black/10 group-hover:-translate-y-1">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{info.title}</h4>
                    <p className="text-sm font-bold text-gray-900 group-hover:text-black transition-colors">{info.value}</p>
                    <p className="text-[10px] text-gray-400 mt-1 font-medium">{info.sub}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="pt-10 border-t border-gray-200 grid grid-cols-2 gap-6">
               <div>
                  <h5 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2"><Clock className="w-3 h-3" /> Operation Hours</h5>
                  <p className="text-[10px] font-bold text-gray-900">10:00 AM - 10:00 PM</p>
               </div>
               <div>
                  <h5 className="text-[9px] font-black uppercase tracking-widest text-gray-400 mb-2 flex items-center gap-2"><Globe className="w-3 h-3" /> Global Shipping</h5>
                  <p className="text-[10px] font-bold text-gray-900">Available Worldwide</p>
               </div>
            </div>
          </div>

          {/* Map Embed - Modern Style */}
          <div className="rounded-[32px] overflow-hidden border border-gray-100 h-[300px] shadow-sm group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14608.036944850553!2d90.3654215!3d23.7464663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b33cffc3fb%3A0x4a9680252b49466!2sDhanmondi%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1714851234567!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "grayscale(100%) contrast(1.2) opacity(0.8)" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100"
            />
          </div>
        </div>

        {/* Message Form Area */}
        <div className="lg:col-span-7 bg-white border border-gray-100 rounded-[32px] p-10 lg:p-16 shadow-2xl shadow-black/5">
          <div className="mb-12">
             <div className="flex items-center gap-3 text-gray-400 mb-4">
                <MessageSquare className="w-5 h-5" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em]">Send a Message</span>
             </div>
             <h2 className="text-3xl font-black text-gray-900 tracking-tight italic">How can we <span className="text-gray-400">Assist You?</span></h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Alexander Smith"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm outline-none focus:bg-white focus:border-black transition-all font-medium"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="alex@premium.com"
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm outline-none focus:bg-white focus:border-black transition-all font-medium"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Subject</label>
              <input
                type="text"
                required
                placeholder="Product Inquiry / Partnership"
                className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-4 text-sm outline-none focus:bg-white focus:border-black transition-all font-medium"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Your Message</label>
              <textarea
                rows="6"
                required
                placeholder="Describe how we can help you in detail..."
                className="w-full bg-gray-50 border border-gray-100 rounded-3xl px-6 py-6 text-sm outline-none focus:bg-white focus:border-black transition-all font-medium resize-none"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-black text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:bg-gray-900 transition-all shadow-xl shadow-black/20 group disabled:opacity-70"
            >
              {status === "sending" ? (
                "Transmitting..."
              ) : status === "success" ? (
                "Message Received"
              ) : (
                <>
                  Dispatch Message <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </>
              )}
            </button>
            
            {status === "success" && (
              <p className="text-center text-[10px] font-bold text-green-600 uppercase tracking-widest animate-fade-in">
                Thank you. Our concierge team will reach out shortly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
