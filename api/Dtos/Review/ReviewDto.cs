namespace TravelWeb.Dtos.Review
{
    public class ReviewDto
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public string? UserName { get; set; }
        public int? TourId { get; set; }
        public decimal? Rate { get; set; }
        public string? ReviewText { get; set; }
        public DateTime? ReviewDate { get; set; }
    }

    public class CreateReviewDto
    {
        public int? TourId { get; set; }
        public decimal? Rate { get; set; }
        public string? ReviewText { get; set; }
    }

    public class ReviewListDto
    {
        public List<ReviewDto> Reviews { get; set; }
        public int Total { get; set; }
    }

    public class RequestGetReviewDto
    {
        public int TourId { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
