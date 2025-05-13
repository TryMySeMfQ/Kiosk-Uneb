function getDayOfWeek() {
    const days = ['domingo', 'segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado'];
    const date = new Date();
    return days[date.getDay()];
}

function loadCSV(day) {
    const csvFile = `assets/doc/horarios/${day}.csv`;

    if (day == 'domingo') {
        const Sunday = 'Hoje não temos aula programada!';
    } else {
        fetch(csvFile)
            .then(response => response.text())
            .then(data => filterCSV(data))
            .catch(error => console.error('Erro ao carregar o CSV:', error));
    }
}

function filterCSV(data) {
    const rows = data.split('\n');
    const header = rows[0]; // Preservar a linha de cabeçalho
    const filteredRows = [header]; // Iniciar com o cabeçalho
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    if (hours >= 7 && hours <= 23) {
        // Adicione aqui a lógica que deve ser executada durante o horário entre 7h e 23h
        console.log("Verificando horários de aula...");
    } else {
        console.log("Fora do horário de aulas.");
    }
}

// Verifica o horário a cada 10 minutos (600.000 milissegundos)
document.addEventListener('DOMContentLoaded', () => {
    const dayOfWeek = getDayOfWeek();
    loadCSV(dayOfWeek);
    
    setInterval(() => {
        const dayOfWeek = getDayOfWeek();  // Atualiza o dia da semana, caso haja uma mudança
        loadCSV(dayOfWeek);
    }, 600000); // 10 minutos = 600000 milissegundos
});

