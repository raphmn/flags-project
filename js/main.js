let flagCounter = 0;
let allCountries = [];

async function getCountries() {
    if (allCountries.length > 0) {
        return allCountries;
    }
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags');
    allCountries = await response.json();
    return allCountries;
}

async function loadMoreFlags() {
    const countries = await getCountries();
    const container = document.querySelector('.flags-container');

    const slice = countries.slice(flagCounter, flagCounter + 10);
    
    slice.forEach(country => {
        const flagCard = document.createElement('div');
        flagCard.className = 'col';
        flagCard.innerHTML = `
            <div class="card h-100">
                <img src="${country.flags.png}" class="card-img-top" alt="Drapeau de ${country.name.common}" style="height: 150px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title text-center">${country.name.common}</h5>
                </div>
            </div>
        `;
        container.appendChild(flagCard);
    });

    flagCounter += 10;
    console.log(flagCounter);
    console.log(countries.length);

    if (flagCounter >= countries.length) {
        document.querySelector('#load-more').remove();
    }
}

document.addEventListener('DOMContentLoaded', loadMoreFlags);
document.querySelector('#load-more').addEventListener('click', loadMoreFlags);