  // Capturando os elementos
  const warningImage = document.getElementById('warning-image');
  const popup = document.getElementById('popup');
  const closeButton = document.getElementById('close-button');
  
  // Função para exibir o pop-up
  function showPopup() {
    popup.style.display = 'block';
  }
  
  // Função para fechar o pop-up
  function closePopup() {
    popup.style.display = 'none';
  }
  
  // Adicionando o evento de clique à imagem de aviso
  warningImage.addEventListener('click', showPopup);
  
  // Adicionando o evento de clique ao botão de fechar
  closeButton.addEventListener('click', closePopup);
  