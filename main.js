document.addEventListener('DOMContentLoaded', fetchRandomQuote);

function fetchRandomQuote() {
  fetch('http://localhost:7000/api/quotes/random')
    .then(response => response.json())
    .then(quote => displayQuote(quote))
    .catch(error => console.error('Error fetching random quote:', error));
}

function searchQuotes() {
  const authorInput = document.getElementById('authorInput').value;
  if (authorInput.trim() !== '') {
    fetch(`http://localhost:7000/api/quotes/search?author=${encodeURIComponent(authorInput)}`)
      .then(response => response.json())
      .then(quotes => displayQuotes(quotes))
      .catch(error => console.error('Error searching quotes:', error));
  }
}

function displayQuote(quote) {
  const quoteContainer = document.getElementById('quote-container');
  quoteContainer.innerHTML = `
    <div class="card">
      <div class="card-body">
        <blockquote class="blockquote mb-0">
          <p>${quote.text}</p>
          <footer class="blockquote-footer">${quote.author}</footer>
        </blockquote>
      </div>
    </div>
  `;
}

function displayQuotes(quotes) {
  const quoteContainer = document.getElementById('quote-container');
  if (quotes.length === 0) {
    quoteContainer.innerHTML = '<p>No quotes found for the given author.</p>';
  } else {
    quoteContainer.innerHTML = '';
    quotes.forEach(quote => {
      const card = document.createElement('div');
      card.classList.add('card', 'mb-3');
      card.innerHTML = `
        <div class="card-body">
          <blockquote class="blockquote mb-0">
            <p>${quote.text}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
          </blockquote>
        </div>
      `;
      quoteContainer.appendChild(card);
    });
  }
}
