import React from "react";
import { PulseLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex w-full h-[50%] justify-center items-center">
      <PulseLoader color="#ffa400" />
    </div>
  );
};

export default Loader;
