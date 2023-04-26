var dictionary = new Typo("en_US");

function correctSpelling(text) {
  var words = text.split(" ");
  var corrections = [];

  for (var i = 0; i < words.length; i++) {
    if (!dictionary.check(words[i])) {
      var suggestions = dictionary.suggest(words[i]);
      var correction = suggestions[0];
      words[i] = correction;

      // Add the original word and correction to the corrections list
      corrections.push({ original: words[i], corrected: correction });
    }
  }

  // Log the corrections to the console
  console.log("Corrections made:", corrections);

  return words.join(" ");
}

function divideIntoChunks(text) {
  const words = text.split(" ");
  const chunkSize = 16000;
  const chunks = [];
  let currentChunk = "";

  // ... rest of the divideIntoChunks function ...

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  const correctedChunks = chunks.map((chunk) => correctSpelling(chunk));

  const container = document.createElement("div");
  container.classList.add("chunk-container");

  for (let i = 0; i < correctedChunks.length; i++) {
    const chunkHeader = document.createElement("h1");
    chunkHeader.textContent = `Chunk ${i + 1} (${
      correctedChunks[i].length
    } characters, ${correctedChunks[i].split(" ").length} words)`;
    container.appendChild(chunkHeader);

    const chunkParagraph = document.createElement("p");
    chunkParagraph.textContent = correctedChunks[i];
    container.appendChild(chunkParagraph);
  }

  const inputLength = text.length;
  const inputWords = text.trim().split(/\s+/).length;
  const totalHeader = document.createElement("h1");
  totalHeader.textContent = `Total input (${inputLength} characters, ${inputWords} words, ${correctedChunks.length} chunks)`;
  container.insertBefore(totalHeader, container.firstChild);

  return container;
}

const form = document.getElementById("chunk-form");
const input = document.getElementById("text-input");
const output = document.getElementById("output-container");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value;
  const chunksContainer = divideIntoChunks(text);
  output.innerHTML = "";
  output.appendChild(chunksContainer);

  const totalHeader = chunksContainer.querySelector(":first-child");
  console.log(totalHeader.textContent);
});
