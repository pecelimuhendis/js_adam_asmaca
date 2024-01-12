const word_el = document.getElementById('word'); /* word id sine erişildi */
const popup = document.getElementById('popup-container');
const message_el = document.getElementById('success-message');
const wrongLetters_el = document.getElementById('wrong-letters');
const items = document.querySelectorAll('.item');
const playAgainBtn = document.getElementById('play-again');
const message = document.getElementById('message');

/* _el element olduğunu gösterir */

const correctLetters = []; /* bilinen kelimeler  */
const wrongLetters = []; /* olmayan (hatalı) kelimeler */
let selectedWord = getRandomWord();



function getRandomWord() {
    /* random kelime oluşumu */
    const words = ["javascript", "java", "python","html", "css", "cpp", "php", "asp", "nodejs"];
    return words[Math.floor(Math.random() * words.length)]; /* words dizinden kelime sayısı kadar random veri döndürür */
}
console.log(getRandomWord());/*  console da random kelimeler gözlenir*/

function displayWord() {
    /* html deki letter=harf bilgisi */
    /* map methodu ile her harf dönüşür */
    word_el.innerHTML =
        `
       ${selectedWord.split('').map(letter => `
           <div class ="letter">
              ${correctLetters.includes(letter) ? letter : ''} 
            </div>
        `).join('')}
    `;

    /* console.log(word_el.innerText);  bilinen harflerin console da görünümü*/

    const w = word_el.innerText.replace(/\n/g, '');
    if (w === selectedWord) {
        popup.style.display = 'flex';
        message_el.innerText = 'Tebrikler Kazandınız!';
    }
}

function updateWrongLetters() {
    wrongLetters_el.innerHTML = `
${wrongLetters.length > 0 ? '<h3>Hatalı Kelimeler </h3>' : ''}
${wrongLetters.map(letter => `<span> ${letter} <span>`)}
`;

    items.forEach((item, index) => {
        const errorCount = wrongLetters.length;
        /* item bilgisi adamın eleman sayısını verir */
        if (index < errorCount) {
            /* index bilgisi hatalı harf sayısından küçükse adamın şekli block görünür olur */
            item.style.display = 'block';
        }
        else {
            item.style.display = 'none';
        }
    })
    if (wrongLetters.length === items.length) {
        /* item.length item eleman sayısını, wrongLetters.length atalı eleman sayısnı verir. ikisi eşit olduğunda oyun kaybeder */
        popup.style.display = 'flex';
        message_el.innerText = 'Maalesef Kaybettiniz!';

    }
}
function displayMessage() {
    message.classList.add('show');

    setTimeout(function () {
        message.classList.remove('show');
    }, 2000); 
} /* mesajın 2 saniye sonra kaybolması /* bu harfi zaten eklediniz */

playAgainBtn.addEventListener('click', function () {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = getRandomWord();
    displayWord();
    updateWrongLetters();

    popup.style.display = 'none';
});


window.addEventListener('keydown', function (e) {
    if (e.keyCode >= 65 && e.keyCode <= 106) {
        const letter = e.key;

        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            }
            else {
                displayMessage();
            }
        }
        else {
            if (!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);
                /* console.log('hatalı harfleri güncelle'); */
                updateWrongLetters();
            }
            else {
                displayMessage();
            }
        }
    }

});

displayWord()