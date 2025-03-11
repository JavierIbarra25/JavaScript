document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('examForm').addEventListener('submit', function (event) {
        event.preventDefault();

        let score = 0;
        const totalQuestions = 10;

        const correctAnswers = {
            q1: "Polvos Flu",
            q2: "quidditch",
            q3: ["lealtad"],
            q4: "Pociones",
            q5: "Nicolas Flamel",
            q6: "Slytherin",
            q7: ["Hedwig"],
            q8: "azul",
            q9: "Thestrals",
            q10: "Pluma de Fénix"
        };

        // Verificar respuestas y calcular puntuación
        score += checkTextAnswer('q1', correctAnswers.q1);
        score += checkRadioAnswer('q2', correctAnswers.q2);
        score += checkCheckboxAnswer('q3', correctAnswers.q3);
        score += checkSelectAnswer('q4', correctAnswers.q4);
        score += checkTextAnswer('q5', correctAnswers.q5);
        score += checkRadioAnswer('q6', correctAnswers.q6);
        score += checkCheckboxAnswer('q7', correctAnswers.q7);
        score += checkSelectAnswer('q8', correctAnswers.q8);
        score += checkTextAnswer('q9', correctAnswers.q9);
        score += checkRadioAnswer('q10', correctAnswers.q10);

        // Mostrar resultados
        showResults(score, totalQuestions, correctAnswers);
    });

    // Funciones para verificar respuestas
    function checkTextAnswer(questionId, correctAnswer) {
        const userAnswer = document.getElementById(questionId).value.trim().toLowerCase();
        if (!userAnswer) return 0; // No contestada
        return userAnswer === correctAnswer.toLowerCase() ? 1 : -1;
    }

    function checkRadioAnswer(questionName, correctAnswer) {
        const userAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
        if (!userAnswer) return 0; // No contestada
        return userAnswer.value === correctAnswer ? 1 : -1;
    }

    function checkCheckboxAnswer(questionName, correctAnswers) {
        const checkboxes = document.querySelectorAll(`input[name="${questionName}"]:checked`);
        if (checkboxes.length === 0) return 0; // No contestada
        const userAnswers = Array.from(checkboxes).map(cb => cb.value.trim().toLowerCase()).sort();
        const correctSorted = correctAnswers.map(a => a.trim().toLowerCase()).sort();
        return JSON.stringify(userAnswers) === JSON.stringify(correctSorted) ? 1 : -1;
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
                <p class="${getAnswerClass('q1', correctAnswers.q1)}">Tu respuesta: ${document.getElementById('q1').value || "No contestada"}</p>
                <p>Respuesta correcta: ${correctAnswers.q1}</p>
            </div>
            <div class="result-group">
                <p><strong>2. ¿Qué actividad le gusta hacer a Harry Potter en Hogwarts?</strong></p>
                <p class="${getAnswerClass('q2', correctAnswers.q2)}">Tu respuesta: ${getRadioAnswer('q2') || "No contestada"}</p>
                <p>Respuesta correcta: ${correctAnswers.q2}</p>
            </div>
            <div class="result-group">
                <p><strong>3. ¿Qué cualidades valoran más los de Hufflepuff?</strong></p>
                <p class="${getAnswerClass('q3', correctAnswers.q3)}">Tu respuesta: ${getCheckboxAnswer('q3') || "No contestada"}</p>
                <p>Respuesta correcta: ${correctAnswers.q3.join(", ")}</p>
            </div>
            <div class="result-group">
                <p><strong>4. ¿Cuál es la clase que da el profesor Snape?</strong></p>
                <p class="${getAnswerClass('q4', correctAnswers.q4)}">Tu respuesta: ${document.getElementById('q4').value || "No contestada"}</p>
                <p>Respuesta correcta: ${correctAnswers.q4}</p>
            </div>
            <div class="result-group">
                <p><strong>5. ¿Quién es el creador de la piedra filosofal?</strong></p>
                <p class="${getAnswerClass('q5', correctAnswers.q5)}">Tu respuesta: ${document.getElementById('q5').value || "No contestada"}</p>
                <p>Respuesta correcta: ${correctAnswers.q5}</p>
            </div>
            <div class="result-group">
                <p><strong>6. ¿En qué lugar de Hogwarts se encuentran los dormitorios de Slytherin?</strong></p>
                <p class="${getAnswerClass('q6', correctAnswers.q6)}">Tu respuesta: ${getRadioAnswer('q6') || "No contestada"}</p>
                <p>Respuesta correcta: ${correctAnswers.q6}</p>
            </div>
            <div class="result-group">
                <p><strong>7. ¿Cómo se llama la lechuza de Harry Potter?</strong></p>
                <p class="${getAnswerClass('q7', correctAnswers.q7)}">Tu respuesta: ${getCheckboxAnswer('q7') || "No contestada"}</p>
                <p>Respuesta correcta: ${correctAnswers.q7.join(", ")}</p>
            </div>
            <div class="result-group">
                <p><strong>8. ¿Qué color representa a la casa de Ravenclaw?</strong></p>
                <p class="${getAnswerClass('q8', correctAnswers.q8)}">Tu respuesta: ${document.getElementById('q8').value || "No contestada"}</p>
                <p>Respuesta correcta: ${correctAnswers.q8}</p>
            </div>
            <div class="result-group">
                <p><strong>9. ¿Qué criaturas invisibles tiran de las carrozas en Hogwarts?</strong></p>
                <p class="${getAnswerClass('q9', correctAnswers.q9)}">Tu respuesta: ${document.getElementById('q9').value || "No contestada"}</p>
                <p>Respuesta correcta: ${correctAnswers.q9}</p>
            </div>
            <div class="result-group">
                <p><strong>10. ¿De qué está hecha la varita de Harry Potter?</strong></p>
                <p class="${getAnswerClass('q10', correctAnswers.q10)}">Tu respuesta: ${getRadioAnswer('q10') || "No contestada"}</p>
                <p>Respuesta correcta: ${correctAnswers.q10}</p>
            </div>
            <button onclick="location.reload()">Volver a intentar</button>
        `;

        form.innerHTML = resultsHTML;
    }

    // Funciones auxiliares
    function getRadioAnswer(questionName) {
        const userAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
        return userAnswer ? userAnswer.value : null;
    }

    function getCheckboxAnswer(questionName) {
        const checkboxes = document.querySelectorAll(`input[name="${questionName}"]:checked`);
        if (checkboxes.length === 0) return null;
        return Array.from(checkboxes).map(cb => cb.value).join(", ");
    }

    function getAnswerClass(questionId, correctAnswer) {
        const userAnswer = document.getElementById(questionId) ? document.getElementById(questionId).value.trim().toLowerCase() : null;
        if (!userAnswer) return "no-answer"; // No contestada
        return userAnswer === correctAnswer.toString().toLowerCase() ? "correct" : "incorrect";
    }
});