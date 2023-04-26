// List of common stopwords
const stopWords = new Set([
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "he",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "that",
  "the",
  "to",
  "was",
  "were",
  "will",
  "with",
]);

// Function to tokenize and remove stopwords
function processText(text) {
  const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
  const processed = sentences.map((sentence) => {
    const tokens = sentence
      .split(/\s+/)
      .filter((word) => !stopWords.has(word.toLowerCase()));
    return tokens.join(" ");
  });
  return processed.join("\n");
}

// Function to divide text into chunks
function divideIntoChunks(text) {
  const words = text.split(" ");
  const chunkSize = 16000;
  const chunks = [];
  let currentChunk = "";

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const chunkLength = currentChunk.length;
    const wordLength = word.length;

    if (chunkLength + wordLength + 1 > chunkSize) {
      // Try to find a sentence end before the chunk size limit
      let sentenceEndIndex = currentChunk.lastIndexOf(".");
      if (sentenceEndIndex === -1) {
        sentenceEndIndex = currentChunk.lastIndexOf("!");
      }
      if (sentenceEndIndex === -1) {
        sentenceEndIndex = currentChunk.lastIndexOf("?");
      }

      // If we found a sentence end, use that as the chunk end
      if (sentenceEndIndex !== -1) {
        chunks.push(currentChunk.slice(0, sentenceEndIndex + 1));
        currentChunk = currentChunk.slice(sentenceEndIndex + 1);
      } else {
        // Otherwise, just split the chunk at the limit
        chunks.push(currentChunk);
        currentChunk = word;
      }
    } else {
      currentChunk += ` ${word}`;
    }
  }

  if (currentChunk) {
    chunks.push(currentChunk);
  }

  return chunks;
}

// Set up event listener for form submission
document
  .getElementById("chunk-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const inputText = document.getElementById("text-input").value;
    const processedText = processText(inputText);
    const chunks = divideIntoChunks(processedText);
    const outputContainer = document.getElementById("output-container");
    outputContainer.innerHTML = "";

    for (let i = 0; i < chunks.length; i++) {
      const chunkHeader = document.createElement("h1");
      chunkHeader.textContent = `Chunk ${i + 1} (${chunks[i].length} characters
          , ${chunks[i].split(" ").length} words)`;
      outputContainer.appendChild(chunkHeader);

      const chunkParagraph = document.createElement("p");
      chunkParagraph.textContent = chunks[i];
      outputContainer.appendChild(chunkParagraph);
    }

    const inputLength = inputText.length;
    const inputWords = inputText.trim().split(/\s+/).length;
    const totalHeader = document.createElement("h1");
    totalHeader.textContent = `Total input (${inputLength} characters, ${inputWords} words, ${chunks.length} chunks)`;
    outputContainer.insertBefore(totalHeader, outputContainer.firstChild);
  });
