"use client";

const MyMap = () => {
  return (
    <div className="relative flex w-full flex-col items-center justify-center pb-6 text-center sm:text-left lg:w-1/2">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2435.669356086654!2d21.03812667661229!3d52.37641517202389!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ec79e1015d07d%3A0x6a8ae3e2f8c2284b!2sMern%20Serwis%20%7C%20Niezale%C5%BCny%20Serwis%20BMW%2C%20Rolls-Royce%20i%20MINI!5e0!3m2!1sen!2sua!4v1732338410747!5m2!1sen!2sua"
        width="100%"
        height="400px"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default MyMap;
