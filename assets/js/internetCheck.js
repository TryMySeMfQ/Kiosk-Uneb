function setOfflineMode(offline) {
  const overlay = document.getElementById("offline-overlay");
  const body = document.body;
  const news = document.querySelector(".news-container");
  const horarios = document.getElementById("horarios");
  const avisos = document.getElementById("quadroAvisos");

  if (offline) {
    overlay.style.display = "flex";
    if (news) news.style.display = "none";
    if (horarios) horarios.style.display = "none";
    if (avisos) avisos.style.display = "none";

    body.style.padding = "132px";
    body.style.textAlign = "center";
    body.style.fontFamily = "'Gilroy-Medium', sans-serif";
    body.style.color = "white";
    body.style.background = "#221a24";
  } else {
    overlay.style.display = "none";
    if (news) news.style.display = "flex";
    if (horarios) horarios.style.display = "block";
    if (avisos) avisos.style.display = "none";

    body.removeAttribute("style");

    if (typeof initiateSequence === 'function') {
      initiateSequence();
    }
    if (typeof updateSchedule === 'function') {
      updateSchedule();
    }
  }
}

function checkLocalConnection() {
  // Verifica se há conexão com o próprio servidor
  fetch("/ping.txt", { cache: "no-store" })
    .then(() => setOfflineMode(false))
    .catch(() => setOfflineMode(true));
}

// Escuta eventos do navegador
window.addEventListener("online", checkLocalConnection);
window.addEventListener("offline", () => setOfflineMode(true));

// Verificação inicial
if (!navigator.onLine) {
  setOfflineMode(true);
} else {
  checkLocalConnection();
}

// Verifica periodicamente a conexão
setInterval(checkLocalConnection, 60 * 1000); // a cada 1 minuto

/*window.addEventListener("online", () => {
  if (typeof startMainLoop === 'function') {
    startMainLoop();
  }

  if (typeof updateSchedule === 'function') {
    updateSchedule();
  }
});*/