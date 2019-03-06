import items from "./items";
import {
  allPass,
  equals,
  filter,
  pathSatisfies,
  prop,
  propEq,
  reject,
  symmetricDifference,
  uniq,
  uniqBy
} from "ramda";

function filtersWithArrays() {
  function native() {
    const onlyArts = items.filter(item => item.subject === "Arts");
    console.table(onlyArts);
  }

  native();

  function ramda() {
    const onlyArts = items.filter(propEq("subject", "Arts"));
    console.table(onlyArts);
  }

  ramda();
}

function filtersWithObjects() {
  const itemsAsObject = {
    oxford: items[0],
    cambridge: items[1],
    california: items[2]
  };

  function native() {
    const newItemsAsObject = {};
    Object.keys(itemsAsObject).forEach(key => {
      const item = itemsAsObject[key];
      if (item.subject === "Arts") {
        newItemsAsObject[key] = item;
      }
    });
    console.table(newItemsAsObject);
  }

  native();

  function ramda() {
    const newItemsAsObject = filter(propEq("subject", "Arts"), itemsAsObject);
    console.table(newItemsAsObject);
  }

  ramda();
}

function filterForMultipleConditions() {
  function native() {
    const onlyUkAndArts = items.filter(
      item => item.country.code === "GBR" && item.subject === "Arts"
    );
    console.table(onlyUkAndArts);
  }

  native();

  function ramda() {
    const onlyUkAndArts = items.filter(
      allPass([
        propEq("subject", "Arts"),
        pathSatisfies(equals("GBR"), ["country", "code"])
      ])
    );
    console.table(onlyUkAndArts);
  }

  ramda();
}

function rejecting() {
  function native() {
    const itemsWithoutArts = items.filter(item => item.subject !== "Arts");
    console.table(itemsWithoutArts);
  }
  native();

  function ramda() {
    const itemsWithoutArts = reject(propEq("subject", "Arts"), items);
    console.table(itemsWithoutArts);
  }
  ramda();
}

function differences() {
  const iids = items.map(prop("institution_id"));
  const blacklist = [items[0].institution_id, items[2].institution_id];

  function native() {
    const whitelist = iids.filter(iid => !blacklist.includes(iid));
    console.table(whitelist);
  }
  native();

  function ramda() {
    const whitelist = symmetricDifference(blacklist, iids);
    console.table(whitelist);
  }
  ramda();
}

function sets() {
  function native() {
    const countries = items.reduce((list, item) => {
      if (!list.some(c => c.code === item.country.code)) {
        list.push(item.country);
      }
      return list;
    }, []);
    console.table(countries);
  }
  native();

  function ramda() {
    const countries = uniq(items.map(prop("country")));
    const countries1 = uniqBy(prop("code"), items.map(prop("country")));
    console.table(countries);
    console.table(countries1);
  }
  ramda();
}

filtersWithArrays();
filtersWithObjects();
filterForMultipleConditions();
rejecting();
differences();
sets();
