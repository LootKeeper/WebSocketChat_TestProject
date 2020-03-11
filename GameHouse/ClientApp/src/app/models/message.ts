import { User } from "./user";

export class Message {
  constructor(
    public user: User,
    public text: string) {
  }
}
