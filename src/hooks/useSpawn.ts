import { ActorRef, Behavior, EventObject, spawnBehavior } from "xstate";
import useConstant from "./useConstant";

/**
 * React hook that spawns an `ActorRef` with the specified `behavior`.
 * The returned `ActorRef` can be used with the `useActor(actorRef)` hook.
 *
 * @param behavior The actor behavior to spawn
 * @returns An ActorRef with the specified `behavior`
 */
export function useSpawn<TState, TEvent extends EventObject>(
  behavior: Behavior<TEvent, TState>,
  options?: {
    id: string;
    parent?: ActorRef<any>;
  }
): ActorRef<TEvent, TState> {
  const actorRef = useConstant(() => {
    return spawnBehavior(behavior, options);
  });

  return actorRef;
}
