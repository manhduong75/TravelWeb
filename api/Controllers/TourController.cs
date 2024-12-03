using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelWeb.Data;
using TravelWeb.Dtos.Tour;
using TravelWeb.Extensions;
using TravelWeb.Models;
using System.Linq;
using TravelWeb.Data;
using TravelWeb.Extensions;
using TravelWeb;

namespace TravelWeb.Controllers
{
    [Route("api")]
    [ApiController]
    public class TourController : ControllerBase
    {
        private readonly ApplicationDBContext _context;
        private BaseResponse<object> _res;

        public TourController(ApplicationDBContext context)
        {
            _context = context;
            _res = new BaseResponse<object>();
        }

        [HttpPost("RTO01")]
        public IActionResult GetAll([FromBody] TourDto.GetTourRequest request)
        {
            try
            {
                var tours = _context.Tours
                    .Select(t => new
                    {
                        id = t.Id,
                        destination = t.Destination,
                        country = t.Country,
                        description = t.Description,
                        totalSlot = t.TotalSlot,
                        mainImage = $"{Request.Scheme}://{Request.Host}/images/" + _context.Images.Where(i => i.Id == t.Id && i.IsMainImage == true).Select(i => i.ImageUrl).FirstOrDefault(),
                        price = t.Price,
                        timeLine = t.TimeLine,
                        rate = t.Rate,
                        total = _context.Tours.Count(),
                        totalPage = (int)Math.Ceiling((double)_context.Tours.Count() / request.PageSize)
                    })
                    .Skip((request.Page - 1) * request.PageSize)
                    .Take(request.PageSize)
                    .ToList();

                _res.Status = StatusCodes.Status200OK.ToString();
                _res.Data = tours;
                return Ok(_res);
            }
            catch (System.Exception ex)
            {
                _res.Status = StatusCodes.Status500InternalServerError.ToString();
                _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, ex.Message, string.Empty));
                return StatusCode(500, _res);
            }
        }

        [HttpGet("RTO01/{id}")]
        public IActionResult GetById([FromRoute] int id)
        {
            try
            {
                var tour = _context.Tours.Where(t => t.Id == id).Select(t => new
                {
                    id = t.Id,
                    destination = t.Destination,
                    country = t.Country,
                    description = t.Description,
                    totalSlot = t.TotalSlot,
                    mainImage = $"{Request.Scheme}://{Request.Host}/images/" + _context.Images.Where(i => i.Id == t.Id && i.IsMainImage == true).Select(i => i.ImageUrl).FirstOrDefault(),
                    price = t.Price,
                    timeLine = t.TimeLine,  
                    rate = t.Rate,
                    total = _context.Tours.Count(),
                    totalPage = (int)Math.Ceiling((double)_context.Tours.Count() / 1) 
                }).FirstOrDefault();
                if (tour == null)
                {
                    _res.Status = StatusCodes.Status404NotFound.ToString();
                    return NotFound(_res);
                }

                _res.Status = StatusCodes.Status200OK.ToString();
                _res.Data = tour;
                return Ok(_res);
            }
            catch (System.Exception ex)
            {
                _res.Status = StatusCodes.Status500InternalServerError.ToString();
                _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, ex.Message, string.Empty));
                return StatusCode(500, _res);
            }
        }

        [HttpPost("RTO02")]
        public IActionResult SearchTours([FromBody] TourDto.TourSearchRequest searchRequest)
        {
            try
            {
                var query = _context.Tours.AsQueryable();

                if (searchRequest.MinPrice.HasValue)
                {
                    query = query.Where(t => t.Price >= searchRequest.MinPrice.Value);
                }

                if (searchRequest.MaxPrice.HasValue)
                {
                    query = query.Where(t => t.Price <= searchRequest.MaxPrice.Value);
                }

                if (searchRequest.PriceEsc.HasValue && searchRequest.PriceEsc.Value)
                {
                    query = query.OrderBy(t => t.Price);
                }

                if (searchRequest.PriceDesc.HasValue && searchRequest.PriceDesc.Value)
                {
                    query = query.OrderByDescending(t => t.Price);
                }

                var totalItems = query.Count();
                var totalPages = (int)Math.Ceiling(totalItems / (double)searchRequest.PageSize);

                var tours = query
                    .Select(t => new TourDto.TourResponse
                    {
                        Id = t.Id,
                        Destination = t.Destination,
                        Country = t.Country,
                        Description = t.Description,
                        TotalSlot = t.TotalSlot,
                        MainImage = $"{Request.Scheme}://{Request.Host}/images/" + _context.Images.Where(i => i.Id == t.Id && i.IsMainImage == true).Select(i => i.ImageUrl).FirstOrDefault(),
                        Price = t.Price,
                        Rate = t.Rate,
                        TimeLine = t.TimeLine,
                        Total = totalItems,
                        TotalPage = totalPages
                    })
                    .Skip((searchRequest.Page - 1) * searchRequest.PageSize)
                    .Take(searchRequest.PageSize)
                    .ToList();

                _res.Status = StatusCodes.Status200OK.ToString();
                _res.Data = tours;
                return Ok(_res);
            }
            catch (System.Exception ex)
            {
                _res.Status = StatusCodes.Status500InternalServerError.ToString();
                _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, ex.Message, string.Empty));
                return StatusCode(500, _res);
            }
        }
        [HttpPost("ITO01")]
        [Authorize]
        public async Task<IActionResult> InsertTourWithImages([FromForm] TourDto.InsertTourRequest request)
        {
            try
            {
                if (!User.Identity.IsAuthenticated)
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "User is not authenticated.", string.Empty));
                    return Unauthorized(_res);
                }
                if (request.Images == null || request.Images.Count == 0)
                {
                    _res.Status = StatusCodes.Status400BadRequest.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "No images uploaded.", string.Empty));
                    return BadRequest(_res);
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

                var RoleID = await _context.UserRoles.FirstOrDefaultAsync(u => u.UserId == user.Id);
                var Role = await _context.Roles.FirstOrDefaultAsync(r => r.Id == RoleID.RoleId);
                if (Role == null)
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "Role not found.", string.Empty));
                    return Unauthorized(_res);
                }
                if (Role.Name != "Admin")
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, "User is not Admin.", string.Empty));
                    return Unauthorized(_res);
                }

                var tour = new Models.Tour
                {
                    Destination = request.Destination,
                    Country = request.Country,
                    Description = request.Description,
                    Price = request.Price,
                    TimeLine = request.TimeLine,
                    TotalSlot = request.TotalSlot,
                    Rate = request.Rate,
                    CreatedAt = DateTime.Now,
                };

                _context.Tours.Add(tour);
                await _context.SaveChangesAsync();

                var imageUrls = new List<string>();
                var images = new List<Image>();

                var imagesFolderPath = Path.Combine(Directory.GetCurrentDirectory(), "Images");

                if (!Directory.Exists(imagesFolderPath))
                {
                    Directory.CreateDirectory(imagesFolderPath);
                }

                for (int i = 0; i < request.Images.Count; i++)
                {
                    var image = request.Images[i];
                    var fileName = Guid.NewGuid().ToString() + Path.GetExtension(image.FileName);
                    var filePath = Path.Combine(imagesFolderPath, fileName);

                    using (var stream = new FileStream(filePath, FileMode.Create))
                    {
                        await image.CopyToAsync(stream);
                    }

                    var imageUrl = $"{Request.Scheme}://{Request.Host}/images/{fileName}";
                    imageUrls.Add(imageUrl);

                    images.Add(new Image
                    {
                        TourId = tour.Id,
                        ImageUrl = fileName, 
                        IsMainImage = i == 0
                    });
                }

                _context.Images.AddRange(images);
                await _context.SaveChangesAsync();

                _res.Status = StatusCodes.Status200OK.ToString();
                _res.Data = new { Tour = tour, ImageUrls = imageUrls };
                return Ok(_res);
            }
            catch (System.Exception ex)
            {
                _res.Status = StatusCodes.Status500InternalServerError.ToString();
                _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, ex.Message, string.Empty));
                return StatusCode(500, _res);
            }
        }

    }
}
