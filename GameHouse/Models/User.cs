﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameHouse.Models
{
    public class User
    {
        public int UserId { get; set; }
        public string UserName { get; set; }

        public User() { }
        public User(int id, string name)
        {
            UserId = id;
            UserName = name;
        }
    }
}
