using GameHouse.Hubs;
using GameHouse.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameHouse.Controllers
{
    [Route("api/chat")]
    public class ChatController
    {
        IHubContext<ChatHub> _hubContext;
        private static ChatData chatData = new ChatData();
        public ChatController(IHubContext<ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }

        [HttpGet("Data")]
        public ChatData GetData()
        {
            return chatData;
        }

        [HttpPost("Send")]        
        public async Task SendMessage([FromBody]Message message)
        {
            chatData.Add(message);
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
