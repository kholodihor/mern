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
        >
          <FaInstagram
            className="transition-all hover:text-orange-400"
            aria-hidden="true"
          />
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
            className="transition-all hover:text-red-400"
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
            className="transition-all hover:text-purple-400"
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
            className="transition-all hover:text-blue-400"
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
            className="transition-all hover:text-yellow-400"
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
            className="transition-all hover:text-green-400"
            aria-hidden="true"
          />
        </a>
      </li>
    </ul>
  );
};

export default Socials;
