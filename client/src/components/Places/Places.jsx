import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PlaceCard from "./PlaceCard";
import tourService from "../../apis/tourService";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { SearchComp } from "../Hero/SearchComp";
import { useLocation } from 'react-router-dom';

const Places = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);

  const [placesData, setPlacesData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 6;

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const request = {
          page: page,
          pageSize: pageSize,
          destination: queryParams.get('destination') || "",
          minPrice: 0,
          maxPrice: parseInt(queryParams.get('maxPrice')) || 5000000,
        };
        const response = await tourService.searchTour(request);
        if (response.status === 200) {
          const { data } = response.data;

          setPlacesData(data);
          setTotalPages(data[0]?.totalPage || 1);
        }
      } catch (error) {
        console.error("Failed to fetch tours:", error);
        setTotalPages(1);
      }
    };

    fetchTours();
  }, [page, location.search]);

  const handlePlaceClick = (id) => {
    navigate(`/tour/${id}`);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    window.scrollTo(0, 0);
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
      <section data-aos="fade-up" className="container ">
        <div className="mt-8">
          <SearchComp />
        </div>
        <h1 className="my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
          Địa điểm nổi tiếng
        </h1>

        {placesData && placesData.length > 0 ? (
          <>
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
              <Stack spacing={2}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                  size="large"
                  showFirstButton
                  showLastButton
                />
              </Stack>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Không tìm thấy địa điểm nào phù hợp
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Places;
