# 🖥️ Painel de Horários e Avisos - DCET II

![Status](https://img.shields.io/badge/Status-In_Development-green?style=for-the-badge&logo=git&logoColor=white&labelColor=464646&color=2EA043)
![Versão](https://img.shields.io/badge/Versão-1.0-blue)

## 📋 Descrição
Projeto desenvolvido para a exibição dinâmica de horários de aulas, notícias institucionais e avisos no contexto universitário, promovendo maior integração entre a comunidade acadêmica e as informações institucionais.

## ✨ Funcionalidades
- 🕒 **Horários em tempo real**: Exibição das aulas do dia, com filtragem por turno (manhã, tarde, noite).
- 📰 **Quadro de notícias**: Rotação automática de imagens institucionais a cada 30 segundos.
- 📹 **Vídeo introdutório**: Reprodução automática com opção de ativar o áudio.
- 🌐 **Modo offline**: Tela especial informando perda de conexão.
- 📌 **Atualização automática**: Ciclo contínuo entre horários e quadro de notícias.

## 🛠️ Stack Tecnológico
| Componente | Tecnologia |
|------------|------------|
| Frontend | HTML5, CSS3, JavaScript ES6+ |
| Bibliotecas | Papa Parse 5.3, Bootstrap 5.2 |
| Hardware | Raspberry Pi 4 Model B |
| Sistema | Raspberry Pi OS Lite |

## ⚙️ Configuração e Instalação

### ✅ Pré-requisitos
- Servidor web (Apache, Nginx ou similar)
- Navegador moderno (Chrome, Firefox, Edge)
- Raspberry Pi (utilizado no modo quiosque com Bash Script)
  
```bash
# Para deploy em Raspberry Pi
sudo apt update && sudo apt install -y chromium-browser unclutter
```
### 📁 Estrutura de Arquivos

```
KIOSK-MAIN/
├── .github/
├── assets/
│   ├── audio/
│   │   ├── alert.mp3
│   │   └── desktop.ini
│   ├── css/
│   │   ├── desktop.ini
│   │   └── style.css
│   ├── doc/
│   ├── horarios/              # Arquivos .csv com horários
│   ├── noticias/              # Imagens de notícias (.jpg/.png)
│   ├── image/
│   │   ├── bannerAulas.png
│   │   ├── dayOff.jpg
│   │   ├── desktop.ini
│   │   ├── humidy.png
│   │   ├── rain.png
│   │   └── wind.png
│   └── js/
│       ├── classTime_old.js
│       ├── classTime.js
│       ├── classTime1.js
│       ├── dataHora.js
│       ├── desktop.ini
│       └── internetCheck.js
├── dias/
├── index.html
├── intro/
├── .gitignore
├── favicon.ico
├── news1.png
├── ping.txt
├── qrcode.ipynb
└── readme.md
```

## 🚀 Como Usar

1. **Substitua os arquivos conforme necessário:**
   - Adicione seus arquivos `.csv` em `assets/doc/horarios/`.
   - Coloque as imagens de notícias em `assets/doc/noticias/`.

2. **Configuração de tempo:**
   - No arquivo `classTime.js`:
     ```js
     setTimeout(nextNews, 30000); // Tempo por notícia (30s)
     const intervaloEntreSequencias = 30 * 1000; // Tempo entre ciclos (30s)
     ```
   - No `refresh.js`:
     ```js
     setInterval(() => location.reload(), 30 * 60 * 1000); // Reinício a cada 30 minutos
     ```

## 🖥️ Execução em Modo Quiosque com Raspberry Pi

O sistema foi configurado para rodar automaticamente em uma televisão utilizando um **Raspberry Pi** em modo **kiosk**, com auxílio de scripts Bash que iniciam o navegador em tela cheia ao ligar o dispositivo, garantindo funcionamento contínuo e autônomo.

## 📦 Dependências

- [Papa Parse](https://www.papaparse.com/) – Leitura de arquivos CSV
- [Bootstrap 5](https://getbootstrap.com/) – Estilização responsiva
- [Google Fonts – Roboto](https://fonts.google.com/specimen/Roboto) – Tipografia

## 🛠️ Troubleshooting

| Problema                       | Solução                                                                 |
|-------------------------------|--------------------------------------------------------------------------|
| Notícias não aparecem         | Verifique os caminhos e nomes das imagens no array `noticias[]` no `classTime.js`. |
| Horários não atualizam        | Confirme se os arquivos CSV possuem os cabeçalhos corretos:<br>`disciplina`, `professor`, `inicio`, `fim`, `sala`. |

## 👩‍💻 Sobre o Projeto de Extensão

Como **Bolsista de Extensão**, participei de projetos voltados para a integração entre universidade e comunidade, com foco no desenvolvimento de ações educativas e tecnológicas que impactaram positivamente a sociedade. Durante a bolsa, atuei na organização e execução de eventos, oficinas e palestras, além de colaborar com a elaboração de materiais educativos e soluções práticas para problemas enfrentados pela comunidade.

A experiência fortaleceu minhas habilidades em **trabalho em equipe**, **gestão de projetos** e **comunicação**.

## 📄 Licença

Este projeto é de uso institucional. Para uso ou modificação externa, consulte a coordenação responsável pelo DCET II.

