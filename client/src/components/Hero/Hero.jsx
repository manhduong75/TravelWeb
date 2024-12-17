import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchComp } from "./SearchComp";

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = (destination, maxPrice) => {
    navigate(`/best-places?destination=${destination}&maxPrice=${maxPrice}`);
  };

  return (
    <div className="bg-black/20 h-full">
      <div className="h-full flex justify-center items-center p-4 bg-primary/10">
        <div className="container grid grid-cols-1 gap-4">
          <div className="text-white">
            <p data-aos="fade-up" className="text-sm">
              Khám phá
            </p>
            <p
              data-aos="fade-up"
              data-aos-delay="300"
              className="font-bold text-3xl"
            >
              Du lịch Việt Nam  
            </p>
          </div>
          <SearchComp onSearch={handleSearch} />
        </div>
      </div>
    </div>
  );
};

export default Hero;