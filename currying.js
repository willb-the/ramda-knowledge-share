import {prop, map} from "ramda";
import {items} from "./items";

function currying() {
    function native() {
        const getProp = (prop, item) => item[prop];
        const getScore = getProp.bind(null, 'score');
        const scores = items.map(getScore);
        console.table(scores);
    }
    native();

    function ramda() {
        const getScore = prop('score');
        const scores = map(getScore, items);
        console.table(scores);
    }
    ramda();
}

currying();