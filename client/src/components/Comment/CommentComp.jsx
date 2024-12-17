import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getReview } from "../../apis/reviewService";
import CommentCard from "./CommentCard";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const CommentComp = ({ tourId, refresh }) => {
  const [reviews, setReviews] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 3;

  useEffect(() => {
    fetchReviews();
  }, [tourId, page, refresh]);

  const fetchReviews = async () => {
    try {
      const response = await getReview({
        tourId: tourId,
        page: page,
        pageSize: pageSize
      });

      if (response?.status === 200) {
        const { reviews, total } = response.data.data;
        setReviews(reviews);
        setTotalPages(Math.ceil(total / pageSize));
        console.log("totalpage", totalPages);
      }
    } catch (error) {
      console.error("Failed to fetch reviews:", error);
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold mb-6">Đánh giá từ khách hàng</h2>
      
      <div className="space-y-4">
        {reviews.map((review) => (
          <CommentCard
            key={review.id}
            id={review.id}
            userName={review.userName}
            rate={review.rate}
            reviewText={review.reviewText}
            reviewDate={review.reviewDate}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
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
      )}
    </div>
  );
};

CommentComp.propTypes = {
    tourId: PropTypes.number.isRequired,
    refresh: PropTypes.bool
};

export default CommentComp;