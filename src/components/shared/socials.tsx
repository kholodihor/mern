import {
  FaFacebook,
  FaInstagram,
  FaMapMarkerAlt,
  FaTiktok,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";

const Socials = () => {
  return (
    <ul
      className="mt-8 flex items-center justify-center gap-6 text-3xl sm:justify-start"
      role="list"
    >
      <li>
        <a
          href="https://www.instagram.com/mern.serwis/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit us on Instagram"
          className="inline-flex items-center justify-center p-[3.5px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 transition-transform hover:scale-110"
        >
          <FaInstagram className="text-white w-6 h-6" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a
          href="https://www.youtube.com/@MernSerwis"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit us on YouTube"
        >
          <FaYoutube
            className="transition-all text-red-400 hover:scale-110"
            aria-hidden="true"
          />
        </a>
      </li>
      <li>
        <a
          href="https://www.tiktok.com/@mern.serwis"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit us on TikTok"
        >
          <FaTiktok
            className="transition-all text-purple-400 hover:scale-110"
            aria-hidden="true"
          />
        </a>
      </li>
      <li>
        <a
          href="https://www.facebook.com/mern.serwis/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit us on Facebook"
        >
          <FaFacebook
            className="transition-all text-blue-400 hover:scale-110"
            aria-hidden="true"
          />
        </a>
      </li>
      <li>
        <a
          href="https://maps.app.goo.gl/N1jix6gETE3ipFEN9"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View our location on Google Maps"
        >
          <FaMapMarkerAlt
            className="transition-all text-yellow-400 hover:scale-110"
            aria-hidden="true"
          />
        </a>
      </li>
      <li>
        <a
          href="https://wa.me/48509159158"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
        >
          <FaWhatsapp
            className="transition-all text-green-400 hover:scale-110"
            aria-hidden="true"
          />
        </a>
      </li>
    </ul>
  );
};

export default Socials;
