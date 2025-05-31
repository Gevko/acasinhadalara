// netlify/functions/get-reviews.js
const { NetlifyFunction } = require('@netlify/functions');

exports.handler = NetlifyFunction(async (event, context) => {
  try {
    // Get reviews from KV store
    const { getStore } = context.clientContext.store;
    const store = getStore('reviews');
    
    // Get all reviews or initialize if not exists
    let reviews = await store.get('all');
    if (!reviews) {
      reviews = [];
      await store.set('all', reviews);
    }
    
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
});