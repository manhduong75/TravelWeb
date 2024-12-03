using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelWeb.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }
        public string? UserId { get; set; }
        public string? Orderer { get; set; }
        public int? TourId { get; set; }
        public string? PhoneNumber { get; set; }
        public DateTime? BookingDate { get; set; }
        public int NumberOfTravelers { get; set; }
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalPrice { get; set; }
        public string? PaymentStatus { get; set; }
    }
}
