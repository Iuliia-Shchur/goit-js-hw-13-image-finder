import {refs} from './js/refs.js';
import {getPictures} from './js/apiService.js';
import card from './template/pictureCard.hbs';
import { data } from 'browserslist';
import { alert, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';
import * as basicLightbox from 'basiclightbox';



refs.form.addEventListener('submit', onSearch);
refs.button.addEventListener('click', onLoadMore);
refs.button.style.visibility = "hidden";
refs.gallery.addEventListener('click', onOpenModal);


const state = {
    page: 1,
    query: '',
}

async function onSearch (e) {
    try {
e.preventDefault();
refs.button.style.visibility = "hidden";
state.page = 1;
state.query = e.currentTarget.elements.query.value.trim();

if(!state.query) {
    return error ({
        text: "Please, type your query!"
    });
} 

const response = await getPictures (state.query, state.page);
const result = await response.data.hits;
refs.gallery.innerHTML = card(result);

if (result.length > 11) {
    refs.button.style.visibility = "visible";
    
} else if (result.length === 0) {
    return alert ({
        text: "No matches found! Please, try again!"
    });
}

}
catch (error) {
    Error
}}

async function onLoadMore () {
    try {
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
} catch (error) {
    Error
}}




function onOpenModal (e) {
if(e.target.nodeName !== "IMG") {
    return
}
const instance = basicLightbox.create(`
<img src="${e.target.dataset.src}" width="800" height="600">
`)

    instance.show();

}

