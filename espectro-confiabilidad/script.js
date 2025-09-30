/*
 * script.js
 * Lógica principal de la aplicación "Espectro de Confiabilidad Informativa".
 * Gestiona la navegación entre pantallas, el flujo de preguntas, la puntuación
 * y el almacenamiento del progreso en LocalStorage.
 */

const STORAGE_KEY = 'posverdad_espectro_progress_v1';

const screens = {
  start: document.getElementById('start-screen'),
  instructions: document.getElementById('instructions-screen'),
  quiz: document.getElementById('quiz-screen'),
  results: document.getElementById('results-screen')
};

const startForm = document.getElementById('start-form');
const startButton = document.getElementById('start-button');
const nameInput = document.getElementById('participant-name');
const resumeContainer = document.getElementById('resume-container');
const beginQuizButton = document.getElementById('begin-quiz');
const questionCounter = document.getElementById('question-counter');
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');
const caseTitle = document.getElementById('case-title');
const caseText = document.getElementById('case-text');
const optionsContainer = document.getElementById('options-container');
const confirmAnswerButton = document.getElementById('confirm-answer');
const feedbackContainer = document.getElementById('feedback');
const finalScore = document.getElementById('final-score');
const finalClassification = document.getElementById('final-classification');
const finalMessage = document.getElementById('final-message');
const retryButton = document.getElementById('retry-button');
const shareButton = document.getElementById('share-button');

const OPTIONS = [
  { value: 1, title: '1. Hecho verificable', description: 'Información comprobable objetivamente.' },
  { value: 2, title: '2. Opinión experta/informada', description: 'Interpretación basada en evidencia por especialista.' },
  { value: 3, title: '3. Opinión fundamentada', description: 'Punto de vista respaldado por datos y argumentos.' },
  { value: 4, title: '4. Opinión personal/subjetiva', description: 'Preferencia basada en experiencia personal.' },
  { value: 5, title: '5. Opinión sin fundamento', description: 'Intuición sin respaldo de datos.' },
  { value: 6, title: '6. Opinión basada en datos erróneos', description: 'Conclusión lógica sobre información falsa.' },
  { value: 7, title: '7. Opinión dogmática', description: 'Creencia inamovible, inmune a evidencia contraria.' },
  { value: 8, title: '8. Desinformación/mentira deliberada', description: 'Falsedad intencional para engañar.' }
];

let state = {
  name: '',
  currentIndex: 0,
  score: 0,
  attempt: 0,
  selectedOption: null,
  completed: false
};

function showScreen(target) {
  Object.values(screens).forEach((screen) => screen.classList.add('hidden'));
  screens[target].classList.remove('hidden');
}

function loadProgress() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch (error) {
    console.warn('No se pudo recuperar el progreso almacenado', error);
    return null;
  }
}

