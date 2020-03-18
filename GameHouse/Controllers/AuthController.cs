using GameHouse.Security;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace GameHouse.Controllers
{
    [Route("api/auth")]
    public class AuthController
    {
        [HttpGet("login")]
        public IActionResult Login(string userName)
        {
            var identity = GetIdentity(userName);
            var token = GetToken(identity);            

            var response = new
            {
                token = token,
                userId = identity.Claims.First(claim => claim.Type == "id").Value,
                userName = identity.Name
            };

            return new JsonResult(response);
        }

        private string GetToken(ClaimsIdentity identity)
        {
            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                issuer: OAuthOptions.ISSUER,
                audience: OAuthOptions.AUDIENCE,
                claims: identity.Claims,
                notBefore: now,
                expires: now.Add(TimeSpan.FromMinutes(OAuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(OAuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));

            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        private ClaimsIdentity GetIdentity(string userName)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, userName),
                new Claim("id", userName.GetHashCode().ToString())
            };

            var claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            return claimsIdentity;
        }
    }
}
