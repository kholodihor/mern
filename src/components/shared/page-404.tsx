"use client";

import not_found from "@/animations/not_found.json";
import Lottie from "lottie-react";

const Page404 = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie animationData={not_found} loop={false} className="mt-[5vh]" />
    </div>
  );
};

export default Page404;
