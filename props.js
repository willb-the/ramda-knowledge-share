import { omit, path, pick, prop } from "ramda";
import { items } from "./items";

function props() {
  function native() {
    const ids = items.map(item => item.institution_id);
    console.table(ids);
  }
  // native();

  function ramda() {
    const ids = items.map(prop("institution_id"));
    console.table(ids);
  }
  ramda();
}

function picks() {
  function native() {
    const namesAndSubjects = items.map(item => ({
      name: item.name,
      subject: item.subject
    }));

    console.table(namesAndSubjects);
  }
  native();

  function ramda() {
    const namesAndSubjects = items.map(pick(["name", "subject"]));
    console.table(namesAndSubjects);
  }
  ramda();
}

function paths() {
  function native() {
    const countryCodes = items.map(item => item.country.code);
    console.table(countryCodes);
  }
  native();

  function ramda() {
    const countryCodes = items.map(item => ({
      code: path(["country", "code"], item),
      name: path(["path"], item)
    }));
    console.table(countryCodes);
  }
  ramda();
}

function deleting() {
  function native() {
    const itemsWithoutCountry = items.map(item => {
      const newItem = JSON.parse(JSON.stringify(item));
      delete newItem.country;
      return newItem;
    });
    console.table(itemsWithoutCountry);
  }
  native();

  function ramda() {
    const itemsWithoutCountry = items.map(omit(["country"]));
    console.table(itemsWithoutCountry);
  }
  ramda();
}

props();
picks();
paths();
deleting();
