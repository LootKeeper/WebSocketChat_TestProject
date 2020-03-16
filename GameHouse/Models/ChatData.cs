using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameHouse.Models
{
    public class ChatData
    {       
        public List<Message> Messages { get; set; }
        public ChatData() {
            Messages = new List<Message>();
        }
        public ChatData(List<Message> messages)
        {
            Messages = new List<Message>(messages);
        }

        public void Add(Message message)
        {
            Messages.Add(message);
        }
    }
}
