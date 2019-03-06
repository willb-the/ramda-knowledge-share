import { map, pipe, prop, sum } from "ramda";
import { items } from "./items";

function pipes() {
  function native() {
    const sumOfScores = items.reduce((acc, item) => acc + item.score, 0);
    console.table(sumOfScores);
  }
  native();

  function ramda() {
    const sumOfScores = pipe(
      map(prop("score")),
      sum
    )(items);
    console.table(sumOfScores);
  }
  ramda();
}

pipes();
