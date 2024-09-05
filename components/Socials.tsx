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
    <div className="flex justify-center sm:justify-start items-center gap-6 text-3xl mt-4">
      <li>
        <a
          href="https://www.instagram.com/mern.serwis/"
          target="_blank"
          rel="noopener noreferrer external"
        >
          <FaInstagram className="hover:text-orange-400 transition-all" />
        </a>
      </li>
      <li>
        <a
          href="https://www.youtube.com/@MernSerwis"
          target="_blank"
          rel="noopener noreferrer external"
        >
          <FaYoutube className="hover:text-red-400 transition-all" />
        </a>
      </li>
      <li>
        <a
          href="https://www.tiktok.com/@mern.serwis"
          target="_blank"
          rel="noopener noreferrer external"
        >
          <FaTiktok className="hover:text-purple-400 transition-all" />
        </a>
      </li>
      <li>
        <a
          href="https://www.facebook.com/mern.serwis/"
          target="_blank"
          rel="noopener noreferrer external"
        >
          <FaFacebook className="hover:text-blue-400 transition-all" />
        </a>
      </li>
      <li>
        <a
          href="https://maps.app.goo.gl/N1jix6gETE3ipFEN9"
          target="_blank"
          rel="noopener noreferrer external"
        >
          <FaMapMarkerAlt className="hover:text-yellow-400 transition-all" />
        </a>
      </li>
      <li>
        <a
          href="https://wa.me/48509159158"
          target="_blank"
          rel="noopener noreferrer external"
        >
          <FaWhatsapp className="hover:text-green-400 transition-all" />
        </a>
      </li>
    </div>
  );
};

export default Socials;
