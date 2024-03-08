const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.get('/lockheed-news-scrape', async (req, res) => {
  try {
    const response = await axios.get('https://www.lockheedmartin.com/en-us/news.html');
    const $ = cheerio.load(response.data);
    const relatedItemTiles = $('.relatedItemTile');
    const scrapedData = [];
    relatedItemTiles.each((index, element) => {
      const articleTitle = $(element).find('.relatedItemTitle a').text().trim();
      const imageSource = $(element).find('img').attr('src');
      const articleLink = $(element).find('.relatedItemCTA a').attr('href');

      const baseImageUrl = 'https://www.lockheedmartin.com';
      const absoluteImageUrl = `${baseImageUrl}${imageSource}`;
      const absoluteLink = new URL(articleLink, baseImageUrl).href;
      scrapedData.push({
        articleTitle,
        imageSource: absoluteImageUrl,
        articleLink: absoluteLink,
      });
    });
    res.json(scrapedData);
  } catch (error) {
    console.error('Error scraping data:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
