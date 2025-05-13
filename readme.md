# 🖥️ Painel de Horários e Avisos - DCET II

Projeto para exibição dinâmica de horários de aulas, notícias institucionais e avisos em um painel digital.

## 📌 Funcionalidades Principais
- **Horários em tempo real**: Exibe as aulas do dia filtradas por turno (manhã, tarde, noite).
- **Quadro de notícias**: Rotação automática de imagens (30 segundos cada).
- **Vídeo introdutório**: Reprodução automática com opção de ativar som.
- **Modo offline**: Exibe tela especial quando a conexão é perdida.
- **Atualização automática**: Ciclo contínuo entre horários e notícias.

## ⚙️ Configuração e Instalação

### Pré-requisitos
- Servidor web (Apache, Nginx, ou similar)
- Navegador moderno (Chrome, Firefox, Edge)

### Estrutura de Arquivos

assets/
├── video/intro.mp4                # Vídeo de abertura
├── doc/noticias/                  # Imagens de notícias (PNG/JPG)
├── doc/horarios/                  # CSVs com horários
public/
├── index.html
├── assets/js/
│   ├── classTime.js               # Lógica de horários e notícias
│   ├── internetCheck.js           # Controle de conexão
│   └── ...                        # Outros scripts

### 🚀 Como Usar
Substitua os arquivos:

Adicione seus CSVs em assets/doc/horarios/.

Coloque notícias em assets/doc/noticias/.

Edite classTime.js para ajustar tempos:

setTimeout(nextNews, 30000); // 30s por notícia
const intervaloEntreSequencias = 30 * 1000; // 30s entre ciclos

### 🔧 Variáveis de Tempo
classTime.js	setTimeout(nextNews)	30000	Tempo por notícia (30s).
classTime.js	intervaloEntreSequencias	30000	Espera entre ciclos (30s).
refresh.js	setInterval	30 * 60 * 1000	Reinício do painel (30m).

### 📦 Dependências
Papa Parse (leitura de CSVs).
Bootstrap 5 (estilos).
Google Fonts (Roboto).

### 🛠️ Troubleshooting
Problema: Notícias não aparecem.
Solução: Verifique os caminhos das imagens em noticias[] (em classTime.js).

Problema: Horários não atualizam.
Solução: Confira se os CSVs têm cabeçalhos corretos (disciplina, professor, inicio, fim, sala).