import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PlaceCard from "./PlaceCard";
import tourService from "../../apis/tourService";

const HotPlace = () => {
  const [placesData, setPlacesData] = useState([]);
  const page = 1;
  const pageSize = 6;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await tourService.getHotTour({ page: page, pageSize: pageSize });
        if (response.status === 200) {
          const { data } = response.data;

          setPlacesData(data);
        }
      } catch (error) {
        console.error("Failed to fetch tours:", error);
      }
    };

    fetchTours();
  }, [page]);

  const handlePlaceClick = (id) => {
    navigate(`/tour/${id}`);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
      <section data-aos="fade-up" className="container ">
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
          Những địa điểm được book nhiều nhất
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
        <div className="flex justify-center mt-8 mb-8">
          <Link to={"/best-places"} className="text-base text-gray-600 hover:text-gray-400">
              Xem tất cả các địa điểm...
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HotPlace;