const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.querySelector(".result");
const sound = document.querySelector("audio");
const btn = document.querySelector(".search__box--btn");

btn.onclick = () => {
  let inputWord = document.querySelector(".search__box--input").value;
  fetch(`${url}${inputWord}`)
    .then((response) => response.json())
    .then((data) => {
      result.innerHTML = `
      <div class="result__word">
        <h3 class="result__word--text">${inputWord}</h3>
        <button class="result__word--btn" onclick="playAudio()" title="Sometimes might not have audio"><i class="fa-solid fa-volume-high"></i></button>
      </div>
      <div class="result__details">
        <p class="result__datails--text">${data[0].meanings[0].partOfSpeech}</p>
        <p class="result__details--phonetic">${data[0].phonetics[0].text}</p>
      </div>
      <p class="result__word--meaning">
        ${data[0].meanings[0].definitions[0].definition}
      </p>
      <p class="result__word--example">
      ${data[0].meanings[0].definitions[0].example || "Unprecedented"}
      </p>
      `;
      sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
    })
    .catch( () => {
      result.innerHTML = `<h3 class='result__wrong'>Couldn't find the word: "${inputWord}"</h3>`
    })
};

function playAudio() {
  sound.play();
}