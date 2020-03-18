import { IListener } from "./listener";

export default interface ISourceListener<T> extends IListener<T> {
  notifyOnClosed();
}
