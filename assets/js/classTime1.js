document.addEventListener("DOMContentLoaded", function () {
  // Função para tocar o vídeo de introdução
  function playIntroVideo() {
    const quadroAvisos = document.getElementById("quadroAvisos");
    const tableContainer = document.getElementById("horarios");

    // Oculta a tabela de horários e exibe o quadro de avisos
    quadroAvisos.style.display = "block";
    tableContainer.style.display = "none";

    // Adiciona o vídeo ao innerHTML do quadro de avisos
    quadroAvisos.innerHTML = `
        <video id="introVideo" autoplay playsinline style="width:100%; height:100%; opacity: 0; transition: opacity 1s;">
            <source src="assets/video/intro.mp4" type="video/mp4">
        </video>
    `;

    const video = document.getElementById("introVideo");

    // Aplica o efeito de fade-in via CSS
    setTimeout(() => {
      video.style.opacity = 1; // Faz o vídeo aparecer
    }, 100);

    // Retorna uma promessa que é resolvida quando o vídeo termina
    return new Promise((resolve) => {
      video.onended = function () {
        video.style.opacity = 0; // Faz o vídeo desaparecer
        setTimeout(() => {
          quadroAvisos.innerHTML = ""; // Remove o vídeo após o fade-out
          resolve(); // Resolve a promessa quando o vídeo terminar
        }, 1000); // Tempo para o fade-out ser concluído
      };
    });
  }

  // Função para exibir as notícias
  function displayNews() {
    const quadroAvisos = document.getElementById("quadroAvisos");
    const noticias = [
      "assets/doc/noticias/igcuneb.png",
      "assets/doc/noticias/edital2025.png",
      "assets/doc/noticias/editadeic.png",
      "assets/doc/noticias/proart.png",
      "assets/doc/noticias/proexUneb.png",
      "assets/doc/noticias/ceu.png",
    ];

    let currentIndex = 0;

    // Função para exibir a próxima notícia
    function nextNews() {
      if (currentIndex < noticias.length) {
        quadroAvisos.innerHTML = `
                <div style="width: auto; height: calc(100vh - 160px); display: flex; justify-content: center; align-items: center;">
                    <img src="${noticias[currentIndex]}" alt="Notícia ${
          currentIndex + 1
        }">
                </div>
            `;
        currentIndex++;
        setTimeout(nextNews, 20000); // Exibe cada notícia por 20 segundos
      } else {
        // Após exibir todas as notícias, exibe a tabela de horários
        quadroAvisos.style.display = "none"; // Oculta o quadro de avisos
        const tableContainer = document.getElementById("horarios");
        tableContainer.style.display = "block"; // Exibe a tabela de horários novamente
        updateSchedule(); // Atualiza os horários
      }
    }

    // Inicia a exibição das notícias
    nextNews();
  }

  // Pega o dia da semana
  function getDayOfWeek() {
    const days = [
      "domingo",
      "segunda",
      "terca",
      "quarta",
      "quinta",
      "sexta",
      "sabado",
    ];
    const date = new Date();
    return days[date.getDay()];
  }

  // Função para transformar a string de "HH:MM" do CSV em um objeto Date com a data atual
  function csvTimeToDate(time) {
    if (!time || typeof time !== "string") {
      console.warn("Horário inválido:", time); // Adiciona um log de aviso para horários inválidos
      return null; // Retorna null se o horário for inválido
    }

    const [hours, minutes] = time.split(":").map(Number); // Separa as horas e minutos
    const date = new Date(); // Cria um novo objeto Date com a data atual
    date.setHours(hours, minutes, 0, 0); // Ajusta as horas e minutos conforme o CSV
    return date;
  }

  // Função para filtrar os dados do CSV por turno (manhã, tarde, noite) usando getTime()
  function filterCSVData(data, currentTime) {
    const morningStart = new Date(currentTime);
    morningStart.setHours(7, 0, 0, 0);
    const morningEnd = new Date(currentTime);
    morningEnd.setHours(12, 30, 0, 0);

    const afternoonStart = new Date(currentTime);
    afternoonStart.setHours(12, 31, 0, 0);
    const afternoonEnd = new Date(currentTime);
    afternoonEnd.setHours(18, 20, 0, 0);

    const nightStart = new Date(currentTime);
    nightStart.setHours(18, 21, 0, 0);
    const nightEnd = new Date(currentTime);
    nightEnd.setHours(22, 30, 0, 0);

    // Filtra os dados por turnos usando getTime() para comparações de horário
    let filteredData = [];

    if (
      currentTime.getTime() >= morningStart.getTime() &&
      currentTime.getTime() <= morningEnd.getTime()
    ) {
      filteredData = data.filter((row) => {
        const startTime = csvTimeToDate(row.inicio);
        return (
          startTime &&
          startTime.getTime() >= morningStart.getTime() &&
          startTime.getTime() <= morningEnd.getTime()
        );
      });
    } else if (
      currentTime.getTime() > afternoonStart.getTime() &&
      currentTime.getTime() <= afternoonEnd.getTime()
    ) {
      filteredData = data.filter((row) => {
        const startTime = csvTimeToDate(row.inicio);
        return (
          startTime &&
          startTime.getTime() >= afternoonStart.getTime() &&
          startTime.getTime() <= afternoonEnd.getTime()
        );
      });
    } else if (
      currentTime.getTime() > nightStart.getTime() &&
      currentTime.getTime() <= nightEnd.getTime()
    ) {
      filteredData = data.filter((row) => {
        const startTime = csvTimeToDate(row.inicio);
        return (
          startTime &&
          startTime.getTime() >= nightStart.getTime() &&
          startTime.getTime() <= nightEnd.getTime()
        );
      });
    }

    return filteredData;
  }

  // Função para filtrar as aulas que estão ocorrendo no momento usando getTime()
  function filterByCurrentTime(filteredData, currentTime) {
    return filteredData.filter((row) => {
      const endTime = csvTimeToDate(row.fim);
      return endTime && endTime.getTime() > currentTime.getTime(); // Exibe apenas as aulas cujo horário de fim ainda não passou
    });
  }

  // Função para exibir a imagem de "Day Off"
  function showDayOff() {
    const quadroAvisos = document.getElementById("quadroAvisos");
    const tableContainer = document.getElementById("horarios");
    tableContainer.style.display = "none"; // Oculta a tabela de horários
    quadroAvisos.style.display = "block"; // Mostra o quadro de avisos com a imagem
    quadroAvisos.innerHTML = `<div style="display: flex; justify-content: center; align-items: center; height: 100%;">
                                        <img src="assets/image/dayOff.jpg" alt="Day Off">
                                   </div>`;
  }

  // Função para atualizar a tabela de horários
  function updateSchedule() {
    let diaDaSemana = getDayOfWeek(); // Função que determina o dia da semana
    const now = new Date();
    const tableBody = document.getElementById("table-horario"); // Usamos o 'table-horario' para o corpo da tabela
    

    // Limpa o conteúdo anterior do corpo da tabela
    tableBody.innerHTML = "";
    // Regra especial para domingo: Mostrar apenas a imagem de "Day Off"
    if (
      diaDaSemana === "domingo" ||
      (diaDaSemana === "sabado" && now.getHours() >= 14)
    ) {
      showDayOff();
      return;
    }

    // Configurar o início e o fim do dia com a data atual, mas com horários específicos
    const startDayTime = new Date(`${now.toDateString()} 06:50:00`);
    const endDayTime = new Date(`${now.toDateString()} 22:31:00`);

    if (
      now.getTime() < startDayTime.getTime() ||
      now.getTime() > endDayTime.getTime()
    ) {
      showDayOff();
      return;
    }
    

    // Carregar CSV de acordo com o dia da semana, exceto domingo
    if (diaDaSemana !== "domingo") {
      const csvFile = `assets/doc/horarios/${diaDaSemana}.csv`;

      Papa.parse(csvFile, {
        download: true,
        header: true, // Usa a primeira linha como cabeçalho
        skipEmptyLines: true,
        dynamicTyping: true,
        delimiter: ";", // Define o delimitador como ponto e vírgula
        complete: function (results) {
          // Filtra os dados por turno com base no horário atual
          const turnFilteredData = filterCSVData(results.data, now);

          // Filtra as aulas que estão ocorrendo no momento
          const currentClasses = filterByCurrentTime(turnFilteredData, now);

          if (currentClasses.length > 0) {
            currentClasses.forEach((row) => {
              const tr = document.createElement("tr");
              tr.innerHTML = `<td>${row.disciplina}</td>
                                            <td>${row.professor}</td>
                                            <td>${row.curso}</td>
                                            <td>${row.inicio}</td>
                                            <td>${row.fim}</td>
                                            <td>${row.sala}</td>`;
              tableBody.appendChild(tr); // Adiciona os dados diretamente ao tbody
            });
          } else {
            tableBody.innerHTML =
              '<tr><td colspan="6">Não há aulas no momento.</td></tr>';
          }

          initAutoScroll(); // Inicializa a rolagem automática
        },
        error: function (err) {
          console.error("Erro ao carregar o arquivo CSV:", err);
        },
      });
    }
  }

  // Função para inicializar a rolagem automática
  function initAutoScroll() {
    const scrollTable = document.querySelector(".scroll-table");
    let scrollAmount = 0;
    const maxScroll = scrollTable.scrollHeight - scrollTable.clientHeight;
    const step = 0.3; // Ajuste para suavidade
    let direction = 1;

    function smoothScroll() {
      if (scrollAmount >= maxScroll) {
        direction = -1;
      } else if (scrollAmount <= 0) {
        direction = 1;
      }
      scrollAmount += step * direction;
      scrollTable.scrollTo(0, scrollAmount);

      requestAnimationFrame(smoothScroll);
    }

    requestAnimationFrame(smoothScroll);
  }

  // Função controladora que executa o vídeo e depois as notícias
  function startSequence() {
    document.getElementById("horarios").style.display = "none";
    document.getElementById("quadroAvisos").style.display = "block";
    // Executa o vídeo e, quando ele terminar, começa a exibir as notícias
    playIntroVideo().then(() => {
      displayNews(); // Exibe as notícias após o vídeo
    });
  }

  // Função para atualizar a tabela periodicamente (independente do vídeo/notícias)
  function setupScheduleUpdates() {
    updateSchedule(); // Atualiza imediatamente ao carregar a página
    setInterval(updateSchedule, 50000); // Atualiza a tabela a cada 50 segundos
  }

  // Função para controlar o intervalo de exibição do vídeo e das notícias
  function initiateSequence() {
    // Inicia a sequência uma vez
    startSequence();

    // Calcula o tempo total da sequência (duração do vídeo + duração das notícias)
    const totalNewsDuration = 160000;
    //onst videoDuration = 10000;
    const intervaloEntreSequencias = 15 * 60 * 1000; // exibe horários por mais 1 minuto
    setTimeout(initiateSequence, totalNewsDuration + intervaloEntreSequencias);
  }

  window.addEventListener("load", () => {
    startMainLoop();
  });
});

function startMainLoop() {
  clearTimeout(window.sequenceTimeout);

  const horarios = document.getElementById("horarios");
  const avisos = document.getElementById("quadroAvisos");

  if (horarios && avisos) {
    horarios.style.display = "block";
    avisos.style.display = "none";
  }

  if (typeof setupScheduleUpdates === "function") {
    setupScheduleUpdates();
  }

  window.sequenceTimeout = setTimeout(() => {
    if (typeof initiateSequence === "function") {
      initiateSequence();
    }
  }, 30 * 60 * 1000);
}
