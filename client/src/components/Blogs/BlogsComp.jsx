import React from "react";
import BlogCard from "./BlogCard";
import Img1 from "../../assets/places/tajmahal.jpg";
import Img2 from "../../assets/places/water.jpg";
import Img3 from "../../assets/places/boat.jpg";

const BlogsData = [
  {
    id: 1,
    image: Img1,
    title: "Những địa điểm nổi tiếng ở Hà Nội",
    description:
      "Hà Nội, thủ đô của Việt Nam, nổi tiếng với kiến trúc cổ kính và nền văn hóa phong phú với ảnh hưởng từ Đông Nam Á, Trung Quốc và Pháp. Tại trung tâm là khu phố cổ hỗn loạn, nơi các con phố hẹp được sắp xếp theo ngành nghề. Có nhiều ngôi đền nhỏ, bao gồm Bạch Mã, tôn vinh một con ngựa huyền thoại, cùng với chợ Đồng Xuân, bán hàng gia dụng và đồ ăn đường phố.",
    author: "AD",
    date: "19/5/2024",
  },
  {
    id: 2,
    image: Img2,
    title: "Những địa điểm nổi tiếng ở TP. Hồ Chí Minh",
    description:
      "TP. Hồ Chí Minh, còn được biết đến với tên gọi Sài Gòn, là thành phố lớn nhất Việt Nam. Thành phố này nổi tiếng với các công trình kiến trúc thuộc địa Pháp, bao gồm Nhà thờ Đức Bà, được làm hoàn toàn từ vật liệu nhập khẩu từ Pháp, và Bưu điện Trung tâm thế kỷ 19. Các quầy hàng ăn uống xếp hàng trên các con phố của thành phố, đặc biệt là xung quanh chợ Bến Thành nhộn nhịp.",
    author: "AD",
    date: "19/5/2024",
  },
  {
    id: 3,
    image: Img3,
    title: "Những địa điểm nổi tiếng ở Vịnh Hạ Long",
    description:
      "Vịnh Hạ Long, ở phía đông bắc Việt Nam, nổi tiếng với làn nước màu ngọc lục bảo và hàng ngàn hòn đảo đá vôi cao chót vót được phủ rừng nhiệt đới. Các tour du thuyền và thám hiểm bằng thuyền kayak đưa du khách qua các hòn đảo có hình dạng đặc biệt, bao gồm hòn Chó Đá và hòn Ấm Trà. Khu vực này nổi tiếng với lặn biển, leo núi và đi bộ đường dài, đặc biệt là trong Vườn quốc gia Cát Bà.",
    author: "AD",
    date: "19/5/2024",
  },
];

const BlogsComp = () => {
  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white py-10">
        <section data-aos="fade-up" className="container ">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Bài viết mới nhất
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {BlogsData.map((item) => (
              <BlogCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogsComp;
