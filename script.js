function getZipInfo() {
    const zipCode = document.getElementById('zip-input').value.trim();

    if (!isValidZipCode(zipCode)) {
        alert('ZIP code should be 5 digits long. Please try again.');
        return;
    }

    fetchZipCodeInfo(zipCode)
        .then(data => displayZipInfo(data))
        .catch(error => {
            console.error('Oops! Something went wrong while fetching ZIP code data:', error);
            displayErrorMessage();
        });
}

function isValidZipCode(zipCode) {
    return zipCode.length === 5 && /^\d+$/.test(zipCode);
}

function fetchZipCodeInfo(zipCode) {
    return fetch(`https://api.zippopotam.us/us/${zipCode}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load ZIP code details');
            }
            return response.json();
        });
}

function displayZipInfo(data) {
    const city = data.places[0]['place name'];
    const state = data.places[0]['state'];
    const country = data['country abbreviation'];

    document.getElementById('zip-info').innerHTML = `
        <p>City: ${city}</p>
        <p>State: ${state}</p>
        <p>Country: ${country}</p>
    `;
}

function displayErrorMessage() {
    document.getElementById('zip-info').innerHTML = '<p>ZIP code details could not be fetched.</p>';
}
