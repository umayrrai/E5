import { hasCrate, type Puzzle } from "../core/mod.ts";

// A view: it reads the puzzle and draws how many goals hold a crate. It never
// changes the puzzle. The count is worked out on every render, so it can never
// disagree with the board.
export function GoalTracker({ puzzle }: { puzzle: Puzzle }) {
  const goals = puzzle.layout.goals;
  const filled = goals.filter((goal) => hasCrate(puzzle, goal)).length;
  return <p className="goals">Goals filled: {filled} of {goals.length}</p>;
}
