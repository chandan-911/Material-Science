import { Navbar } from '../components/Navbar';
import Footer from '../components/Footer';
import { FaEnvelope, FaPhoneAlt, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  const email = 'ck7464877@gmail.com';
  const phone = '+91-99151-26389';
  const whatsappMessage = encodeURIComponent(
    'Hello, I need assistance with the Metal Selector Tool!'
  );
  const whatsappURL = `https://wa.me/919915126389?text=${whatsappMessage}`;
  const locationURL = 'https://www.google.com/maps/place/India';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col">
      <Navbar />
      <br />
      <br />
      <br />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-3xl bg-slate-800/50 shadow-lg rounded-2xl p-6 flex flex-col border border-slate-700">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-6">Contact Us</h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-lg mb-6">
                We're here to help with any questions about our metal selection tools and services. 
                Reach out to us using any of the methods below:
              </p>
              
              {/* Contact Information */}
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start space-x-3">
                  <div className="bg-cyan-500/20 p-3 rounded-full">
                    <FaEnvelope className="text-cyan-400 h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-cyan-300">Email</h3>
                    <a 
                      href={`mailto:${email}?subject=Metal%20Selector%20Inquiry&body=Hi%20team,%20I%20have%20a%20question%20about%20the%20Metal%20Selector%20Tool.`}
                      className="text-slate-300 hover:text-cyan-400 transition"
                    >
                      {email}
                    </a>
                  </div>
                </div>
                
                {/* Phone */}
                <div className="flex items-start space-x-3">
                  <div className="bg-blue-500/20 p-3 rounded-full">
                    <FaPhoneAlt className="text-blue-400 h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-blue-300">Phone</h3>
                    <a 
                      href={`tel:${phone}`} 
                      className="text-slate-300 hover:text-blue-400 transition"
                    >
                      {phone}
                    </a>
                  </div>
                </div>
                
                {/* WhatsApp */}
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500/20 p-3 rounded-full">
                    <FaWhatsapp className="text-green-400 h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-green-300">WhatsApp</h3>
                    <a 
                      href={whatsappURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-green-400 transition"
                    >
                      Message on WhatsApp
                    </a>
                  </div>
                </div>
                
                {/* Location */}
                <div className="flex items-start space-x-3">
                  <div className="bg-purple-500/20 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-purple-400 h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-purple-300">Location</h3>
                    <a 
                      href={locationURL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-300 hover:text-purple-400 transition"
                    >
                      India
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right side - Message or additional info */}
            <div className="bg-slate-900/50 p-5 rounded-lg border border-slate-700">
              <h3 className="text-xl font-semibold text-cyan-400 mb-4">Business Hours</h3>
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span className="text-slate-400">Monday - Friday:</span>
                  <span>9:00 AM - 6:00 PM IST</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Saturday:</span>
                  <span>10:00 AM - 4:00 PM IST</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-slate-400">Sunday:</span>
                  <span>Closed</span>
                </p>
              </div>
              
              <div className="mt-6 pt-6 border-t border-slate-700">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Response Time</h3>
                <p className="text-slate-300">
                  We typically respond to all inquiries within 24 hours during business days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default ContactUs;