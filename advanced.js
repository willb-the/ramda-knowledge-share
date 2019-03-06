import { groupBy, map, pipe, prop, sum } from "ramda";
import items from "./items";

function groupingAndMapping() {
  function native() {
    const groupedSumOfScoresBySubject = items.reduce((groups, item) => {
      if (!groups[item.subject]) {
        groups[item.subject] = 0;
      }

      groups[item.subject] += item.score;
      return groups;
    }, {});
    console.table(groupedSumOfScoresBySubject);
  }
  native();

  function ramda() {
    const groupedSumOfScoresBySubject = pipe(
      groupBy(prop("subject")),
      map(
        pipe(
          map(prop("score")),
          sum
        )
      )
    )(items);
    console.table(groupedSumOfScoresBySubject);
  }
  ramda();
}

groupingAndMapping();
