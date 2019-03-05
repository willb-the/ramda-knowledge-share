import { prop, pick, path } from 'ramda';
import items from './items';

function props() {
    function regularJs() {
        const ids = items.map(item => item.institution_id);
        console.log(ids);
    }
    regularJs();

    function ramdaJs() {
        const ids = items.map(prop('institution_id'));
        console.log(ids);
    }
    ramdaJs();
}

function picks() {
    function regularJs() {
        const namesAndSubjects = items.map(item => ({
            name: item.name,
            subject: item.subject
        }));

        console.log(namesAndSubjects);
    }
    regularJs();

    function ramdaJs() {
        const namesAndSubjects = items.map(pick(['name', 'subject']));
        console.log(namesAndSubjects);
    }
    ramdaJs();
}

function paths() {
    function regularJs() {
        const countryCodes = items.map(item => item.country.code);
        console.log(countryCodes);
    }
    regularJs();

    function ramdaJs() {
        const countryCodes = items.map(path(['country', 'code']));
        console.log(countryCodes);
    }
    ramdaJs();
}

props();
picks();
paths();