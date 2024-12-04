import React from "react";
import BlogsComp from "../components/Blogs/BlogsComp";
import Location from "../components/Location/Location";

const About = () => {
  return (
    <>
      <div className="container pt-14">
        <div className="py-10">
          <h1 className=" my-8 border-l-8 border-primary/50 py-2 pl-2 text-3xl font-bold">
            Về chúng tôi
          </h1>
          <p>
          Chúng tôi là những người say mê du lịch, với sứ mệnh kết nối những tâm hồn yêu khám phá và mang đến những trải nghiệm du lịch đáng nhớ. Được thành lập từ năm 2010, chúng tôi đã đồng hành cùng hàng ngàn du khách khám phá những điểm đến tuyệt vời trên khắp Việt Nam. Đội ngũ của chúng tôi gồm những chuyên gia du lịch dày dặn kinh nghiệm, những người am hiểu từng điểm đến, văn hóa, và những trải nghiệm độc đáo. Chúng tôi không chỉ đơn thuần là một công ty du lịch, mà còn là những người bạn đồng hành, giúp bạn biến những giấc mơ du lịch thành hiện thực.
          </p>
          <br />
          <p>
          Chúng tôi tự hào mang đến các tour du lịch được thiết kế một cách kỹ lưỡng, linh hoạt và phù hợp với mọi nhu cầu. Từ những chuyến đi phiêu lưu mạo hiểm, những tour khám phá văn hóa, cho đến những kỳ nghỉ thư giãn sang trọng - chúng tôi luôn có lộ trình phù hợp với từng cá nhân.
          </p>
        </div>
      </div>
      <Location />
      <BlogsComp />
    </>
  );
};

export default About;
