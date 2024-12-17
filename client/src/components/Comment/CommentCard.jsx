import React from "react";
import PropTypes from "prop-types";
import avatar from "../../assets/avt-about-us.png";
import { FaStar } from "react-icons/fa";
import { convertDate } from "../../mixin";

const CommentCard = ({ 
  userName, 
  rate, 
  reviewText,
  reviewDate,
  img = avatar 
}) => {
  return (
    <div className="flex items-start p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
      <div className="mr-6">
        <img 
          src={img} 
          alt={`${userName}'s avatar`} 
          className="w-16 h-16 rounded-full object-cover border-2 border-primary shadow-md"
        />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h3 className="font-bold text-gray-800 text-lg">{userName}</h3>
            <p className="text-gray-400 text-sm">
              {convertDate(reviewDate)}
            </p>
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, index) => (
              <FaStar 
                key={index}
                className={`w-5 h-5 ${
                  index < Math.floor(rate) 
                    ? 'text-yellow-400' 
                    : 'text-gray-200'
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-gray-600">({rate})</span>
          </div>
        </div>
        <p className="text-gray-600 leading-relaxed">{reviewText}</p>
      </div>
    </div>
  );
};

CommentCard.propTypes = {
  id: PropTypes.number,
  userName: PropTypes.string.isRequired,
  rate: PropTypes.number.isRequired,
  reviewText: PropTypes.string.isRequired,
  reviewDate: PropTypes.string.isRequired,
  img: PropTypes.string
};

export default CommentCard;