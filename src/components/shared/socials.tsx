import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaTiktok,
  FaWhatsapp,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Socials = () => {
  return (
    <ul className="flex justify-center sm:justify-start items-center 
    gap-6 text-3xl mt-8" role="list">
      <li>
        <a
          href="https://www.instagram.com/mern.serwis/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit us on Instagram"
        >
          <FaInstagram className="hover:text-orange-400 transition-all" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a
          href="https://www.youtube.com/@MernSerwis"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit us on YouTube"
        >
          <FaYoutube className="hover:text-red-400 transition-all" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a
          href="https://www.tiktok.com/@mern.serwis"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit us on TikTok"
        >
          <FaTiktok className="hover:text-purple-400 transition-all" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a
          href="https://www.facebook.com/mern.serwis/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Visit us on Facebook"
        >
          <FaFacebook className="hover:text-blue-400 transition-all" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a
          href="https://maps.app.goo.gl/N1jix6gETE3ipFEN9"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View our location on Google Maps"
        >
          <FaMapMarkerAlt className="hover:text-yellow-400 transition-all" aria-hidden="true" />
        </a>
      </li>
      <li>
        <a
          href="https://wa.me/48509159158"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact us on WhatsApp"
        >
          <FaWhatsapp className="hover:text-green-400 transition-all" aria-hidden="true" />
        </a>
      </li>
    </ul>
  );
};

export default Socials;
