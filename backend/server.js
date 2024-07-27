const express = require('express');
const { google } = require('googleapis');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const { configDotenv } = require('dotenv');
const app = express();
const PORT = process.env.PORT || 3000;
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
// Configure dotenv
configDotenv();

app.use(cors());

// Function to get the first YouTube video ID for a search query
async function getFirstYouTubeVideoId(searchQuery, apiKey) {
  const youtube = google.youtube({
    version: 'v3',
    auth: apiKey
  });
  try {
    const response = await youtube.search.list({
      q: searchQuery,
      part: 'snippet',
      maxResults: 1,
      type: 'video'
    });
    const items = response.data.items;
    if (items && items.length > 0 && items[0].id.kind === 'youtube#video') {
      return items[0].id.videoId;
    }
  } catch (error) {
    console.error('Error fetching video ID:', error);
  }

  return null;
}

// Define the endpoint to get the video ID
app.get('/get_video_id', async (req, res) => {
  const searchQuery = req.query.query;
  const apiKey = req.query.api_key;
  if (!searchQuery || !apiKey) {
    return res.status(400).json({ error: 'query and api_key parameters are required' });
  }

  const videoId = await getFirstYouTubeVideoId(searchQuery, apiKey);
  if (videoId) {
    res.json({ video_id: videoId });
  } else {
    console.log("error")
    res.status(404).json({ error: 'No video found' });
  }
});

// Function to scrape the website
async function scrapeAnimeMusic(searchQuery) {
  try {
    searchQuery = searchQuery.replace(/[^a-zA-Z0-9]/g, '_')
                             .replace(/_+/g, '_')
                             .replace(/_+$/, '');
    console.log("searchQuery",searchQuery)
    const response = await axios.get(`https://animethemes.moe/anime/${searchQuery}`);
    const html = response.data;
    const $ = cheerio.load(html);
    const elements = $('.sc-330991ae-0.eErKmH');
    
    let results = [];
    elements.each((index, element) => {
      results.push($(element).text());
    });

    return results;
  } catch (error) {
    console.error('Error scraping website:', error);
    return null;
  }
}

// Define the endpoint to search anime music
app.get('/searchAnimeMusic', async (req, res) => {
  const searchQuery = req.query.query;
  console.log("searchQuery",searchQuery)
  const results = await scrapeAnimeMusic(searchQuery);
  if (results) {
    res.json({ results });
  } else {
    res.status(500).json({ error: 'Error scraping website' });
  }
});
// app.use('/api/reviews', reviewRoutes)
// app.use('/api/users', userRoutes)


// Start the server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`Connected to the database and listening on port ${process.env.PORT}!!!`)
        })
    })
    .catch((error) => {
        console.log(error)
    })