document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('hotels-container')) {
        loadHotels();
    } else if (document.getElementById('hotel-name')) {
        loadHotelDetails();
    }
});

function loadHotels() {
    fetch('data.json')
        .then(response => response.json())
        .then(hotels => {
            const container = document.getElementById('hotels-container');
            hotels.forEach(hotel => {
                const card = document.createElement('div');
                card.className = 'hotel-card';
                card.innerHTML = `
                    <img src="${hotel.imagem}" alt="${hotel.nome}">
                    <h2>${hotel.nome}</h2>
                    <p>${hotel.localizacao}</p>
                    <p>${hotel.descricao}</p>
                    <button onclick="location.href='hotel.html?id=${hotel.id}'">Mais Informações</button>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao buscar hotéis:', error));
}

function loadHotelDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const hotelId = urlParams.get('id');

    fetch('data.json')
        .then(response => response.json())
        .then(hotels => {
            const hotel = hotels.find(h => h.id == hotelId);
            if (hotel) {
                document.getElementById('hotel-name').innerText = hotel.nome;
                document.getElementById('hotel-image').src = hotel.imagem;
                document.getElementById('hotel-description').innerText = hotel.descricao;
            } else {
                alert('Hotel não encontrado!');
            }
        })
        .catch(error => console.error('Erro ao buscar detalhes do hotel:', error));
}
