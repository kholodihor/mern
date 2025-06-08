"use client";

import Lottie from "lottie-react";
import not_found from "@/animations/not_found.json";

const Page404 = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie animationData={not_found} loop={false} className="mt-[5vh]" />
    </div>
  );
};

export default Page404;
