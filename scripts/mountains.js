"use strict"
window.onload = init;
function init() {
    // create variables
    const selectMountain = document.getElementById("mountainsSelection");
    const mountainName = document.getElementById("mountainName");
    const mountainInfo = document.getElementById("mountainResults");
    const infoBtn = document.getElementById("infoBtn");

    // function to add options
    function addOptions(selectElement, dataArray) {
        for (let index = 0; index < dataArray.length; index++) {
            let option = new Option(dataArray[index].name, dataArray[index].name);
            selectElement.appendChild(option);
        }
    }

    // call function
    addOptions(selectMountain, mountainsArray);

    // display mountain info 
    function generateMountain(event) {
        event.preventDefault();

        // declare variables
        const selectedMountain = selectMountain.value;
        const mountain = mountainsArray.find(_mountain => _mountain.name === selectedMountain);
        const display = `
            <div class="container">
            <div class="row">
                <!-- text -->
                <div class="col-8">
                    <p> ${mountain.desc} </p>
                    <p>Coordinates: ${mountain.coords.lat}, ${mountain.coords.lng} </p>
                    <p>Elevation: ${mountain.elevation} </p>
                </div>
                <!-- image -->
                <div class="col-4">
                    <img src="images/${mountain.img}" alt="mountain_image">
                </div>
            </div>
        </div>
        `
        // display on page
        mountainName.innerHTML = mountain.name;
        mountainInfo.innerHTML = display;
    }

    // create event listener 
    infoBtn.addEventListener("click", generateMountain);
}

