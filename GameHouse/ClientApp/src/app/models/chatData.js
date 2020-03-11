"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ChatData = /** @class */ (function () {
    function ChatData(thread) {
        this.thread = thread;
    }
    Object.defineProperty(ChatData.prototype, "messages", {
        get: function () {
            return this.thread;
        },
        enumerable: true,
        configurable: true
    });
    ChatData.prototype.push = function (msg) {
        this.thread.push(msg);
    };
    return ChatData;
}());
exports.ChatData = ChatData;
//# sourceMappingURL=chatData.js.map