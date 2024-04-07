import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { fetchImages } from "./js/pixabay-api.js";
import { renderImages } from "./js/render-functions.js";


const galleryList = document.querySelector(".gallery");
const form = document.querySelector("form");
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector(".btnMore");


let page = 1;
let query;
let totalPages;
let perPage = 15;


//*===========================================================================================================

function showLoader() {
    loader.classList.remove("is-hidden");}


function hideLoader() {
    loader.classList.add("is-hidden");}

//*===========================================================================================================
form.addEventListener("submit", validInput);

async function validInput(event){

  event.preventDefault();

  galleryList.innerHTML = "";

page = 1

  query = event.target.elements.search.value.trim();

  showLoader();
  
  if (query === "") {
      iziToast.warning({
          color: 'yellow',
          message: "Please fill in the field for search!",
          position: 'topRight'
      })
      return
  }
  try {
    const data = await fetchImages(query,page)
    if (data.hits.length === 0) {

        iziToast.error({
          message: "Sorry, there are no images matching your search query. Please try again!",
          backgroundColor: "red",
          messageColor: "white",
          position: 'topRight'})
        }
        totalPages = Math.ceil(data.totalHits / perPage);
        renderImages(data.hits);
        event.target.reset();

  } catch (error) {
    console.log(error);
          iziToast.error({
            title: 'Error',
            message: `Sorry, there are no images matching your search query. Please, try again!`,
            position: 'topRight'}
            )
  }
  infoBtnLoadMore();
  hideLoader();
  event.target.reset(); 
        }

//*=========================================================================================================//

//*============================== PAGINATION LOAD MORE ================================================//

function deliteLoadMore() {
  loadMoreBtn.classList.remove("is-hidden");
}

function yesLoadMore() {
  loadMoreBtn.classList.add("is-hidden");
}

function infoBtnLoadMore() {

  if (page >= totalPages) {
    yesLoadMore();

  } else {
      deliteLoadMore();
  }
}
  function scroll() {
    const position = galleryList.firstElementChild.getBoundingClientRect().height;
  scrollBy({
      top: position,
      behavior: 'smooth',
  });
}
//*=========================================================================================================//


loadMoreBtn.addEventListener("click", clickRequest);

async function clickRequest() {
  page += 1;
  showLoader();
  try {
      const data = await fetchImages(query, page);

      renderImages(data.hits);

      if (page >= totalPages) {

        yesLoadMore();

          iziToast.info({
              title: 'Info:',
          message: `You have reached the end of the list😉`,
          position: 'topRight',
          })
      }
  } catch (err) {
      console.log(err);
      iziToast.info({
          title: 'Info:',
          message: `You have reached the end of the list😉`,
          position: 'topRight',
              })
  }

  scroll();
  infoBtnLoadMore();
  hideLoader();
}

//*===============================================================================//

//*=======================SCROLL BTN to TOP=========================================//

document.addEventListener("DOMContentLoaded", function () {
  const backToTop = document.getElementById("back-to-top");
 
  // Показати/скрити кнопку при прокрутці сторінки

  window.addEventListener("scroll", function () {
    if (window.pageYOffset > 300){
      backToTop.style.display = "block";
    }else{
      backToTop.style.display = "none";
    }
  });


  // Плавна прокрутка при кліку на кнопку 

  backToTop.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});
//*===============================================================================//