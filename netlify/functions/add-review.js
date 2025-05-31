// netlify/functions/add-review.js
const { NetlifyFunction } = require('@netlify/functions');
const { v4: uuidv4 } = require('uuid');

exports.handler = NetlifyFunction(async (event, context) => {
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
    
    // Get reviews from KV store
    const { getStore } = context.clientContext.store;
    const store = getStore('reviews');
    
    // Get existing reviews
    let reviews = await store.get('all') || [];
    
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
    
    // Store updated reviews
    await store.set('all', reviews);
    
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
});