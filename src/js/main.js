/* eslint-disable indent */
'use strict';

//querySelectors
const inputElement = document.querySelector('.js_input');
const btnElement = document.querySelector('.js_btn');
const listElement = document.querySelector('.js_list');
const listElementFavorites = document.querySelector('.js_favoriteList');

//variables globales -contienen los datos de la appa
let allCharaters = [];
let favouritesCharaters = [];

//functions for (const oneCharacter of charactersList) {

function renderCharacterList(everyCharacter, isFavorite) {
  const addFavorites = favouritesCharaters.findIndex(
    (eachCard) => eachCard.char_id === parseInt(everyCharacter.char_id)
  );
  let styleFavorite;
  if (addFavorites === -1) {
    styleFavorite = '';
  } else {
    styleFavorite = 'selected';
  }

  let html = `

  <li >  
  <article class="js_cards ${styleFavorite}  cards" id="${everyCharacter.char_id}">
  <h2 class="cards_name"> ${everyCharacter.name}</h2>
  <img class="cards_img" src=${everyCharacter.img} class="img">
  <p class="cards_text" >${everyCharacter.status}</p>`;
  if (isFavorite) {
    html += `<span class="deletFavorite ">X</span>`;
  }

  html += `</article>
  </li>
 `;
  return html;
}

function renderAllCharacters() {
  //pinta la info por cada uno de los objtos
  let html = '';
  console.log(allCharaters.length);
  for (let i = 0; i < allCharaters.length; i++) {
    html += renderCharacterList(allCharaters[i], false);
  }
  listElement.innerHTML = html;
  addArticlesListeners();
}
//Esta funcion es para añadir a favoritos la tarjeta seleccionada por el usuario como favorita
function renderFavouriteCharacters() {
  let html = '';
  console.log(allCharaters.length);
  for (let i = 0; i < favouritesCharaters.length; i++) {
    html += renderCharacterList(favouritesCharaters[i], true);
  }
  listElementFavorites.innerHTML = html;
  addArticlesListeners();
}
function addArticlesListeners() {
  const articleElement = document.querySelectorAll('.js_cards');
  for (const article of articleElement) {
    article.addEventListener('click', handleclick);
  } //El addEventlistener solo se aplica a objetos,por eso se crea un for para adicionar el listener a cada uno (cards)
} //Este evento se agrega dentro de la funcion por que se usa solo cuando se cargan las imagenes de la pag

function handleclick(event) {
  event.currentTarget.classList.toggle('selected');

  const selectedCard = allCharaters.find(
    (eachCard) => eachCard.char_id === parseInt(event.currentTarget.id) //el event tiene el id como string  y el objeto lo returna como numerico, por eso es necesario el uso del parseInt
  );

  const addFavorites = favouritesCharaters.findIndex(
    (eachCard) => eachCard.char_id === parseInt(event.currentTarget.id)
  );

  console.log(addFavorites);
  if (addFavorites === -1) {
    favouritesCharaters.push(selectedCard);
    localStorage.setItem('favorites', JSON.stringify(favouritesCharaters));
  } else {
    favouritesCharaters.splice(addFavorites, 1);
    localStorage.setItem('favorites', JSON.stringify(favouritesCharaters));
  }

  renderFavouriteCharacters();
}
//events
//En el evento se llama la funcion que trae la información de la api y se le pasa el parametro (el nombre que la usuaria digita)
btnElement.addEventListener('click', (event) => {
  event.preventDefault();
  getCharactersApi(inputElement.value);
});
inputElement.addEventListener('input', (event) => {
  event.preventDefault();
  getCharactersApi(inputElement.value);
});

//Codigo que se ejecuta cuando se requiere traer los caracteres, al cargar la pagina y al filtrar por nombre
function getCharactersApi(name) {
  fetch(`https://breakingbadapi.com/api/characters?name=${name}`)
    .then((response) => response.json())
    .then((jsonData) => {
      allCharaters = jsonData;
      renderAllCharacters();
    });
}
getCharactersApi('');

const savedFavorites = JSON.parse(localStorage.getItem('favorites')); //se agrega el JSON.parse, para cambiarlo de texto a objeto, despues de un getItem, se debe hacer un if, para comprobar si hay algo o no en el local strogae
if (savedFavorites !== null) {
  favouritesCharaters = savedFavorites;
  renderFavouriteCharacters();
}
