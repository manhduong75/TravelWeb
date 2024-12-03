using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelWeb.Data;
using TravelWeb.Dtos.Booking;
using TravelWeb.Extensions;
using TravelWeb.Models;

namespace TravelWeb.Controllers
{
    [Route("api")]
    [ApiController]
    public class BookingController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private BaseResponse<object> _res;

        public BookingController(ApplicationDBContext context)
        {
            _context = context;
            _res = new BaseResponse<object>();
        }

        [HttpPost("IBK01")]
        [Authorize]
        public async Task<IActionResult> CreateBooking([FromBody] BookingRequestDto request)
        {
            try
            {
                if (!User.Identity.IsAuthenticated)
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "User is not authenticated.", string.Empty));
                    return Unauthorized(_res);
                }

                var givenName = User.GetUsername();
                if (string.IsNullOrEmpty(givenName))
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "Given name not found.", string.Empty));
                    return Unauthorized(_res);
                }

                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == givenName);
                if (user == null)
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "User not found.", string.Empty));
                    return Unauthorized(_res);
                }

                var tour = await _context.Tours.FirstOrDefaultAsync(t => t.Id == request.TourId);
                if (tour == null)
                {
                    _res.Status = StatusCodes.Status404NotFound.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "Tour not found.", string.Empty));
                    return NotFound(_res);
                }

                var totalPrice = tour.Price * request.NumberOfTravelers;

                var newBooking = new Booking
                {
                    UserId = user.Id,
                    Orderer = request.Orderer,
                    TourId = request.TourId,
                    PhoneNumber = request.PhoneNumber,
                    BookingDate = DateTime.Now,
                    NumberOfTravelers = request.NumberOfTravelers,
                    TotalPrice = totalPrice,
                    PaymentStatus = request.PaymentStatus
                };

                _context.Bookings.Add(newBooking);
                await _context.SaveChangesAsync();

                _res.Status = StatusCodes.Status200OK.ToString();
                _res.Data = newBooking;
                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.Status = StatusCodes.Status500InternalServerError.ToString();
                _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, ex.Message, string.Empty));
                return StatusCode(500, _res);
            }
        }


        [HttpPost("RBK01")]
        [Authorize]
        public async Task<IActionResult> GetBookings([FromBody] RequestGetBookingDto request)
        {
            try
            {
                if (!User.Identity.IsAuthenticated)
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "User is not authenticated.", string.Empty));
                    return Unauthorized(_res);
                }

                var givenName = User.GetUsername();
                if (string.IsNullOrEmpty(givenName))
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "Given name not found.", string.Empty));
                    return Unauthorized(_res);
                }

                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == givenName);
                if (user == null)
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "User not found.", string.Empty));
                    return Unauthorized(_res);
                }

                var userBookings = await _context.Bookings.Where(b => b.UserId == user.Id).ToListAsync();
                var pagedBookings = userBookings.Skip((request.Page - 1) * request.PageSize).Take(request.PageSize).ToList();
                var response = new BookingListDto
                {
                    Bookings = pagedBookings.Select(b => new BookingDto
                    {
                        Id = b.Id,
                        UserId = b.UserId,
                        Orderer = b.Orderer,
                        TourId = b.TourId,
                        PhoneNumber = b.PhoneNumber,
                        BookingDate = b.BookingDate,
                        NumberOfTravelers = b.NumberOfTravelers,
                        TotalPrice = b.TotalPrice,
                        PaymentStatus = b.PaymentStatus
                    }).ToList(),
                    Total = userBookings.Count
                };

                _res.Status = StatusCodes.Status200OK.ToString();
                _res.Data = response;
                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.Status = StatusCodes.Status500InternalServerError.ToString();
                _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, ex.Message, string.Empty));
                return StatusCode(500, _res);
            }
        }

        [HttpGet("RBK01/{id}")]
        [Authorize]
        public async Task<IActionResult> GetBookingDetails(int id)
        {
            try
            {
                if (!User.Identity.IsAuthenticated)
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "User is not authenticated.", string.Empty));
                    return Unauthorized(_res);
                }

                var givenName = User.GetUsername();
                if (string.IsNullOrEmpty(givenName))
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "Given name not found.", string.Empty));
                    return Unauthorized(_res);
                }

                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == givenName);
                if (user == null)
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "User not found.", string.Empty));
                    return Unauthorized(_res);
                }

                var booking = await _context.Bookings.FindAsync(id);
                if (booking == null || booking.UserId != user.Id)
                {
                    _res.Status = StatusCodes.Status404NotFound.ToString();
                    return NotFound(_res);
                }

                var bookingDto = new BookingDto
                {
                    Id = booking.Id,
                    UserId = booking.UserId,
                    Orderer = booking.Orderer,
                    TourId = booking.TourId,
                    PhoneNumber = booking.PhoneNumber,
                    BookingDate = booking.BookingDate,
                    NumberOfTravelers = booking.NumberOfTravelers,
                    TotalPrice = booking.TotalPrice,
                    PaymentStatus = booking.PaymentStatus
                };

                _res.Status = StatusCodes.Status200OK.ToString();
                _res.Data = bookingDto;
                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.Status = StatusCodes.Status500InternalServerError.ToString();
                _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, ex.Message, string.Empty));
                return StatusCode(500, _res);
            }
        }
        [HttpPut("UBK01/{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePaymentStatus(int id, [FromBody] UpdatePaymentStatusDto request)
        {
            try
            {
                if (!User.Identity.IsAuthenticated)
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "User is not authenticated.", string.Empty));
                    return Unauthorized(_res);
                }

                var givenName = User.GetUsername();
                if (string.IsNullOrEmpty(givenName))
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "Given name not found.", string.Empty));
                    return Unauthorized(_res);
                }

                var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == givenName);
                if (user == null)
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "User not found.", string.Empty));
                    return Unauthorized(_res);
                }

                var booking = await _context.Bookings.FindAsync(id);
                if (booking == null || booking.UserId != user.Id)
                {
                    _res.Status = StatusCodes.Status404NotFound.ToString();
                    return NotFound(_res);
                }

                booking.PaymentStatus = request.PaymentStatus;
                _context.Bookings.Update(booking);
                await _context.SaveChangesAsync();

                _res.Status = StatusCodes.Status200OK.ToString();
                _res.Data = booking;
                return Ok(_res);
            }
            catch (Exception ex)
            {
                _res.Status = StatusCodes.Status500InternalServerError.ToString();
                _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, ex.Message, string.Empty));
                return StatusCode(500, _res);
            }
        }

    }
}
