const tips = ['Antigo Testamento', 'Profeta', 'Sabedoria', 'Poesia', 'Lei Mosaica'];

const books = ['Gênesis', 'Êxodo', 'Levítico', 'Números', 'Deuteronômio', 'Josué', 'Juízes', 'Rute', '1 Samuel', '2 Samuel', '1 Reis', '2 Reis', '1 Crônicas', '2 Crônicas', 'Esdras', 'Neemias', 'Ester', 'Jó', 'Salmos', 'Provérbios', 'Eclesiastes', 'Cântico dos Cânticos', 'Isaías', 'Jeremias', 'Lamentações', 'Ezequiel', 'Daniel', 'Oséias', 'Joel', 'Amós', 'Obadias', 'Jonas', 'Miquéias', 'Naum', 'Habacuque', 'Sofonias', 'Ageu', 'Zacarias', 'Malaquias'];

const gameNumber = 1;

document.getElementById("gameNumber").innerHTML = `<b>JOGO:</b> #${gameNumber}`;

let sortedBook = '';

// Número inicial de tentativas
let guessTries = 5;
guessNumber = document.getElementById("guessTry");
guessNumber.innerHTML = "TENTATIVAS RESTANTES: " + guessTries;

(function() {
    if (!("Notification" in window)) {
        console.log("Este browser não suporta notificações de Desktop");
    }
    document.getElementById("guess").focus();
    tipsDiv = document.getElementById('tips');
    
    let tip = '';
    for (i = 0; i < tips.length; i++) {
        tip += `<p id="tip">${tips[i]}</p>`;
    }
    tipsDiv.innerHTML = tip;

    booksDiv = document.getElementById("books");
    let book = '';
    for (i = 0; i < books.length; i++) {
        book += `<option>${books[i]}</option>`;
    }
    booksDiv.innerHTML = book;

    sortRandomBook = Math.floor(Math.random() * books.length);
    sortedBook = books[sortRandomBook];

    console.log("Resposta: "+ sortedBook);
})();

const triesArr = [];
let tries = 0; // Mover para fora da função para manter o estado
var detect = document.getElementById("guess");

detect.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
        guess();
    }
})

function triesCounter() {
    tries++;
    return tries;
}

function alert(text, time) {
    let box = document.createElement('p');
    box.innerHTML = text;
    box.classList.add('alert');
    document.querySelector("#alerts").appendChild(box);
    setTimeout(() => {
        $('.alert').fadeOut(500, function() {
            $(this).remove(); // Remover após fadeOut
        });
    }, time);
}

function guess() {
    guessInput = document.getElementById("guess");

    if (triesArr.includes(guessInput.value)) {
        alert("Esse termo já foi!", 2000);
        guessInput.value = "";
    } else {
        if (guessInput.value == sortedTerm) {

            alert("Você acertou!", 2000);
            let box = document.createElement('p');
            box.innerHTML = guessInput.value;
            box.classList.add('correctTry', 'newTry');
    
            document.querySelector("#tries").appendChild(box);
    
            guessInput.value = "";
            document.getElementById("guess").style.display = "none";
            document.getElementById("send").style.display = "none";
            triesCounter()

            let correctAnswer = document.createElement('h3');
            correctAnswer.innerHTML = `Correto!
            <p style="font-size: 12pt; font-weight: normal;">Você acertou na <b>${5 - (guessTries - tries)}ª</b> tentativa.</p>
            <button id="share" onclick="share();"><i class="fa-solid fa-share-nodes"></i> Compartilhar</button>`;
            correctAnswer.classList.add('correctAnswer');
            
            document.getElementById("screen").innerHTML = "";
            document.querySelector("#screen").appendChild(correctAnswer);
            
    
            triesArr.push(guessInput.value);
        } else {
            if (!biblicalTerms.includes(guessInput.value)) { // Alterar para lista de termos bíblicos
                return;
            } else {
                triesDiv = document.getElementById("tries");
                triesCounter()
    
                guessTries--;
                guessNumber.innerHTML = "TENTATIVAS RESTANTES: " + guessTries;
    
                let guess = '';
                
                let box = document.createElement('p');
                box.innerHTML = guessInput.value;
                box.classList.add('wrongTry', 'newTry');
    
                document.querySelector("#tries").appendChild(box);
                
                triesArr.push(guessInput.value);

                guessInput.value = "";

                // Se as tentativas acabarem
                if (guessTries <= 0) {
                    alert("Você perdeu!", 2000);
                    guessInput.value.innerHTML = "";
                    document.getElementById("guess").style.display = "none";
                    document.getElementById("send").style.display = "none";

                    let correctAnswer = document.createElement('h3');
                    correctAnswer.innerHTML = `Você perdeu!
                    <p style="font-size: 12pt; font-weight: normal;">A resposta era <b>${sortedTerm}</b>.</p>`;
                    correctAnswer.classList.add('correctAnswer');
                    
                    document.getElementById("screen").innerHTML = "";
                    document.querySelector("#screen").appendChild(correctAnswer);
                }
                
            }
        }
    }  
}