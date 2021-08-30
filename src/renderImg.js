/* import template from './template.hbs';
import refs from './refs';

export default {
    draw(data) {
        const obj = { arr: data };
        const buildList = obj => template(obj);
        const listHTML = buildList(obj);
        refs.list.insertAdjacentHTML('beforeend', listHTML);
    },
    clean() {
        refs.list.innerHTML = '';
    },
}; */