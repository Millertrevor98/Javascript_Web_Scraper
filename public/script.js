document.addEventListener('DOMContentLoaded', () => {
    const scrapeForm = document.getElementById('scrapeForm');
    const resultDiv = document.getElementById('result');
  
    scrapeForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const url = document.getElementById('url').value;
  
      // Make an AJAX request to the server to scrape data
      fetch('/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      })
        .then((response) => response.json())
        .then((data) => {
          resultDiv.innerHTML = data.html;
        })
        .catch((error) => {
          resultDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
    });
  });
  