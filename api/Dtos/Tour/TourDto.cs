namespace TravelWeb.Dtos.Tour
{
    public class TourDto
    {
        public class TourSearchRequest
        {
            public int Page { get; set; }
            public int PageSize { get; set; }
            public decimal? MinPrice { get; set; }
            public decimal? MaxPrice { get; set; }
            public Boolean? PriceEsc { get; set; }
            public Boolean? PriceDesc { get; set; }
        }

        public class GetTourRequest
        {
            public int Page { get; set; }
            public int PageSize { get; set; }
        }
        public class TourResponse
        {
            public int Id { get; set; }
            public string Destination { get; set; }
            public string Country { get; set; }
            public string? Description { get; set; }
            public int? TotalSlot { get; set; }
            public string? MainImage { get; set; }
            public decimal Price { get; set; }
            public string? TimeLine { get; set; }
            public decimal? Rate { get; set; }
            public int Total { get; set; }
            public int TotalPage { get; set; }

        }
        public class InsertTourRequest
        {
            public string Destination { get; set; }
            public string Country { get; set; }
            public string? Description { get; set; }
            public int? TotalSlot { get; set; }
            public decimal Price { get; set; }
            public decimal Rate { get; set; }
            public string? TimeLine { get; set; }
            public List<IFormFile> Images { get; set; } 
        }
    }
}
