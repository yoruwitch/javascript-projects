import { API_KEY, BASE_URL, IMG_URL, language } from "./api.js";
let img = document.getElementById("film_img");
img.style.display = "none";

function getMovies() {
    const randMovie = Math.floor(Math.random() * 1000);
    axios
        .get(
            `${BASE_URL}/${randMovie}?api_key=3f79c84a5154988a7d517630adfacb92`
        )
        .then((response) => {
            console.log(response);
            const data = response.data;

            film_title.textContent = data.original_title;
            film_description.textContent = data.overview;

            film_img.src = IMG_URL + data.poster_path;
            img.style.display = "block";
        })
        .catch(() => {
            film_title.textContent = "Epa, deu ruim";
            film_description.textContent = "Opa, filmo não encontrado!";
            film_img.src = "assets/favico/poster_error.png";
            img.style.display = "block";
        });
}

// Event with the button

const button = document.querySelector("#btn-search");
button.addEventListener("click", getMovies);
