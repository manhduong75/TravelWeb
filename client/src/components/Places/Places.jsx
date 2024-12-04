import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlaceCard from "./PlaceCard";
import tourService from "../../apis/tourService";

const Places = () => {
  const [placesData, setPlacesData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await tourService.getTour({ page: 1, pageSize: 10 });
        if (response.status === 200) {
          setPlacesData(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      }
    };

    fetchTours();
  }, []);

  const handlePlaceClick = (id) => {
    navigate(`/tour/${id}`);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
      <section data-aos="fade-up" className="container ">
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
          Địa điểm nổi tiếng
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {placesData.map((item, index) => (
            <PlaceCard
              key={index}
              img={item.mainImage}
              title={item.destination}
              location={item.country}
              description={item.description}
              price={item.price}
              type="Du lịch nghỉ dưỡng"
              onClick={() => handlePlaceClick(item.id)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Places;