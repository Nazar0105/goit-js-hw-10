import { fetchBreeds, fetchCatByBreed } from "./cat-api.js";
import SlimSelect from 'slim-select'
// all modules
import Notiflix from 'notiflix';

// one by one
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Confirm } from 'notiflix/build/notiflix-confirm-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';
import { Block } from 'notiflix/build/notiflix-block-aio';

new SlimSelect({
  select: '#selectElement'
})
const breedSelect = document.querySelector(".breed-select");
const loader = document.querySelector(".loader");
const error = document.querySelector(".error");
const catInfo = document.querySelector(".cat-info");
export function fetchBreeds() {
  return axios
    .get("https://api.thecatapi.com/v1/breeds", {
      params: {
        api_key: "your_api_key_here",
      },
    })
    .then((response) => {
      return response.data;
    });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`, {
      params: {
        api_key: "your_api_key_here",
      },
    })
    .then((response) => {
      return response.data[0];
    });
}

// Fetch and populate breeds select
fetchBreeds()
  .then((breeds) => {
    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch((err) => {
    error.style.display = "block";
  })
  .finally(() => {
    loader.style.display = "none";
  });

// Handle breed select change
breedSelect.addEventListener("change", () => {
  const selectedBreedId = breedSelect.value;
  loader.style.display = "block";
  error.style.display = "none";
  catInfo.innerHTML = "";

  // Fetch cat by breed ID
  fetchCatByBreed(selectedBreedId)
    .then((cat) => {
      const catImage = document.createElement("img");
      catImage.src = cat.url;
      catImage.alt = cat.breeds[0].name;

      const catName = document.createElement("h2");
      catName.textContent = cat.breeds[0].name;

      const catDescription = document.createElement("p");
      catDescription.textContent = cat.breeds[0].description;

      const catTemperament = document.createElement("p");
      catTemperament.textContent = `Temperament: ${cat.breeds[0].temperament}`;

      catInfo.appendChild(catImage);
      catInfo.appendChild(catName);
      catInfo.appendChild(catDescription);
      catInfo.appendChild(catTemperament);
    })
    .catch((err) => {
      error.style.display = "block";
    })
    .finally(() => {
      loader.style.display = "none";
    });
});
