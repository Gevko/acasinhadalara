// netlify/functions/add-review.js
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

exports.handler = async function(event, context) {
  try {
    // Only allow POST requests
    if (event.httpMethod !== 'POST') {
      return {
        statusCode: 405,
        body: JSON.stringify({ error: 'Method Not Allowed' })
      };
    }
    
    // Parse the incoming review data
    const reviewData = JSON.parse(event.body);
    
    // Validate the review data
    if (!reviewData.name || !reviewData.comment || !reviewData.rating) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }
    
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
    
    // Read existing reviews
    const reviewsData = fs.readFileSync(reviewsPath, 'utf8');
    const reviews = JSON.parse(reviewsData);
    
    // Create new review with ID
    const newReview = {
      id: uuidv4(),
      name: reviewData.name,
      rating: parseInt(reviewData.rating),
      date: reviewData.date || new Date().toISOString().split('T')[0],
      comment: reviewData.comment
    };
    
    // Add to beginning of array
    reviews.unshift(newReview);
    
    // Write back to file
    fs.writeFileSync(reviewsPath, JSON.stringify(reviews, null, 2));
    
    return {
      statusCode: 201,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newReview)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to add review' })
    };
  }
};