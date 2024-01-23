import React from "react";
import { PulseLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="h-screen">
      <div className="flex w-full h-[60%] justify-center items-center">
        <PulseLoader color="#ffa400" />
      </div>
    </div>
  );
};

export default Loader;
