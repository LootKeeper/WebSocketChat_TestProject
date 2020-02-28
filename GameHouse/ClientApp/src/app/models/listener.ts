import { Message } from "./message";

export interface IListener {
  onReceive(message: Message)
}
