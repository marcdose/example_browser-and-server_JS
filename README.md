# Cloudflare Worker: Fullstack Example

This project is a Cloudflare Worker that demonstrates a combination of server-side and client-side rendering, along with integration with Cloudflare KV data store.

It serves a primary HTML page that is dynamically modified on the server before being sent to the client. The page also contains client-side JavaScript that can interact with APIs. Additionally, the worker exposes simple API endpoints to read from and write to a KV namespace.

### Features
🖥️ Server-Side Rendering (SSR): The worker injects a user's name into the HTML template on the server before sending the response based on an API call.

🖱️ Client-Side Rendering (CSR): The final HTML page includes JavaScript that runs in the browser, allowing for interactive features like fetching data on a button click.

⚡ Cloudflare KV Integration:
A GET KV endpoint to retrieve a value from a KV namespace; javascript
A PUT KV endpoint to store a new, randomly generated key-value pair.

Project Structure