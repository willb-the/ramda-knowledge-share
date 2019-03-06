import { groupBy, prop } from "ramda";
import { items } from "./items";

function groups() {
  function native() {
    const subjectGroups = items.reduce((groups, item) => {
      if (!groups[item.subject]) {
        groups[item.subject] = [];
      }

      groups[item.subject].push(item);
      return groups;
    }, {});
    console.log(subjectGroups);
  }
  native();

  function ramda() {
    const subjectGroups = groupBy(prop('subject'), items);
    console.log(subjectGroups);
  }
  ramda();
}

groups();
