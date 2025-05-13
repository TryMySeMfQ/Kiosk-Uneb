function updateTime() {
    const now = new Date();
    const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };

    // Formata a data e a hora de acordo com as configurações locais
    const currentDate = now.toLocaleDateString('pt-BR', optionsDate);
    const currentTime = now.toLocaleTimeString('pt-BR', optionsTime);

    // Atualiza o conteúdo HTML
    document.getElementById('date').textContent = currentDate;
    document.getElementById('time').textContent = currentTime;
}

// Atualiza a data e a hora a cada segundo
setInterval(updateTime, 1000);

// Chama a função imediatamente para atualizar ao carregar a página
updateTime();
