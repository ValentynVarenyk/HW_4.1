const galleryItems = [
  {
    preview: "https://picsum.photos/seed/photo1/400/250",
    original: "https://picsum.photos/seed/photo1/1200/800",
    description: "Photo 1"
  },
  {
    preview: "https://picsum.photos/seed/photo2/400/250",
    original: "https://picsum.photos/seed/photo2/1200/800",
    description: "Photo 2"
  },
  {
    preview: "https://picsum.photos/seed/photo3/400/250",
    original: "https://picsum.photos/seed/photo3/1200/800",
    description: "Photo 3"
  },
  {
    preview: "https://picsum.photos/seed/photo4/400/250",
    original: "https://picsum.photos/seed/photo4/1200/800",
    description: "Photo 4"
  },
  {
    preview: "https://picsum.photos/seed/photo5/400/250",
    original: "https://picsum.photos/seed/photo5/1200/800",
    description: "Photo 5"
  },
  {
    preview: "https://picsum.photos/seed/photo6/400/250",
    original: "https://picsum.photos/seed/photo6/1200/800",
    description: "Photo 6"
  },
  {
    preview: "https://picsum.photos/seed/photo7/400/250",
    original: "https://picsum.photos/seed/photo7/1200/800",
    description: "Photo 7"
  },
  {
    preview: "https://picsum.photos/seed/photo8/400/250",
    original: "https://picsum.photos/seed/photo8/1200/800",
    description: "Photo 8"
  },
  {
    preview: "https://picsum.photos/seed/photo9/400/250",
    original: "https://picsum.photos/seed/photo9/1200/800",
    description: "Photo 9"
  }
];



const gallery = document.querySelector(".js-gallery");

const lightbox = document.querySelector(".js-lightbox");
const lightboxImage = document.querySelector(".lightbox__image");
const closeButton = document.querySelector(
  'button[data-action="close-lightbox"]'
);
const overlay = document.querySelector(".lightbox__overlay");

let currentIndex = 0;

const galleryMarkup = galleryItems
  .map(item => {
    return `
      <li class="gallery__item">
        <a class="gallery__link" href="${item.original}">
          <img
            class="gallery__image"
            src="${item.preview}"
            data-source="${item.original}"
            alt="${item.description}"
          />
        </a>
      </li>
    `;
  })
  .join("");

gallery.insertAdjacentHTML("beforeend", galleryMarkup);

gallery.addEventListener("click", openModal);

function openModal(event) {
  event.preventDefault();

  if (!event.target.classList.contains("gallery__image")) {
    return;
  }

  const image = event.target;

  lightbox.classList.add("is-open");

  lightboxImage.src = image.dataset.source;
  lightboxImage.alt = image.alt;

  currentIndex = galleryItems.findIndex(item => {
    return item.original === image.dataset.source;
  });
}

closeButton.addEventListener("click", closeModal);

function closeModal() {
  lightbox.classList.remove("is-open");

  lightboxImage.src = "";
  lightboxImage.alt = "";
}

overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", handleKeyboard);

function handleKeyboard(event) {
  if (!lightbox.classList.contains("is-open")) {
    return;
  }

  if (event.code === "Escape") {
    closeModal();
  }

  if (event.code === "ArrowRight") {
    nextImage();
  }

  if (event.code === "ArrowLeft") {
    previousImage();
  }
}

function nextImage() {
  currentIndex++;

  if (currentIndex >= galleryItems.length) {
    currentIndex = 0;
  }

  showImage();
}

function previousImage() {
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = galleryItems.length - 1;
  }

  showImage();
}

function showImage() {
  lightboxImage.src = galleryItems[currentIndex].original;
  lightboxImage.alt = galleryItems[currentIndex].description;
}