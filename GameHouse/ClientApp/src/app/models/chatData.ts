import { Message } from "./message";
import { User } from "./user";

export class ChatData {
  constructor(
    private thread: Message[]
  ) { }

  get messages() {
    return this.thread;
  }

  public push(msg: Message) {
    this.thread.push(msg);
  }
}
