using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace GameHouse.Security
{
    public class OAuthOptions
    {
        public const string ISSUER = "chat";
        public const string AUDIENCE = "ngChatClient";
        const string KEY = "Awjaefjiawd0123mvawdp";
        public const int LIFETIME = 60;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
