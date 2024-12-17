import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { insertReview } from '../../apis/reviewService';
import { useContext } from 'react';
import { ToastContext } from '../../contexts/ToastProvider';

const AddComment = ({ tourId, onCommentAdded }) => {
  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(null);
  const [reviewText, setReviewText] = useState('');
  const { toast } = useContext(ToastContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!reviewText.trim()) {
      toast.error('Vui lòng nhập nội dung đánh giá');
      return;
    }

    try {
      const response = await insertReview({
        tourId: tourId,
        rate: rating,
        reviewText: reviewText.trim()
      });

      if (response.status === 200) {
        toast.success('Thêm đánh giá thành công!');
        setReviewText('');
        setRating(5);
        if (onCommentAdded) onCommentAdded();
      }
    } catch (error) {
      console.error('Failed to add review:', error);
      toast.error('Không thể thêm đánh giá');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4">Thêm đánh giá của bạn</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, index) => {
            const ratingValue = index + 1;
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="rating"
                  className="hidden"
                  value={ratingValue}
                  onClick={() => setRating(ratingValue)}
                />
                <FaStar
                  className="cursor-pointer transition-colors"
                  color={ratingValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                  size={24}
                  onMouseEnter={() => setHover(ratingValue)}
                  onMouseLeave={() => setHover(null)}
                />
              </label>
            );
          })}
        </div>

        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Chia sẻ trải nghiệm của bạn..."
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          rows="4"
          required
        />

        <button
          type="submit"
          className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
        >
          Gửi đánh giá
        </button>
      </form>
    </div>
  );
};

export default AddComment;