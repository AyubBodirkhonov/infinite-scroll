const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let isInitialLoad = true;

// Unsplash API
let initualCount = 5;
const apiKey = "DqmLgrknVQ0rVYEs3f-KUkhABe1LWG1devbODqjzPG4";
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${initualCount}&`;

function updateAPIURLWithNewCount(picCount) {
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${picCount}`;
}

// Check if all images were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
  }
}
// Helper Function to set attributes on DOM Elements.
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements for Links & Photos, Add to DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

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
    // Event Listener, Check when each is finished loading
    img.addEventListener("load", imageLoaded);
    // Put the image inside the <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get Photos Unsplash API

const getPhotos = async () => {
  try {
    const res = await fetch(apiUrl);
    photosArray = await res.json();
    displayPhotos();
    if (isInitialLoad) {
      updateAPIURLWithNewCount(30);
      isInitialLoad = false;
    }
  } catch (e) {
    // Catch the error here
  }
};

// Check to see if scrilling near bottom of the page, Load more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On load
getPhotos();
