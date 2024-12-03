using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TravelWeb.Models
{
    public class Image
    {
        public int Id { get; set; }
        public int? TourId { get; set; }
        public string? ImageUrl { get; set; }
        public Boolean? IsMainImage { get; set; }

    }
}
