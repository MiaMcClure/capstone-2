"use strict"
window.onload = init;
function init() {
    // add placeholder images to cards
    let image = 'img';
    let imageValue = "park-placeholder.jpeg";
    for (let i = 0; i < nationalParksArray.length; i++) {
        nationalParksArray[i].image = imageValue;
    };

    // create variables 
    const selectLocation = document.getElementById("byLocation");
    const selectType = document.getElementById("byType");
    const searchBtn = document.getElementById("search");
    const resultsList = document.getElementById("results");

    // create function to add options
    function addOptions(selectElement, dataArray) {
        for (let index = 0; index < dataArray.length; index++) {
            let option = new Option(dataArray[index], dataArray[index]);
            selectElement.appendChild(option);
        }
    }

    // call function for location and type selections
    addOptions(selectLocation, locationsArray);
    addOptions(selectType, parkTypesArray);


    // search by location
    function searchByLocation(event) {
        event.preventDefault();
        // declare variables
        const selectedLocation = selectLocation.value;
        let results = nationalParksArray.filter(park => park.State === selectedLocation);

        //display results
        if (results.length > 0) {
            results.forEach((park) => {
                const cardHTML = createCard(park);
                resultsList.insertAdjacentHTML("beforeend", cardHTML);
            })
            return results;
        } else {
            resultsList.innerHTML = "No Parks found :("
        }
    }

    // search by park type 
    function searchByType(event) {
        event.preventDefault();

        // create variables
        const selectedType = selectType.value;
        let results = nationalParksArray.filter(park => park.LocationName.includes(selectedType));

        // display results
        if (results.length > 0) {
            results.forEach((park) => {
                const cardHTML = createCard(park);
                resultsList.insertAdjacentHTML("beforeend", cardHTML);
            })
            return results;
        } else {
            resultsList.innerHTML = "No Parks found :("
        }
    }

    // // create searchfunction
    // function search(event) {
    //     event.preventDefault();
    //     const selectedLocation = selectLocation.value;
    //     const selectedType = selectType.value;
    //     let results;

    //     // search by location AND type
    //     if (selectedLocation && selectedType) {
    //         results = nationalParksArray.filter(park => park.State === selectedLocation && park.LocationName.includes(selectedType));
    //     } else if (selectedLocation) {
    //         // search by location only
    //         results = nationalParksArray.filter(park => park.State === selectedLocation);
    //     } else if (selectedType) {
    //         // search by type only
    //         results = nationalParksArray.filter(park => park.LocationName.includes(selectedType));
    //     }
    //     // display results
    //     if (results.length > 0) {
    //         results.forEach((park) => {
    //             const cardHTML = createCard(park);
    //             resultsList.insertAdjacentHTML("beforeend", cardHTML);
    //         })
    //         return results;
    //     } else {
    //         resultsList.innerHTML = "No Parks found :("
    //     }
    // }

    // create bootstrap card
    function createCard(_park) {
        return `
        <div class="card" style="width: 18rem;">
        <img src="${_park.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${_park.LocationName}</h5>
            <p class="card-text">${_park.State}.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
        </div>`;
    }

    // event listener
    searchBtn.addEventListener("click", searchByLocation);
}
