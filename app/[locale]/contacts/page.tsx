import ApplicationForm from "@/components/ApplicationForm";
import Location from "@/components/Location";
import React from "react";

const ContactsPage = () => {
  return (
    <div className="pt-[18vh] md:pt-[25vh]">
      <ApplicationForm />
      <Location />
    </div>
  );
};

export default ContactsPage;
