
async function sendRequest(api, method, data) {
    const BODY = data ? data : null;
    const RESPONSE = await fetch('http://localhost:3001/' + api, {
      method: method,
      body: BODY,
    }); 
    const RESPONSE_DATA = await RESPONSE.json();
    return RESPONSE_DATA;
  }