using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameHouse.Models
{
    public class Message
    {
        public User User { get; set; }
        public string Text { get; set; }

        public Message() { }
        public Message(User user, string msg)
        {
            User = user;
            Text = msg;
        }
    }
}
