document.addEventListener('DOMContentLoaded', function () {
    console.log("El DOM está listo"); // Verifica que el DOM esté listo

    const countdownElement = document.getElementById('countdown');
    let timeLeft = 120; // 2 minutos en segundos
    let countdownInterval;

    // Definir las respuestas correctas aquí para que estén disponibles en todo el script
    const correctAnswers = {
        q1: "polvos flu",
        q2: "Jugar al Quidditch",
        q3: "Lealtad",
        q4: "Pociones",
        q5: "Nicolas Flamel",
        q6: "Las mazmorras",
        q7: "Hedwig",
        q8: "Azul",
        q9: "Thestrals",
        q10: "Pluma de Fénix"
    };

    // Iniciar el temporizador
    function startCountdown() {
        countdownInterval = setInterval(function () {
            if (timeLeft <= 0) {
                clearInterval(countdownInterval);
                const score = calculateScore(); // Calcular el puntaje
                showResults(score, 10, correctAnswers); // Mostrar resultados
                countdownElement.innerHTML = "¡Se acabó el tiempo!";
            } else {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                countdownElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                timeLeft--;
            }
        }, 1000);
    }

    startCountdown(); // Iniciar el temporizador

    document.getElementById('examForm').addEventListener('submit', function (event) {
        event.preventDefault();
        clearInterval(countdownInterval); // Detener el temporizador

        const score = calculateScore(); // Calcular el puntaje
        showResults(score, 10, correctAnswers);
    });

    // Función para calcular el puntaje
    function calculateScore() {
        let score = 0;
        score += checkTextAnswer('q1', correctAnswers.q1);
        score += checkRadioAnswer('q2', correctAnswers.q2);
        score += checkRadioAnswer('q3', correctAnswers.q3);
        score += checkSelectAnswer('q4', correctAnswers.q4);
        score += checkTextAnswer('q5', correctAnswers.q5);
        score += checkRadioAnswer('q6', correctAnswers.q6);
        score += checkRadioAnswer('q7', correctAnswers.q7);
        score += checkSelectAnswer('q8', correctAnswers.q8);
        score += checkTextAnswer('q9', correctAnswers.q9);
        score += checkRadioAnswer('q10', correctAnswers.q10);
        return score; // Devolver el puntaje total
    }


    // Funciones para verificar respuestas
    function checkTextAnswer(questionId, correctAnswer) {
        const userAnswer = document.getElementById(questionId).value.trim().toLowerCase();
        if (!userAnswer) return 0; // No contestada
        return userAnswer === correctAnswer.toLowerCase() ? 1 : -1;
    }

    function checkRadioAnswer(questionName, correctAnswer) {
        const userAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
        if (!userAnswer) return 0; // No contestada
        return userAnswer.nextElementSibling.textContent === correctAnswer ? 1 : -1;
    }

    function checkSelectAnswer(questionId, correctAnswer) {
        const userAnswer = document.getElementById(questionId).value;
        if (!userAnswer || userAnswer === "") return 0; // No contestada
        return userAnswer === correctAnswer ? 1 : -1;
    }

    // Función para mostrar resultados
    function showResults(score, totalQuestions, correctAnswers) {
        const form = document.getElementById('examForm');
        let resultsHTML = `<h2>Resultado del examen: ${score} / ${totalQuestions}</h2>`;

        // Mostrar corrección de cada pregunta
        resultsHTML += `
            <div class="result-group">
                <p><strong>1. ¿Qué polvos usan los magos para cuando viajan por chimeneas?</strong></p>
                <p class="${getAnswerClass('q1', correctAnswers.q1)}">Tu respuesta: ${getTextAnswer('q1') || "No contestada"}</p>
                ${getTextAnswer('q1') ? `<p>Respuesta correcta: ${correctAnswers.q1}</p>` : ''}
            </div>
            <div class="result-group">
                <p><strong>2. ¿Qué actividad le gusta hacer a Harry Potter en Hogwarts?</strong></p>
                <p class="${getAnswerClass('q2', correctAnswers.q2)}">Tu respuesta: ${getRadioAnswer('q2') || "No contestada"}</p>
                ${getRadioAnswer('q2') ? `<p>Respuesta correcta: ${correctAnswers.q2}</p>` : ''}
            </div>
            <div class="result-group">
                <p><strong>3. ¿Qué cualidades valoran más los de Hufflepuff?</strong></p>
                <p class="${getAnswerClass('q3', correctAnswers.q3)}">Tu respuesta: ${getRadioAnswer('q3') || "No contestada"}</p>
                ${getRadioAnswer('q3') ? `<p>Respuesta correcta: ${correctAnswers.q3}</p>` : ''}
            </div>
            <div class="result-group">
                <p><strong>4. ¿Cuál es la clase que da el profesor Snape?</strong></p>
                <p class="${getAnswerClass('q4', correctAnswers.q4)}">Tu respuesta: ${getSelectAnswer('q4') || "No contestada"}</p>
                ${getSelectAnswer('q4') ? `<p>Respuesta correcta: ${correctAnswers.q4}</p>` : ''}
            </div>
            <div class="result-group">
                <p><strong>5. ¿Quién es el creador de la piedra filosofal?</strong></p>
                <p class="${getAnswerClass('q5', correctAnswers.q5)}">Tu respuesta: ${getTextAnswer('q5') || "No contestada"}</p>
                ${getTextAnswer('q5') ? `<p>Respuesta correcta: ${correctAnswers.q5}</p>` : ''}
            </div>
            <div class="result-group">
                <p><strong>6. ¿En qué lugar de Hogwarts se encuentran los dormitorios de Slytherin?</strong></p>
                <p class="${getAnswerClass('q6', correctAnswers.q6)}">Tu respuesta: ${getRadioAnswer('q6') || "No contestada"}</p>
                ${getRadioAnswer('q6') ? `<p>Respuesta correcta: ${correctAnswers.q6}</p>` : ''}
            </div>
            <div class="result-group">
                <p><strong>7. ¿Cómo se llama la lechuza de Harry Potter?</strong></p>
                <p class="${getAnswerClass('q7', correctAnswers.q7)}">Tu respuesta: ${getRadioAnswer('q7') || "No contestada"}</p>
                ${getRadioAnswer('q7') ? `<p>Respuesta correcta: ${correctAnswers.q7}</p>` : ''}
            </div>
            <div class="result-group">
                <p><strong>8. ¿Qué color representa a la casa de Ravenclaw?</strong></p>
                <p class="${getAnswerClass('q8', correctAnswers.q8)}">Tu respuesta: ${getSelectAnswer('q8') || "No contestada"}</p>
                ${getSelectAnswer('q8') ? `<p>Respuesta correcta: ${correctAnswers.q8}</p>` : ''}
            </div>
            <div class="result-group">
                <p><strong>9. ¿Qué criaturas invisibles tiran de las carrozas en Hogwarts?</strong></p>
                <p class="${getAnswerClass('q9', correctAnswers.q9)}">Tu respuesta: ${getTextAnswer('q9') || "No contestada"}</p>
                ${getTextAnswer('q9') ? `<p>Respuesta correcta: ${correctAnswers.q9}</p>` : ''}
            </div>
            <div class="result-group">
                <p><strong>10. ¿De qué está hecha la varita de Harry Potter?</strong></p>
                <p class="${getAnswerClass('q10', correctAnswers.q10)}">Tu respuesta: ${getRadioAnswer('q10') || "No contestada"}</p>
                ${getRadioAnswer('q10') ? `<p>Respuesta correcta: ${correctAnswers.q10}</p>` : ''}
            </div>
            <button onclick="location.reload()">Volver a intentar</button>
        `;

        form.innerHTML = resultsHTML;
    }

    // Funciones auxiliares
    function getTextAnswer(questionId) {
        const userAnswer = document.getElementById(questionId).value.trim();
        return userAnswer ? userAnswer : null; // Devuelve la respuesta del input de texto
    }

    function getRadioAnswer(questionName) {
        const userAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
        if (!userAnswer) return null; // No contestada
        return userAnswer.nextElementSibling.textContent; // Devuelve el texto del label asociado
    }

    function getSelectAnswer(questionId) {
        const userAnswer = document.getElementById(questionId);
        return userAnswer.value ? userAnswer.options[userAnswer.selectedIndex].text : null; // Devuelve el texto de la opción seleccionada
    }

    function getAnswerClass(questionId, correctAnswer) {
        // Verificar si es un campo de texto o select
        const inputElement = document.getElementById(questionId);
        if (inputElement) {
            const userAnswer = inputElement.value.trim().toLowerCase();
            if (!userAnswer) return "no-answer"; // No contestada
            return userAnswer === correctAnswer.toString().toLowerCase() ? "correct" : "incorrect";
        }
    
        // Verificar si es un radio button
        const radioButtons = document.querySelectorAll(`input[name="${questionId}"]`);
        if (radioButtons.length > 0) {
            const selectedRadio = document.querySelector(`input[name="${questionId}"]:checked`);
            if (!selectedRadio) return "no-answer"; // No contestada
            return selectedRadio.nextElementSibling.textContent === correctAnswer ? "correct" : "incorrect";
        }
    
        return "no-answer"; // Por defecto, si no se encuentra el elemento
    }
});