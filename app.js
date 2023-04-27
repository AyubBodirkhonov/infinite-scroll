const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader')

let photosArray = [];
// Helper Function to set attributes on DOM Elements.

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  // Run a function for each object in photos array
  photosArray.forEach((photo) => {
    // Create <a> to link Unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });
    // Create img for photo
    const img = document.createElement("img");
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    // Put the image inside the <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Unsplash API
const count = 10;
const apiKey = "cQJ3XvfsQVP6Esf7gWTcMTI_ykWFHeZDJhwsq-LMnIw";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Get Photos Unsplash API

const getPhotos = async() => {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    displayPhotos();
  } catch (e) {
    // Catch the error here
  }
};

// Check to see if scrilling near bottom of the page, Load more photos
window.addEventListener("scroll", () => {
  if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000) {
    
  }
});

// On load
getPhotos();
