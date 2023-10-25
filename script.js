document.addEventListener("DOMContentLoaded", function() {
    var loading = document.querySelector(".loading");

    // Mostrar o loading por 7 segundos
    setTimeout(function() {
        // Redirecionar para apresentacao1.html após 7 segundos
        window.location = "./pages/apresentacao1.html"
    }, 4000); // 7000 milissegundos = 7 segundos
});
