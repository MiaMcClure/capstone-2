"use strict"
window.onload = init;
function init() {
    // create variables
    const selectMountain = document.getElementById("mountainsSelection");
    const mountainInfo = document.getElementById("mountainResults");
    const infoBtn = document.getElementById("infoBtn");
    let viewImages = document.getElementById("mountainsCollage");
    let selectedMountain;

    // put mountains images and buttons grid on page
    function generateDestinationImg(destination) {
        return `
        <div class="display">
            <img src="images/${destination.img}" class="destination-img" alt="${destination.name}">
            <div class="overlay">
                <button class="imgBtn" name="${destination.name}">${destination.name}</button>
            </div>
         </div>
        `
    }

    // display mountains on page
    function displayImages(array) {
        for (let index = 0; index < array.length; index++) {
            let destination = array[index];
            let destinationImg = generateDestinationImg(destination);
            viewImages.insertAdjacentHTML("beforeend", destinationImg);
        }
    }

    // function to add options
    function addOptions(selectElement, dataArray) {
        for (let index = 0; index < dataArray.length; index++) {
            let option = new Option(dataArray[index].name, dataArray[index].name);
            selectElement.appendChild(option);
        }
    }

    // call functions
    addOptions(selectMountain, mountainsArray);
    displayImages(mountainsArray);

    // generate mountain information
    function generateInfo(_mountain) {
        return `
        <div class="results-container div-card">
        <div class="container">
            <div class="name-overlay">
                <h4>${_mountain.name}</h4>
            </div>
            <div class="info-overlay">
                <p> ${_mountain.desc} </p>
                <p>Coordinates: ${_mountain.coords.lat}, ${_mountain.coords.lng} </p>
                <p>Elevation: ${_mountain.elevation} </p>
            </div>
        </div>
        <img src="images/${_mountain.img}" alt="" class="results-img">
    </div>
        `
    }
    // display mountain info 
    function displayInfo(event) {
        event.preventDefault();
        // set selectedMountain variable depending on which button has been clicked
        if (event.target.classList.contains('imgBtn')) {
            // when imgBtn is clicked
            selectedMountain = event.target.getAttribute('name');
        } else if (event.target === infoBtn) {
            // when get info button is clicked
            selectedMountain = selectMountain.value;
        }
        // other variables
        const mountain = mountainsArray.find(_mountain => _mountain.name === selectedMountain);
        const display = generateInfo(mountain);

        // display on page
        mountainInfo.innerHTML = display;
        // move view to element
        mountainInfo.scrollIntoView();
    }

    


    // create event listeners
    
    document.addEventListener('click', function (event) {
        // Check if the clicked element is one of the specific buttons
        if (event.target.classList.contains('imgBtn')) {
            // Handle click for elements with the class 'imgBtn'
            displayInfo(event);
        } else if (event.target === infoBtn) {
            // Handle click for the 'infoBtn' button
            displayInfo(event);
        }
        // Add more conditions for other buttons if needed
    });
    
}

