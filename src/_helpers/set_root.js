let backendHost;
let clientRootUrl;

const hostname = process.env.NODE_ENV
const project = process.env.GOOGLE_CLOUD_PROJECT

if (hostname === 'development' || hostname === 'test') {
  backendHost = 'http://localhost:5050'
  clientRootUrl = 'http://localhost:8080'
} else {
  backendHost = 'https://canvas-psych-server.uc.r.appspot.com'
  clientRootUrl = 'https://canvaspad.org'
}

export const API_ROOT = `${backendHost}`
export const CLIENT_ROOT = `${clientRootUrl}`