function saveProgress() {
  const progress = {
    name: state.name,
    currentIndex: state.currentIndex,
    score: state.score,
    completed: state.completed
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function clearProgress() {
  localStorage.removeItem(STORAGE_KEY);
}

function resetState(newName) {
  state = {
    name: newName,
    currentIndex: 0,
    score: 0,
    attempt: 0,
    selectedOption: null,
    completed: false
  };
  if (progressFill) {
    progressFill.style.width = '0%';
  }
  if (progressBar) {
    progressBar.setAttribute('aria-valuenow', '0');
  }
  saveProgress();
}

function restoreState(progress) {
  state = {
    ...state,
    ...progress,
    attempt: 0,
    selectedOption: null
  };
}

function toggleResumeMessage(progress) {
  if (progress && !progress.completed) {
    resumeContainer.classList.remove('hidden');
    resumeContainer.innerHTML = `
      <p><strong>¿Continuar donde te quedaste?</strong></p>
      <p>Hola ${progress.name}. Responde desde la pregunta ${progress.currentIndex + 1} de ${TOTAL_QUESTIONS}.</p>
      <div class="resume-actions">
        <button type="button" class="primary" id="resume-button">Continuar</button>
        <button type="button" class="secondary" id="restart-button">Comenzar de nuevo</button>
      </div>
    `;
    document.getElementById('resume-button').addEventListener('click', () => {
      restoreState(progress);
      nameInput.value = progress.name;
      startButton.disabled = false;
      startEvaluation(true);
    });
    document.getElementById('restart-button').addEventListener('click', () => {
      clearProgress();
      resumeContainer.classList.add('hidden');
      resumeContainer.innerHTML = '';
      nameInput.focus();
    });
  } else if (progress && progress.completed) {
    resumeContainer.classList.remove('hidden');
    resumeContainer.innerHTML = `
      <p><strong>Última puntuación:</strong> ${progress.score} de ${MAX_SCORE} puntos.</p>
      <button type="button" class="secondary" id="clear-history">Limpiar historial</button>
    `;
    document.getElementById('clear-history').addEventListener('click', () => {
      clearProgress();
      resumeContainer.classList.add('hidden');
      resumeContainer.innerHTML = '';
    });
  }
}

function updateProgressBar() {
  const progressPercentage = (state.currentIndex / TOTAL_QUESTIONS) * 100;
  progressFill.style.width = `${progressPercentage}%`;
  if (progressBar) {
    progressBar.setAttribute('aria-valuenow', Math.round(progressPercentage));
  }
}

function renderOptions() {
  optionsContainer.innerHTML = '';
  OPTIONS.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option-button';
    button.dataset.value = option.value;
    button.innerHTML = `<strong>${option.title}</strong><br><span>${option.description}</span>`;
    button.addEventListener('click', () => selectOption(option.value, button));
    optionsContainer.appendChild(button);
  });
}

function selectOption(value, buttonElement) {
  if (confirmAnswerButton.disabled === false && feedbackContainer.classList.contains('visible')) {
    return;
  }
  state.selectedOption = value;
  document.querySelectorAll('.option-button').forEach((btn) => {
    btn.classList.toggle('selected', btn === buttonElement);
  });
  confirmAnswerButton.disabled = false;
}

function disableOptions() {
  document.querySelectorAll('.option-button').forEach((btn) => {
    btn.classList.add('disabled');
    btn.disabled = true;
  });
}

function enableOptions() {
  document.querySelectorAll('.option-button').forEach((btn) => {
    btn.classList.remove('disabled', 'selected');
    btn.disabled = false;
  });
  state.selectedOption = null;
  confirmAnswerButton.disabled = true;
}

function getIncorrectExplanation(caseData, option) {
  const explanation = caseData.incorrectExplanations[option];
  return explanation || caseData.incorrectExplanations.default || 'Revisa de nuevo la descripción del espectro antes de elegir.';
}

function showFeedback({ type, title, description, primaryAction }) {
  feedbackContainer.className = `feedback visible ${type}`;
  feedbackContainer.innerHTML = `
    <h4>${title}</h4>
    <p>${description}</p>
    <div class="actions"></div>
  `;
  const actionsContainer = feedbackContainer.querySelector('.actions');
  primaryAction.forEach(({ label, handler, style = 'primary' }) => {
    const actionButton = document.createElement('button');
    actionButton.type = 'button';
    actionButton.className = style;
    actionButton.textContent = label;
    actionButton.addEventListener('click', handler);
    actionsContainer.appendChild(actionButton);
  });
}

function handleAnswer() {
  if (state.selectedOption == null) return;
  const currentCase = CASES[state.currentIndex];
  const isCorrect = state.selectedOption === currentCase.correctOption;

  confirmAnswerButton.disabled = true;
  disableOptions();

  if (isCorrect) {
    const pointsEarned = state.attempt === 0 ? 3 : 1;
    state.score += pointsEarned;
    showFeedback({
      type: 'success',
      title: state.attempt === 0 ? '✅ ¡Correcto! +3 puntos' : '✅ ¡Correcto! +1 punto',
      description: currentCase.correctExplanation,
      primaryAction: [
        {
          label: 'Siguiente Pregunta',
          handler: () => {
            feedbackContainer.classList.remove('visible');
            goToNextQuestion();
          }
        }
      ]
    });
  } else if (state.attempt === 0) {
    showFeedback({
      type: 'error',
      title: '❌ Incorrecto. Inténtalo de nuevo',
      description: getIncorrectExplanation(currentCase, state.selectedOption),
      primaryAction: [
        {
          label: 'Intentar de Nuevo',
          style: 'secondary',
          handler: () => {
            feedbackContainer.classList.remove('visible');
            state.attempt = 1;
            enableOptions();
          }
        }
      ]
    });
  } else {
    showFeedback({
      type: 'error',
      title: `❌ La respuesta correcta era: ${currentCase.correctOption}`,
      description: currentCase.correctExplanation,
      primaryAction: [
        {
          label: 'Siguiente Pregunta',
          handler: () => {
            feedbackContainer.classList.remove('visible');
            goToNextQuestion();
          }
        }
      ]
    });
  }
}

