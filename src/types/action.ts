import { ActionActor } from "./actor";

export type Action<P = unknown> = {
  priority: number;
  actor: ActionActor | string;
};
