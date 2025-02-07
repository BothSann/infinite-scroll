"use strict";

const imgContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loader");
const count = 30;
let imagesLoaded = 0;
let totalImages = 0;
let isReady = false;
let photosArray = [];

const apiKey = "5B86H6bqp9BNOhIvf3yEc9ZsF2PkbihK9Eol3LEpEnM";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Helper functions
const setAttributes = function (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const imageLoadedHandler = function () {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    isReady = true;
    loader.hidden = true;
  }
};

// Main functions
const getPhotos = async function () {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (err) {
    alert(err.message);
  }
};

const displayPhotos = function () {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  photosArray.forEach((photo) => {
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    img.addEventListener("load", imageLoadedHandler);

    item.appendChild(img);
    imgContainer.appendChild(item);
  });
};

// Scrol event handler
const infiniteScroll = function () {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    isReady
  ) {
    isReady = false;
    getPhotos();
  }
};

// On load
window.addEventListener("scroll", infiniteScroll);
getPhotos();
