document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('examForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar el envío del formulario

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

        checkTextAnswer('q1', correctAnswers.q1);
        checkRadioAnswer('q2', correctAnswers.q2);
        checkCheckboxAnswer('q3', correctAnswers.q3);
        checkSelectAnswer('q4', correctAnswers.q4);
        checkTextAnswer('q5', correctAnswers.q5);
        checkRadioAnswer('q6', correctAnswers.q6);
        checkCheckboxAnswer('q7', correctAnswers.q7);
        checkSelectAnswer('q8', correctAnswers.q8);
        checkTextAnswer('q9', correctAnswers.q9);
        checkRadioAnswer('q10', correctAnswers.q10);

        // Limitar la puntuación mínima a 0
        score = Math.max(0, score);

        // Mostrar la puntuación
        const form = document.getElementById('examForm');
        form.innerHTML = `
            <h2>Resultado del examen</h2>
            <p>Tu puntuación es: ${score.toFixed(2)} / ${totalQuestions}</p>
            <button onclick="location.reload()">Volver a intentar</button>
        `;
    });

    function checkTextAnswer(questionId, correctAnswer) {
        const userAnswer = document.getElementById(questionId).value.trim().toLowerCase();
        if (userAnswer) {
            if (userAnswer === correctAnswer.toLowerCase()) {
                score++;
            } else {
                score--;
            }
        }
    }

    function checkRadioAnswer(questionName, correctAnswer) {
        const userAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
        if (userAnswer) {
            if (userAnswer.value === correctAnswer) {
                score++;
            } else {
                score--;
            }
        }
    }

    function checkCheckboxAnswer(questionName, correctAnswers) {
        const checkboxes = document.querySelectorAll(`input[name="${questionName}[]"]:checked`);
        const userAnswers = Array.from(checkboxes).map(checkbox => checkbox.value.trim().toLowerCase()).sort();
        const correctNormalized = correctAnswers.map(a => a.trim().toLowerCase()).sort();

        if (userAnswers.length > 0) {
            if (JSON.stringify(userAnswers) === JSON.stringify(correctNormalized)) {
                score++;
            } else {
                score--;
            }
        }
    }

    function checkSelectAnswer(questionId, correctAnswer) {
        const userAnswer = document.getElementById(questionId).value;
        if (userAnswer && userAnswer !== "EnBlanco") {
            if (userAnswer === correctAnswer) {
                score++;
            } else {
                score--;
            }
        }
    }
});