function goToNextQuestion() {
  state.currentIndex += 1;
  state.attempt = 0;
  state.selectedOption = null;
  if (state.currentIndex >= TOTAL_QUESTIONS) {
    state.completed = true;
    saveProgress();
    showResults();
  } else {
    saveProgress();
    renderQuestion();
  }
}

function renderQuestion() {
  confirmAnswerButton.disabled = true;
  enableOptions();
  const currentCase = CASES[state.currentIndex];
  questionCounter.textContent = `Pregunta ${state.currentIndex + 1} de ${TOTAL_QUESTIONS}`;
  caseTitle.textContent = `Caso ${currentCase.id}`;
  caseText.textContent = currentCase.prompt;
  updateProgressBar();
  feedbackContainer.classList.remove('visible', 'success', 'error');
  feedbackContainer.innerHTML = '';
}

function startEvaluation(resume = false) {
  showScreen('instructions');
  if (!resume) {
    resetState(nameInput.value.trim());
  }
}

function beginQuiz() {
  renderOptions();
  renderQuestion();
  showScreen('quiz');
}

function showResults() {
  showScreen('results');
  finalScore.textContent = `${state.score} de ${MAX_SCORE} puntos`;
  const classification = CLASSIFICATION.find(({ range }) => state.score >= range[0] && state.score <= range[1]);
  if (classification) {
    finalClassification.textContent = classification.title;
    finalMessage.textContent = classification.message;
  } else {
    finalClassification.textContent = '';
    finalMessage.textContent = '';
  }
  progressFill.style.width = '100%';
  if (progressBar) {
    progressBar.setAttribute('aria-valuenow', '100');
  }
  saveProgress();
}

function handleRetry() {
  clearProgress();
  feedbackContainer.classList.remove('visible', 'success', 'error');
  feedbackContainer.innerHTML = '';
  nameInput.value = state.name;
  startButton.disabled = !nameInput.value.trim();
  showScreen('instructions');
  resetState(state.name);
}

function handleShare() {
  const shareText = `Obtuve ${state.score} de ${MAX_SCORE} puntos en la evaluación "Espectro de Confiabilidad Informativa" del proyecto POSVERDAD.`;
  if (navigator.share) {
    navigator
      .share({
        title: 'Resultados POSVERDAD',
        text: shareText,
        url: window.location.href
      })
      .catch(() => {
        notifyShareFallback(shareText);
      });
  } else {
    notifyShareFallback(shareText);
  }
}

function notifyShareFallback(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert('Resultado copiado al portapapeles. ¡Compártelo con tu red!');
      })
      .catch(() => {
        alert(text);
      });
  } else {
    alert(text);
  }
}

// Eventos

startForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const participantName = nameInput.value.trim();
  if (!participantName) {
    nameInput.focus();
    return;
  }
  nameInput.value = participantName;
  startEvaluation();
});

nameInput.addEventListener('input', () => {
  startButton.disabled = nameInput.value.trim().length < 2;
});

confirmAnswerButton.addEventListener('click', handleAnswer);

beginQuizButton.addEventListener('click', () => {
  beginQuiz();
});

retryButton.addEventListener('click', () => {
  handleRetry();
});

shareButton.addEventListener('click', handleShare);

// Inicialización

document.addEventListener('DOMContentLoaded', () => {
  const progress = loadProgress();
  if (progress) {
    toggleResumeMessage(progress);
    if (progress.name) {
      nameInput.value = progress.name;
      startButton.disabled = false;
    }
  }
});

