document.addEventListener('DOMContentLoaded', () => {
    fetch('/hoteis')
        .then(response => response.json())
        .then(hoteis => {
            const container = document.getElementById('hoteis-container');
            hoteis.forEach(hotel => {
                const card = document.createElement('div');
                card.className = 'hotel-card';
                card.innerHTML = `
                    <img src="${hotel.imagem}" alt="${hotel.nome}">
                    <h2>${hotel.nome}</h2>
                    <p>${hotel.localizacao}</p>
                    <p>${hotel.descricao}</p>
                `;
                container.appendChild(card);
            });
        })
        .catch(error => console.error('Erro ao buscar hotéis:', error));
});
