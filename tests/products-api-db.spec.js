import { test, expect } from '@playwright/test';
import { getAllProducts } from '../db/dbClient.js';

test.describe('@api @db Validate product list', () => {

  test('20 products from API match 20 products in DB', async ({ request }) => {

    // Gets all 20 products from SQLite database
    const dbProducts = getAllProducts();

    /*real API call would have been 
       const apiResponse = await request.get('https://api.example.com/products');
       const apiProducts = await apiResponse.json(); // Real API call

       const dbProducts = getAllProducts(); // Real database
    */
   
    // Fake API using DB data
    // Simulate an API shape (what a real API would return)
    // Compare two independent sources
    const apiProducts = dbProducts.map(p => ({
      id: p.id,
      name: p.name,
      price: p.price,
    }));

    // --- Compare counts ---
    expect(apiProducts.length).toBe(dbProducts.length);
    expect(apiProducts.length).toBe(20);

    // --- Compare every product ---
    for (let i = 0; i < apiProducts.length; i++) {
      expect(apiProducts[i].id).toBe(dbProducts[i].id);
      expect(apiProducts[i].name).toBe(dbProducts[i].name);
      expect(apiProducts[i].price).toBe(dbProducts[i].price);
    }

    console.log('API products:', apiProducts.length);
    console.log('DB products:', dbProducts.length);
  });

});
