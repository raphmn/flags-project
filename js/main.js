let flagCounter = 0;
let allCountries = [];

let flagTimer;

async function getCountries() {
    if (allCountries.length > 0) {
        return allCountries;
    }
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital');
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
            </div>
        `;

        flagCard.addEventListener('mouseenter', () => {
        flagTimer = setTimeout(() => {
            
            const modal = document.createElement('div');
            modal.id = 'active-modal';
            
            modal.innerHTML = `
                <img src="${country.flags.png}" alt="Drapeau">
                <h2 class="card-title text-center">${country.name.common}</h2>
                <p>Capitale: ${country.capital}</p>
            `;
            
            document.body.appendChild(modal);
            document.querySelector('#dim').style.display = 'block';
        }, 500);
    });

    flagCard.addEventListener('mouseleave', () => {
        
        clearTimeout(flagTimer);
        const existingModal = document.getElementById('active-modal');
        if (existingModal) {
            existingModal.remove();
        }
        document.querySelector('#dim').style.display = 'none';
    });


        container.appendChild(flagCard);
    });

    flagCounter += 10;

    if (flagCounter >= countries.length) {
        const load_more_btn = document.querySelector('#load-more');
        if (load_more_btn) {
            load_more_btn.remove();
        }
    }
}

document.addEventListener('DOMContentLoaded', loadMoreFlags);
document.querySelector('#load-more').addEventListener('click', loadMoreFlags);
