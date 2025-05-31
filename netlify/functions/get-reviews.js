// netlify/functions/get-reviews.js
const fs = require('fs');
const path = require('path');

exports.handler = async function(event, context) {
  try {
    // Path to the reviews JSON file
    const reviewsPath = path.join(__dirname, '..', '..', 'data', 'reviews.json');
    
    // Check if file exists, if not create it with empty array
    if (!fs.existsSync(reviewsPath)) {
      const dataDir = path.join(__dirname, '..', '..', 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      fs.writeFileSync(reviewsPath, JSON.stringify([]));
    }
    
    // Read reviews from file
    const reviewsData = fs.readFileSync(reviewsPath, 'utf8');
    const reviews = JSON.parse(reviewsData);
    
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reviews)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to load reviews' })
    };
  }
};