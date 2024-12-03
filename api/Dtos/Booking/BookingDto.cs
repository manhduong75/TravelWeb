namespace TravelWeb.Dtos.Booking
{
    public class BookingDto
    {
        public int Id { get; set; }
        public string? UserId { get; set; }
        public string? Orderer { get; set; }
        public int? TourId { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime? BookingDate { get; set; }
        public int NumberOfTravelers { get; set; }
        public decimal TotalPrice { get; set; }
        public string? PaymentStatus { get; set; }
    }

    public class BookingRequestDto
    {
        public string? Orderer { get; set; }
        public int? TourId { get; set; }
        public string? PhoneNumber { get; set; }
        public int NumberOfTravelers { get; set; }
        public string? PaymentStatus { get; set; }
    }

    public class BookingListDto
    {
        public List<BookingDto> Bookings { get; set; }
        public int Total { get; set; }
    }
    public class RequestGetBookingDto
    {
        public int Page { get; set; }
        public int PageSize { get; set; }
    }
    public class UpdatePaymentStatusDto
    {
        public string PaymentStatus { get; set; }
    }
}
