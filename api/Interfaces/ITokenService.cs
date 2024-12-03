using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TravelWeb.Models;

namespace TravelWeb.Interfaces
{
    public interface ITokenService
    {
        string CreateToken(AppUser user);
    }
}