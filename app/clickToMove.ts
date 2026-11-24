import type { Direction, Position } from "../core/mod.ts";
import type { Controller } from "./controllers.ts";

/** The direction from one tile to a neighboring one, or undefined if `to` is not a neighbor. */
function directionTo(from: Position, to: Position): Direction | undefined {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  if (dy === 0 && dx === 1) return "right";
  if (dy === 0 && dx === -1) return "left";
  if (dx === 0 && dy === 1) return "down";
  if (dx === 0 && dy === -1) return "up";
  return undefined;
}

// Another Strategy: clicking (or tapping) a tile next to the player steps
// toward it, pushing a crate if one is there. Any other click does nothing.
export const clickToMove: Controller = {
  label: "Click a neighboring tile",
  attach(session, board) {
    return board.onTileClick((at) => {
      // Ask at each click, so the position is always current.
      const { player } = session.getState().puzzle;
      const direction = directionTo(player, at);
      if (direction) session.dispatch({ kind: "move", direction });
    });
  },
};
