"use strict"
// call functions 
window.onload = init;
function init() {
    // add placeholder images to cards
    let image = 'img';
    let imageValue = "images/extra/park-placeholder.jpg";
    for (let i = 0; i < nationalParksArray.length; i++) {
        nationalParksArray[i].image = imageValue;
    };

    // create variables 
    const selectLocation = document.getElementById("byLocation");
    const selectType = document.getElementById("byType");
    const searchBtn = document.getElementById("search");
    const clearBtn = document.getElementById("clear")
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

    // create searchfunction
    function search(event) {
        event.preventDefault();
        const selectedLocation = selectLocation.value;
        const selectedType = selectType.value;
        let results;
        // search by location AND type
        if (selectedLocation != 'select' && selectedType != 'select') {
            results = nationalParksArray.filter(park => park.State === selectedLocation && park.LocationName.includes(selectedType));
            console.log(results);
        } else if (selectedLocation && selectedType === 'select') {
            // search by location only
            results = nationalParksArray.filter(park => park.State === selectedLocation);
            console.log(results);
        } else if (selectedType && selectedLocation === 'select') {
            // search by type only
            results = nationalParksArray.filter(park => park.LocationName.includes(selectedType));
            console.log(results);
        }
        // display results
        if (results.length > 0) {
            results.forEach((park) => {
                const cardHTML = createCard(park);
                const title = document.getElementById("listLength")
                let resultsMessage = `
                <div id="results-title">
                  <h2>Showing 1-${results.length} of ${results.length} Results</h2>
                </div>
                `;
                title.innerHTML = resultsMessage;
                resultsList.insertAdjacentHTML("beforeend", cardHTML);
            
            })
            return results;
        } else {
            let noResults = `
            <div id="no-results">
                <h2>Sorry, we couldn't find any results for your search.</h2>
            </div>
            `;
            resultsList.innerHTML = noResults;
            resultsList.scrollIntoView();
        }
    }
    // create bootstrap card
    function createCard(_park) {
        return `
        <div class="maincontainer">
        <div class="thecard">
            <!-- front -->
            <div class="thefront" data-overlay-text="${_park.LocationName}"
                style="background-image: url('${_park.image}');">
            </div>
            <!-- back -->
            <div class="theback">
                <div class="row">
                    <div class="col-4">
                        <img class="back-img" src="${_park.image}" alt="park-image">
                    </div>
                    <div class="park-info col-8 mt-3">
                        <h5 class="card-title">${_park.LocationName}</h5>
                        <br>
                        <div>
                        <p>Name: ${_park.LocationName}</p> 
                        <p>Address: ${_park.Address}</p>
                        <p>city: ${_park.City}</p>
                        <p>State: ${_park.State}</p>
                        <a href="${_park.Visit}" target="_blank"class="btn btn-primary">Visit Site</a>
                    </div>
                </div>
            </div>
        </div>

    </div>
        `;
    }

    function reload() {
        location.reload();
    }

    // event listener
    searchBtn.addEventListener("click", search);
    clearBtn.addEventListener('click', reload)
}
