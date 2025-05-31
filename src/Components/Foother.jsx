import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLeaf } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Foother = () => {
  return (
    <footer className="bg-base-200 text-base-content font-poppins border-t border-base-300">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Contact Info */}
        <div>
          <h2 className="text-lg font-bold text-primary flex items-center gap-1 mb-2">
            <FaLeaf /> GardenGlow
          </h2>
          <p className="text-sm">
            🌱 Connecting nature lovers and gardeners worldwide.<br />
            Email: <a className="link link-hover text-primary" href="mailto:support@gardenglow.com">support@gardenglow.com</a><br />
            Phone: +880-1521468295
          </p>
        </div>

        {/* Terms & Links */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-primary">Links</h3>
          <ul className="space-y-1 text-sm">
            <li><Link to="/terms" className="link link-hover">Terms & Conditions</Link></li>
            <li><Link to="/privacy" className="link link-hover">Privacy Policy</Link></li>
            <li><Link to="/contact" className="link link-hover">Contact Us</Link></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-primary">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-primary">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-primary">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-sky-500 hover:text-primary">
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="text-center py-4 text-sm border-t border-base-300">
        © {new Date().getFullYear()} GardenGlow. All rights reserved.
      </div>
    </footer>
  );
};

export default Foother;
