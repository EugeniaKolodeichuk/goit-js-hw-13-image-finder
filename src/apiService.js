import { error, defaultModules } from  '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';
import renderTemplate from './template.hbs';

//переменные и общие настройки

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  loadButton: document.querySelector('.load'),
  searchButton: document.querySelector('btn-search'),
  list: document.querySelector('.gallery')
}

let currentPage = 1;
const KEY_API = '23104704-cbc687a973408870243d925b2';
const BASE_URL = 'https://pixabay.com/api/?image_type=photo&orientation=horizontal'


//код запроса backend
const submitHandler = (e) => {
  e.preventDefault();
  const value = refs.input.value;
  
  fetch(`${BASE_URL}&q=${value}&page=${currentPage}&per_page=12&key=${KEY_API}`)
  .then(response => response.json())
  .then(photo =>
    {
    if (photo.hits.length === 0) {
      return  error({
        text: 'Please specify the request',
        delay: 1000,
        maxTextHeight: null
      });
    } else renderPhoto(photo.hits);
    //refs.loadMore.scrollIntoView({behavior: 'smooth',block: 'end'});
    loadMore()
    /* return  success({
      text: 'Super, your picture collection has been found!',
      delay: 2000,
    }); */
    
    })
  .then(() => currentPage++)
    .catch(err => {
      defaultModules.set(PNotifyMobile, {});
    clearContainer ()
  error({
  text: 'Nothing found',
  delay: 1000,
        maxTextHeight: null
});})
}

function loadMore() {
  try {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 200);
  } catch (error) {
    clearContainer ()
    console.log(error);
  }
}

refs.form.addEventListener('submit', submitHandler);
refs.loadButton.addEventListener('click', submitHandler);



function renderPhoto (photo) {
    refs.list.insertAdjacentHTML('beforeend', renderTemplate(photo))
    refs.loadButton.classList.replace("load-more_hide", "load-more_visible");
    /* refs.list.addEventListener('click', onGalleryClick); */
  }
  
function clearContainer () {
      refs.list.innerHTML = '';
  }



/* export default {
    key: '23104704-cbc687a973408870243d925b2',
    page: 1,
    word: '', */
/* 
    async getPictures() {
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.word}&page=${this.page}&per_page=12&key=${this.key}`
        console.log(url);

                try {
        const picture = await axios.get(url);
        return picture.data;
                }
                
                catch (err) {
                    defaultModules.set(PNotifyMobile, {});
error({
        text: 'Try again',
        delay: 1000,
        maxTextHeight: null
        });
        console.log(err);
         }

        /* const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.word}&page=${this.page}&per_page=12&key=${this.key}`
        const response = await fetch(url);
        let json = await response.json();
        let myArray = json.hits;
        return myArray; */
    /* }, */

    /* async returnInfo() {
        const picture = await this.getPictures();
        return picture.hits.map(picture =>{

        /* this.picture = picture.map(picture => { */
            /* return {
                webformatURL: picture.webformatURL,
                largeImageURL: picture.largeImageURL,
                likes: picture.likes,
                views: picture.views,
                comments: picture.comments,
                downloads: picture.downloads,
            };
        });
    },

    nextPage() {
        this.page += 1;
    },
    
    changeWord(word) {
        this.word = word;
        this.page = 1;
    },
}; */ 


/* //код запроса backend 
fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=${page}&per_page=12&key=23104704-cbc687a973408870243d925b2`)
    .then(response => response.json())
    //.then(data => { */