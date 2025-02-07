"use strict";

const imgContainer = document.querySelector(".image-container");
const loader = document.querySelector(".loader");
const count = 10;
let photosArray = [];

// const apiKey = "5B86H6bqp9BNOhIvf3yEc9ZsF2PkbihK9Eol3LEpEnM";
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

const getPhotos = async function () {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    console.log(photosArray);
    displayPhotos();
  } catch (err) {
    alert(err.message);
  }
};

const setAttributes = function (element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
};

const displayPhotos = function () {
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

    item.appendChild(img);
    imgContainer.appendChild(item);
  });
};

getPhotos();
