// Selecione o elemento com a classe frame-icon1
const frameIcon1 = document.querySelector('.frame-icon1');

// Selecione o pop-up e o botão de fechar
const popup = document.getElementById('popup');
const closePopupBtn = document.getElementById('closePopupBtn');

// Função para exibir o pop-up
function showPopup() {
    popup.style.display = 'flex';
}

// Adicione um ouvinte de eventos de clique ao ícone
frameIcon1.addEventListener('click', showPopup);

// Adicione um ouvinte de eventos de clique ao botão de fechar
closePopupBtn.addEventListener('click', () => {
    popup.style.display = 'none';
});

// Adicione um ouvinte de eventos de clique fora do pop-up para fechá-lo
window.addEventListener('click', (event) => {
    if (event.target !== popup && event.target !== frameIcon1) {
        popup.style.display = 'none';
    }
});
