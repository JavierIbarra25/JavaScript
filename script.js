document.addEventListener('DOMContentLoaded', function() {
document.getElementById('examForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    score = 0;
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

    // Cambiar el contenido del formulario por el resultado
    const form = document.getElementById('examForm');
    form.innerHTML = `
        <h2>Resultado del examen</h2>
        <p>Tu puntuación es: ${score.toFixed(2)} / ${totalQuestions}</p>
        <button onclick="location.reload()">Volver a intentar</button>
    `;
});

    function checkTextAnswer(questionId, correctAnswer) {
        const userAnswer = document.getElementById(questionId).value.trim().toLowerCase();
        if (userAnswer === "") {
            return; 
        }
        if (userAnswer === correctAnswer.toLowerCase()) {
            score++;
        }
    }

    function checkRadioAnswer(questionName, correctAnswer) {
        const userAnswer = document.querySelector(`input[name="${questionName}"]:checked`);
        if (!userAnswer) {
            return; 
        }
        if (userAnswer.value === correctAnswer) {
            score++;
        } else {
            score -= 0.33; // Penalización por respuesta incorrecta
        }
    }

    function checkCheckboxAnswer(questionName, correctAnswers) {
    // Obtener todos los checkboxes 
    const checkboxes = document.querySelectorAll(`input[name="${questionName}"]`);

    // Array para almacenar las respuestas del usuario
    const userAnswers = [];

    // Recorrer cada checkbox
    checkboxes.forEach(checkbox => {
        // Si el checkbox está marcado, agregar su valor al array de respuestas del usuario
        if (checkbox.checked) {
            userAnswers.push(checkbox.value);
        }
    });

    // Comparar las respuestas del usuario con las respuestas correctas
     if (userAnswers.length === 0) {
        return; // Si no hay respuestas, no hacer nada
     }
    const isCorrect = userAnswers.every(answer => correctAnswers.includes(answer)) && correctAnswers.every(answer => userAnswers.includes(answer));
        if (isCorrect) {
        score++;
        } 

        else {
        score -= 0.33; 
        }   
    }

    function checkSelectAnswer(questionId, correctAnswer) {
        const userAnswer = document.getElementById(questionId).value;
        if (userAnswer === "") {
            return; 
        }
        if (userAnswer === correctAnswer) {
            score++;
        } else {
            score -= 0.33; 
        }
    }
});