import React from "react";
import { Circles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="absolute bg-black/50 w-full min-h-screen top-0 left-0 flex justify-center items-center">
      <Circles
        height="100"
        width="100"
        color="#beed3b"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
};

export default Loader;
