import {items, itemsAsObject} from "./items";
import {prop, map, pipe, groupBy, sum} from "ramda";

function mappingObjects() {
    function native() {
        const scoresAsObject = Object.keys(itemsAsObject).reduce((acc, key) => {
            return {
                ...acc,
                [key]: itemsAsObject[key].score
            }
        }, {});
        console.table(scoresAsObject);
    }
    native();

    function ramda() {
        const scoresAsObject = map(prop('score'), itemsAsObject);
        console.table(scoresAsObject);
    }
    ramda();
}

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

mappingObjects();
groupingAndMapping();
