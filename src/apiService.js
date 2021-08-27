import axios from 'axios';
import { info, defaultModules } from  '../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';
import '@pnotify/core/dist/Material.css';
import '@pnotify/core/dist/BrightTheme.css';

export default {
    //api_key: process.env.API_KEY,
    key: '23104704-cbc687a973408870243d925b2',
    page: 1,
    word: '',
    /* picture: [], */

    async getPictures() {
        const url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.word}&page=${this.page}&per_page=12&key=${this.key}`
        console.log(url);

                try {
        const picture = await axios.get(url);
        return picture.data;
                }
                
                catch (err) {
                    defaultModules.set(PNotifyMobile, {});
info({
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
    },

    async returnInfo() {
        const picture = await this.getPictures();
        return picture.hits.map(picture =>{

        /* this.picture = picture.map(picture => { */
            return {
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
};


/* //код запроса backend 
fetch(`https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=${page}&per_page=12&key=23104704-cbc687a973408870243d925b2`)
    .then(response => response.json())
    //.then(data => { */