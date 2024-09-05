import { FaPhone, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";

const ContactsBubble = () => {
  return (
    <div className="hidden md:block lg:hidden h-[20vw] sm:w-[40vw] aspect-video bg-black text-white absolute top-[18vh] right-[2rem] z-[9999] rounded-md">
      <ul className="w-full h-full flex flex-col justify-center items-start pl-4 gap-2 text-sm">
        <li className="font-bold underline">
          Niezależny serwis BMW, Rolls-Royce i MINI
        </li>
        <li className="flex gap-2">
          <FaMapMarkerAlt className="text-blue-400 sm:mr-2" />
          ul.Przyszłość 2A Stanisławów Pierwszy
        </li>
        <li className="flex gap-2">
          <FaEnvelope className="text-blue-400 sm:mr-2" />
          mern.serwis@gmail.com
        </li>
        <li className="flex gap-2">
          <FaPhone className="text-blue-400 sm:mr-2" />
          509 158 159
        </li>
        <li className="flex gap-2">
          <FaPhone className="text-blue-400 sm:mr-2" />
          509 159 158
        </li>
      </ul>
      <div className="absolute top-[10%] -right-[1.8rem] w-0 h-0 border-l-[1rem] border-l-transparent border-r-[1rem] border-r-transparent border-b-[2rem] border-b-black rotate-90"></div>
    </div>
  );
};

export default ContactsBubble;
