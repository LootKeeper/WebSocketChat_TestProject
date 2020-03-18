import { Message } from "./message";
import { User } from "./user";
import { IListener } from "./listener";

export class ChatData {

  private listeners: IListener<Message>[]

  constructor(
    private thread: Message[]
  ) {
    this.listeners = [];
  }

  get messages() {
    return this.thread;
  }

  public push(msg: Message) {
    this.thread.push(msg);
    this.listeners.forEach((listener) => listener.notify(msg));
  }

  public subscribe(listener: IListener<Message>) {
    this.listeners.push(listener);
  }
}
