//Run npm init and then install the node modules: express, axios, cheerio
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { url } = req.body;

  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      const $ = cheerio.load(response.data);
      const title = $('title').text();
      const paragraphs = [];
      $('p').each((index, element) => {
        paragraphs.push($(element).text());
      });

      const html = `
        <h2>Title: ${title}</h2>
        <h3>Paragraphs:</h3>
        <ul>${paragraphs.map((p) => `<li>${p}</li>`).join('')}</ul>
      `;

      res.json({ html });
    } else {
      res.status(500).json({ error: 'Failed to fetch the page' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

//run with node server.js
