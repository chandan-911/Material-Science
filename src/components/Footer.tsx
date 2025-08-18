// Footer.tsx – Professional Footer with Working Links & Dark Theme

import {
  FaEnvelope,
  FaPhoneAlt,
  FaWhatsapp,
  FaMapMarkerAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const email = 'ck7464877@gmail.com';
  const phone = '+91-99151-26389';
  const whatsappMessage = encodeURIComponent(
    'Hello, I need assistance with the Metal Selector Tool!'
  );
  const whatsappURL = `https://wa.me/919915126389?text=${whatsappMessage}`;
  const locationURL = 'https://www.google.com/maps/place/India';

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white pt-8 pb-3 px-4 sm:px-6 border-t border-cyan-400/20">
      <div className="max-w-6xl mx-auto grid gap-y-8 gap-x-6 sm:grid-cols-2 md:grid-cols-3">
        {/* About Section */}
        <div>
          <h4 className="text-cyan-400 text-lg md:text-xl font-semibold mb-4">About @matselect</h4>
          <p className="text-sm text-slate-300">
            We're a team passionate about crafting alloy solutions with data-driven insights for engineers worldwide.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-blue-500 text-lg md:text-xl font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-slate-300 hover:text-cyan-400 transition">🏠 Home</Link></li>
            <li><Link to="/about" className="text-slate-300 hover:text-cyan-400 transition">👁‍🗨 About Us</Link></li>
            <li><Link to="/steel-advisor" className="text-slate-300 hover:text-cyan-400 transition">🔧 Steel Advisor</Link></li>
            <li><Link to="/contact" className="text-slate-300 hover:text-cyan-400 transition">👷‍♂️ Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h4 className="text-green-600 text-lg md:text-xl font-semibold mb-4">Connect</h4>

          {/* Email */}
          <p className="text-sm mb-3 flex items-center gap-2">
            <FaEnvelope className="text-cyan-400" />
            <a
              href={`mailto:${email}?subject=Metal%20Selector%20Inquiry&body=Hi%20team,%20I%20have%20a%20question%20about%20the%20Metal%20Selector%20Tool.`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-cyan-400 transition"
            >
              {email}
            </a>
          </p>

          {/* Phone */}
          <p className="text-sm mb-3 flex items-center gap-2">
            <FaPhoneAlt className="text-blue-500" />
            <a href={`tel:${phone}`} className="text-slate-300 hover:text-blue-500 transition">
              {phone}
            </a>
          </p>

          {/* WhatsApp */}
          <p className="text-sm mb-4 flex items-center gap-2">
            <FaWhatsapp className="text-green-400" />
            <a
              href={whatsappURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 hover:text-green-400 transition"
            >
              Message on WhatsApp
            </a>
          </p>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-4 border-t border-cyan-400/20 pt-4 px-4 sm:px-6 flex flex-col gap-2 md:flex-row md:gap-0 items-center justify-between text-xs text-slate-500">
        <div className="text-center md:text-left">
          © 2025 @matselect. All rights reserved.
        </div>
        <div className="text-center md:text-right">
          <a
            href={locationURL}
            target="_blank"
            rel="noreferrer"
            className="text-slate-300 hover:text-cyan-400 underline transition"
          >
            <FaMapMarkerAlt className="inline mr-1 text-cyan-400" /> India
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
