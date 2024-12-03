using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelWeb.Dtos.Account;
using TravelWeb.Interfaces;
using TravelWeb.Models;

namespace TravelWeb.Controllers
{
    [Route("api/account")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly ITokenService _tokenService;
        private readonly SignInManager<AppUser> _signinManager;
        private BaseResponse<NewUserDto> _res;

        public AccountController(UserManager<AppUser> userManager, ITokenService tokenService, SignInManager<AppUser> signInManager)
        {
            _userManager = userManager;
            _tokenService = tokenService;
            _signinManager = signInManager;
            _res = new BaseResponse<NewUserDto>();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto loginDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _res.Status = StatusCodes.Status400BadRequest.ToString();
                    return BadRequest(_res);
                }

                var user = await _userManager.Users.FirstOrDefaultAsync(x => x.UserName == loginDto.Username.ToLower());

                if (user == null)
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(new Message { MessageText = "Tên đăng nhập không hợp lệ!" });
                    return Unauthorized(_res);
                }

                var result = await _signinManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

                if (!result.Succeeded)
                {
                    _res.Status = StatusCodes.Status401Unauthorized.ToString();
                    _res.Messages.Add(new Message { MessageText = "Tên đăng nhập hoặc mật khẩu không chính xác!" });
                    return Unauthorized(_res);
                }

                var roles = await _userManager.GetRolesAsync(user);

                _res.Status = StatusCodes.Status200OK.ToString();
                _res.Data = new NewUserDto
                {
                    UserName = user.UserName,
                    Email = user.Email,
                    Token = _tokenService.CreateToken(user),
                    Roles = roles
                };
                return Ok(_res);
            }
            catch (PharmacyException ex0)
            {
                _res.Status = StatusCodes.Status400BadRequest.ToString();
                _res.Messages = ex0.Messages;
                return BadRequest(_res);
            }
            catch (System.Exception ex)
            {
                _res.Status = StatusCodes.Status500InternalServerError.ToString();
                _res.Messages.Add(Message.CreateErrorMessage("API_CODE", _res.Status, ex.Message, string.Empty));
                return StatusCode(500, _res);
            }
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    _res.Status = StatusCodes.Status400BadRequest.ToString();
                    return BadRequest(_res);
                }

                var appUser = new AppUser
                {
                    UserName = registerDto.Username,
                    Email = registerDto.Email
                };

                var createdUser = await _userManager.CreateAsync(appUser, registerDto.Password);

                if (createdUser.Succeeded)
                {
                    var role = string.IsNullOrEmpty(registerDto.Role) ? "User" : registerDto.Role;
                    var roleResult = await _userManager.AddToRoleAsync(appUser, role);
                    if (roleResult.Succeeded)
                    {
                        var roles = await _userManager.GetRolesAsync(appUser);

                        _res.Status = StatusCodes.Status200OK.ToString();
                        _res.Data = new NewUserDto
                        {
                            UserName = appUser.UserName,
                            Email = appUser.Email,
                            Token = _tokenService.CreateToken(appUser),
                            Roles = roles
                        };
                        return Ok(_res);
                    }
                    else
                    {
                        _res.Status = StatusCodes.Status500InternalServerError.ToString();
                        _res.Messages.AddRange(roleResult.Errors.Select(e => new Message { MessageText = e.Description }));
                        return StatusCode(500, _res);
                    }
                }
                else
                {
                    _res.Status = StatusCodes.Status500InternalServerError.ToString();
                    _res.Messages.AddRange(createdUser.Errors.Select(e => new Message { MessageText = e.Description }));
                    return StatusCode(500, _res);
                }
            }
            catch (PharmacyException ex0)
            {
                _res.Status = StatusCodes.Status400BadRequest.ToString();
                _res.Messages = ex0.Messages;
                return BadRequest(_res);
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
