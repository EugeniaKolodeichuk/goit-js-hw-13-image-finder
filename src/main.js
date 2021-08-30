/* import axios from 'axios';
import api from './apiService'
import render from './renderImg';
import refs from './refs';
import renderImg from './renderImg';

console.log(api.key);

const submitHandler = event => {
    event.preventDefault();
    const input = event.target.querySelector('input[name="query"]').value;
    api.changeWord(input);
    api.returnInfo().then(data => {
        renderImg.clean();
        renderImg.draw(data);

        window.scrollTo({
            top: refs.list.scrollHeight,
            behavior: 'smooth',
            block: 'end',
        });
    });
};

const loadMoreHandler = () => {
    api.nextPage();
    api.returnInfo().then(data => {
        renderImg.draw(data);
        window.scrollTo({
            top: refs.list.scrollHeight,
            behavior: 'smooth',
            block: 'end',
        });
    });
};

refs.form.addEventListener('submit', submitHandler);
refs.button.addEventListener('click', loadMoreHandler); */

