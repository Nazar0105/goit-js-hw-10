import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_RstgcAxQvpn7adh564VAFryCjeelpVvzvWpJcPGBD1H217oN4QndjgR8B2yOXoQ7";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds").then((response) => {
    return response.data;
  });
}

export function fetchCatByBreed(breedId) {
  return axios
    .get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => {
      return response.data[0];
    });
}
