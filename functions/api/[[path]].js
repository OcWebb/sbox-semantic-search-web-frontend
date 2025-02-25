export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/', '');
  
  // Forward the request to your actual API
  const apiUrl = `${env.API_URL}/${path}`;
  
  // Clone the request to modify it
  const newRequest = new Request(apiUrl, {
    method: request.method,
    headers: request.headers,
    body: request.body
  });
  
  return fetch(newRequest);
} 