import React from "react";
import PlaceCard from "./PlaceCard";
import Img1 from "../../assets/places/caobang.jpg";
import Img2 from "../../assets/places/hoian.jpg";
import Img3 from "../../assets/places/danang.jpg";
import Img4 from "../../assets/places/halong.jpg";
import Img5 from "../../assets/places/canhdong.jpg";
import Img6 from "../../assets/places/ninhbinh.jpg";

const PlacesData = [
  {
    img: Img1,
    title: "Cao Bằng",
    location: "Việt Nam",
    description:
      "Cao Bằng là một trong những điểm đến du lịch hấp dẫn nhất Việt Nam.",
    price: 6700,
    type: "Du lịch nghỉ dưỡng",
  },
  {
    img: Img2,
    title: "Hội An",
    location: "Việt Nam",
    description:
      "Địa điểm du lịch ở Hội An không chỉ nổi tiếng với những công trình kiến trúc cổ kính mà còn là những bãi biển đẹp.",
    price: 6700,
    type: "Du lịch nghỉ dưỡng",
  },
  {
    img: Img3,
    title: "Đà Nẵng",
    location: "Việt Nam",
    description:
      "Đà Nẵng là một trong những điểm đến du lịch hấp dẫn nhất Việt Nam với những bãi biển đẹp, những địa điểm du lịch nổi tiếng.",
    price: 6200,
    type: "Du lịch nghỉ dưỡng",
  },
  {
    img: Img4,
    title: "Hạ Long",
    location: "Việt Nam",
    description:
      "Hạ Long là một trong những điểm đến du lịch hấp dẫn nhất Việt Nam.",
    price: 6700,
    type: "Du lịch nghỉ dưỡng",
  },
  {
    img: Img5,
    title: "Hà Giang",
    location: "Việt Nam",
    description:
      "Hà Giang là một trong những điểm đến du lịch hấp dẫn nhất Việt Nam với những cảnh đẹp thiên nhiên hùng vĩ.",
    price: 6700,
    type: "Du lịch nghỉ dưỡng",
  },
  {
    img: Img6,
    title: "Ninh Bình",
    location: "Việt Nam",
    description:
      "Ninh Bình là một trong những điểm đến du lịch hấp dẫn nhất Việt Nam với những cảnh đẹp thiên nhiên hùng vĩ.",
    price: 6200,
    type: "Du lịch nghỉ dưỡng",
  },
];

const Places = ({ handleOrderPopup }) => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white bg-gray-50 py-10">
        <section data-aos="fade-up" className="container ">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Địa điểm nổi tiếng
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {PlacesData.map((item, index) => (
              <PlaceCard
                handleOrderPopup={handleOrderPopup}
                key={index}
                {...item}
              />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Places;
