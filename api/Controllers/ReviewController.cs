using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelWeb.Data;
using TravelWeb.Dtos.Review;
using TravelWeb.Extensions;
using TravelWeb.Models;

namespace TravelWeb.Controllers
{
    [Route("api")]
    [ApiController]
    public class ReviewController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private BaseResponse<object> _res;

        public ReviewController(ApplicationDBContext context)
        {
            _context = context;
            _res = new BaseResponse<object>();
        }

        [HttpPost("RRV01")]
        public async Task<IActionResult> GetReviews([FromBody] RequestGetReviewDto request)
        {
            try
            {
                var reviews = await _context.Reviews.Where(r => r.TourId == request.TourId).ToListAsync();
                var pagedReviews = reviews.Skip((request.Page - 1) * request.PageSize).Take(request.PageSize).ToList();
                var response = new ReviewListDto
                {
                    Reviews = pagedReviews.Select(r => new ReviewDto
                    {
                        Id = r.Id,
                        UserId = r.UserId,
                        UserName = _context.Users.FirstOrDefault(u => u.Id == r.UserId)?.UserName,
                        TourId = r.TourId,
                        Rate = r.Rate,
                        ReviewText = r.ReviewText,
                        ReviewDate = r.ReviewDate
                    }).ToList(),
                    Total = reviews.Count
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

        [HttpPost("IRV01")]
        [Authorize]
        public async Task<IActionResult> CreateReview([FromBody] CreateReviewDto request)
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

                var newReview = new Review
                {
                    UserId = user.Id,
                    TourId = request.TourId,
                    Rate = request.Rate,
                    ReviewText = request.ReviewText,
                    ReviewDate = DateTime.Now
                };

                _context.Reviews.Add(newReview);
                await _context.SaveChangesAsync();

                _res.Status = StatusCodes.Status200OK.ToString();
                _res.Data = newReview;
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
