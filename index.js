document.addEventListener('DOMContentLoaded', () => {
    const apiKey = 'live_8t0spVZ2Eyytefcd3VOrgnWhPvvzTPxaFMGL18nth1D3NN38JqdEhGEi5TyFBSRA';

    if (document.getElementById('breeds-list')) {
        
        const breedsList = document.getElementById('breeds-list');

        fetch('https://api.thedogapi.com/v1/breeds', {
            headers: {
                'x-api-key': apiKey
            }
        })
        .then(response => response.json())
        .then(data => {
            data.forEach(breed => {
                const breedItem = document.createElement('div');
                breedItem.classList.add('breed-item');
                breedItem.innerHTML = `
                    <img src="${breed.image?.url || 'https://via.placeholder.com/100'}" alt="${breed.name}" width="100">
                    <span>${breed.name}</span>
                `;
                breedItem.addEventListener('click', () => {
                    localStorage.setItem('selectedBreedId', breed.id);
                    window.location.href = 'breed-details.html';
                });
                breedsList.appendChild(breedItem);
            });
        })
        .catch(error => console.error('Error fetching breed data:', error));
    }

    if (document.getElementById('breed-details')) {
        // Code for breed-details.html
        const breedDetails = document.getElementById('breed-details');
        const selectedBreedId = localStorage.getItem('selectedBreedId');

        if (selectedBreedId) {
            fetch('https://api.thedogapi.com/v1/breeds', {
                headers: {
                    'x-api-key': apiKey
                }
            })
            .then(response => response.json())
            .then(data => {
                const breed = data.find(b => b.id == selectedBreedId);
                if (breed) {
                    breedDetails.innerHTML = `
                        <h2>${breed.name}</h2>
                        <img src="${breed.image?.url || 'https://via.placeholder.com/300'}" alt="${breed.name}">
                        <p><strong>Breed Group:</strong> ${breed.breed_group || 'Unknown'}</p>
                        <p><strong>Temperament:</strong> ${breed.temperament || 'Unknown'}</p>
                        <p><strong>Life Span:</strong> ${breed.life_span}</p>
                    `;
                } else {
                    breedDetails.innerHTML = '<p>Breed details not found.</p>';
                }
            })
            .catch(error => console.error('Error fetching breed details:', error));
        } else {
            breedDetails.innerHTML = '<p>Breed details not found.</p>';
        }
    }
});