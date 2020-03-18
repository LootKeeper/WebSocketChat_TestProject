using GameHouse.Hubs;
using GameHouse.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GameHouse.Controllers
{
    [Route("api/chat")]
    [Authorize]
    public class ChatController : Controller
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
        public async Task SendMessage([FromBody]MessageData data)
        {
            var userName = User.Identity.Name;
            var userId = int.Parse(User.Claims.First(claim => claim.Type == "id").Value);
            var user = new User(userId, userName);
            var message = new Message(user, data.Text);
            chatData.Add(message);
            await _hubContext.Clients.All.SendAsync("ReceiveMessage", message);
        }
    }
}
