const seatSections = document.querySelector(".seat-sections");
const seats = document.querySelectorAll(".seat-sections button:not(.occupied)");
const movieSelect = document.getElementById("movie-list");
let ticketPrice = +movieSelect.value

//select seat event
seatSections.addEventListener("click", e => {
    if (e.target.nodeName === "BUTTON" && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected")
    }
    updateSeatCount()
})

//change movie event
movieSelect.addEventListener("change", e => {
    ticketPrice = +e.target.value;
    updateSeatCount()
    selectedMovieData(e.target.selectedIndex, e.target.value)
})

function updateSeatCount() {
    let selectedSeats = document.querySelectorAll(".seat-sections button.selected");

    let seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat))
    localStorage.setItem("seatsIndexes", JSON.stringify(seatsIndex))//save to local storage the indexes of the selected seats

    let selectedSeatsCount = selectedSeats.length
    document.getElementById("seat-number").innerText = selectedSeatsCount;
    document.getElementById("price").innerText = +ticketPrice * selectedSeatsCount
}

function selectedMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex)
    localStorage.setItem("selectedMoviePrice", moviePrice)
}

function populateUI() {
    const selectedSeatsIndex = JSON.parse(localStorage.getItem("seatsIndexes"))
    if (selectedSeatsIndex !== null && selectedSeatsIndex.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeatsIndex.indexOf(index) > -1) {
                seat.classList.add("selected")
            }
        })
    }

    const selectedMovie = localStorage.getItem("selectedMovieIndex")
    if (selectedMovie !== null) {
        movieSelect.selectedIndex = selectedMovie
    }

    const selectedPrice = +localStorage.getItem("selectedMoviePrice")
    ticketPrice = selectedPrice

}

populateUI();
updateSeatCount();
