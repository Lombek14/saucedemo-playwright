// Minimal, no-auth client for demo API
export function authHeaders() {
  const h = { 'Content-Type': 'application/json' };
  if (process.env.API_TOKEN) {
    h.Authorization = `Bearer ${process.env.API_TOKEN}`;
  }
  return h;
}

export async function getUsers(api, page = 1) {
  return api.get('/users', { params: { page } });
}

export async function createUser(api, payload) {
  return api.post('/users', { data: payload });
}
