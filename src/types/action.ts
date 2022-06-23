import { ActionActor } from "./actor";

export type Action<P = unknown> = {
  priority: number;
  key: string;
  actor: ActionActor | string;
};
