document.getElementById('chunk-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const MAX_CHUNK_SIZE = 16000;
  let textInput = document.getElementById('text-input').value;
  let sentences = textInput.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");

  let chunks = [];
  let chunk = '';

  sentences.forEach(sentence => {
    if ((chunk + sentence).length > MAX_CHUNK_SIZE) {
      chunks.push(chunk);
      chunk = sentence;
    } else {
      chunk += sentence;
    }
  });

  // Push the last chunk
  chunks.push(chunk);

  let outputContainer = document.getElementById('output-container');
  outputContainer.innerHTML = '';  // Clear previous output

  // Append information about the total text
  let totalCharacters = textInput.length;
  let totalWords = textInput.split(/\s+/).length;
  let totalChunks = chunks.length;

  outputContainer.innerHTML += `<h1>Total Characters: ${totalCharacters}, Total Words: ${totalWords}, Total Chunks: ${totalChunks}</h1>`;

  // Append information about each chunk
  chunks.forEach((chunk, i) => {
    let chunkCharacters = chunk.length;
    let chunkWords = chunk.split(/\s+/).length;

    let detailsElem = document.createElement('details');
    detailsElem.innerHTML = `
      <summary>Chunk ${i+1}: Characters: ${chunkCharacters}, Words: ${chunkWords}
        <button class="copy-btn" data-chunk="${chunk}">Copy</button>
      </summary>
      <p>${chunk}</p>
    `;
    outputContainer.appendChild(detailsElem);
  });

  // Add event listener to copy buttons
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();  // prevent the details from toggling when copy button is clicked
      navigator.clipboard.writeText(this.dataset.chunk)
        .catch(err => console.error('Could not copy text: ', err));
    });
  });
});
