import './sass/main.scss';
import photoCardsTpl from './template.hbs';
import { error,   defaultModules } from '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/BrightTheme.css';
import refs from './refs.js';
import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

//переменные и общие настройки
const KEY_API = '23070790-299ad5e8dfdc75cc527267990';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
let page = 1;
let searchValue = '';


//запрос на бэкенд
const handlerSubmit = e => {
  e.preventDefault();

  if (searchValue === refs.input.value) return;

  searchValue = refs.input.value;

  fetch(`${BASE_URL}&q=${searchValue}&page=${page}&per_page=12&key=${KEY_API}`)
    .then(response => response.json())
    .then(photo => {
      if (photo.hits.length === 0) {
        return error({
          text: 'Please specify the request',
          delay: 1000,
        });
      } else {
        clearGallery();
        renderPhoto(photo.hits);
      }
    })
    .then(() => page++)
    .then(clearInput)
    .catch(err => {
      defaultModules.set(PNotifyMobile, {});
      clearGallery();
      error({
          text: 'Nothing found',
          delay: 1000,
      });
    });
};

//загрузка Load more...
function loadMore(e) {
  e.preventDefault();

  fetch(`${BASE_URL}&q=${searchValue}&page=${page}&per_page=12&key=${KEY_API}`)
    .then(response => response.json())
    .then(photo => {
      if (photo.hits.length === 0) {
        return error({
          text: 'No more images',
          delay: 2000,
        });
      } else {
        renderPhoto(photo.hits);
      }
    })
    .then(() => page++)
    .then(() => loadMoreSkroll())
    .catch(err => {
      defaultModules.set(PNotifyMobile, {});
      clearGallery();
      error({
        text: 'Nothing found',
      });
    });
}

function loadMoreSkroll() {
  try {
    let top = window.scrollY + window.innerHeight;

    setTimeout(() => {
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }, 200);
  } catch (error) {
    clearGallery();
    console.log(error);
  }
}

refs.form.addEventListener('submit', handlerSubmit);
refs.loadMore.addEventListener('click', loadMore);

//открытие модального окна
function modalClick(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    const imgSrc = e.target.src;
    const instance = basicLightbox.create(`<img src=${imgSrc} width="800" height="600">`);
    instance.show();
}
  
//вставка формы на экран
function renderPhoto(photo) {
  refs.gallery.insertAdjacentHTML('beforeend', photoCardsTpl(photo));
  refs.loadMore.classList.replace('load-more_hide', 'load-more_visible');
  refs.gallery.addEventListener('click', modalClick);
}

//очистка формы после ввода
function clearGallery() {
  refs.gallery.innerHTML = '';
}

//очистка при вводе с ошибкой
function clearInput() {
  refs.input.value = '';
}