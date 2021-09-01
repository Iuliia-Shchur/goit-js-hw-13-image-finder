import {refs} from './js/refs.js';
import {getPictures} from './js/apiService.js';
import card from './template/pictureCard.hbs'
import { data } from 'browserslist';
import { alert, error } from '../node_modules/@pnotify/core/dist/PNotify.js'
import '@pnotify/core/dist/BrightTheme.css';


refs.form.addEventListener('submit', onSearch);
refs.button.addEventListener('click', onLoadMore);
refs.button.style.visibility = "hidden";

const state = {
    page: 1,
    query: '',
}

async function onSearch (e) {
e.preventDefault();
refs.button.style.visibility = "hidden";
state.page = 1;
state.query = e.currentTarget.elements.query.value.trim();

if(!state.query) {
    return error ({
        text: "Please, type your query!"
    })
} 

const response = await getPictures (state.query, state.page);
const result = await response.data.hits;
refs.gallery.innerHTML = card(result);

if (result.length > 11) {
    refs.button.style.visibility = "visible";
    
}

}

async function onLoadMore () {
state.page += 1;
const response = await getPictures (state.query, state.page);
const result = await response.data.hits;
refs.gallery.insertAdjacentHTML('beforeend', card(result));

if (result.length < 12) {
    refs.button.style.visibility = "hidden";
    
}
refs.gallery.scrollIntoView({
    behavior: 'smooth',
    block: 'end',
  });
}


