function startAutoRefresh() {
    setInterval(function () {
        location.reload();
    }, 4 * 60 * 60 * 1000); // 12 horas em milissegundos
    
}
window.addEventListener("load", startAutoRefresh);