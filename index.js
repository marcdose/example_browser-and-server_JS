/**
 * Welcome to Cloudflare Workers! This is your first worker.
 */

/**
 * Import html content from index file as save as a variable
 * When you deploy your project, the build tool (wrangler) finds this line, 
 * reads your entire index.html file, and bundles its content into your script 
 * as a plain string assigned to the htmlContent variable.
 */

import htmlTemplate from './index.html';

export default {
  async fetch(request, env, ctx) {
    // 1. Fetch data from the API
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1');    
    const userData = await response.json();
    const userName = userData.name;

    // 2. Generate randoms, create new key-value pairs and read existing

    var randA = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
    };
    console.log(randA());
    var randB = function() {
    return Math.random().toString(36).substr(2); // remove `0.`
    };
    console.log(randB());

    await env.javascript.put(randA(), randB());
    const value = await env.javascript.get("second-key");

    // 3. Replace the placeholders in the HTML with the fetched data
    const finalHtml = htmlTemplate
    .replaceAll('$USERNAME', userName)
    .replaceAll('$VALUE', value);

    // 4. Return the modified HTML
    return new Response(finalHtml, {
      headers: {
        'Content-Type': 'text/html',
      },
    }
    );
//  await env.javascript.put("first-key", "this value is stored in KV per Worker request");
    
  },
};

/**
export default {
  async fetch(request, env, ctx) {
    try {
      // Step 1: Fetch data from the API server-side
      const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
      if (!response.ok) {
        throw new Error(`API call failed with status: ${response.status}`);
      }
      const userData = await response.json();
      const userName = userData.name;

      // Step 2: Replace the placeholder in the HTML template with the fetched data
      const finalHtml = htmlTemplate.replace('{{USER_NAME}}', userName);

      // Step 3: Return the modified HTML
      return new Response(finalHtml, {
        headers: {
          'Content-Type': 'text/html',
        },
      });

    } catch (error) {
      console.error("Worker error:", error);
      
      // --- FIX STARTS HERE ---
      // If the API fails, create a fallback HTML page to show the user.
      const errorHtml = htmlTemplate.replace('{{USER_NAME}}', 'guest (data could not be loaded)');
      
      // Return a valid Response object with a 500 server error status.
      return new Response(errorHtml, {
        headers: {
          'Content-Type': 'text/html',
        },
        status: 500 // Internal Server Error
      });
      // --- FIX ENDS HERE ---
    }
  },
};

*/

/**
 * 'Content-Type': 'text/html': This header is crucial. 
 * It tells the browser, "The string I'm sending you is not plain text; it's an HTML document. 
 * Please render it as a webpage." Without this, the browser would just display 
 * the raw HTML tags on the screen.
 */