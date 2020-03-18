import { Message } from "./message";

export interface IListener<T> {
  notify(data: T);  
}
