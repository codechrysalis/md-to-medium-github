const englishDict = require("./english-to-morse.json");
const morseDict = require("./morse-to-english.json");

const englishInput = document.getElementById("input-english");
const morseInput = document.getElementById("input-morse");
const englishToMorseButton = document.getElementById("english-to-morse-button");
const morseToEnglishButton = document.getElementById("morse-to-english-button");

// English to Morse Conversion
englishToMorseButton.addEventListener("click", function(event) {
  const input = englishInput.value;
  document.getElementById("result-morse").innerHTML = englishToMorse(
    input.toLowerCase()
  );
});

const englishToMorse = english => {
  let str = "";
  for (char in english) {
    console.log(english[char]);
    if (english[char] == " ") {
      str += "\xa0 \xa0";
    } else {
      str += englishDict[english[char]] + " ";
    }
  }
  return str;
};

// Morse to English Conversion
morseToEnglishButton.addEventListener("click", function(event) {
  let input = morseInput.value;
  document.getElementById("result-english").innerHTML = morseToEnglish(input);
});

const morseToEnglish = morse => {
  let str = "";
  morse = morse.split(" ");
  for (char in morse) {
    str += morseDict[morse[char]];
  }
  return str;
};

// Convert current box on "Enter"
englishInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    englishToMorseButton.click();
  }
});

morseInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    morseToEnglishButton.click();
  }
});
