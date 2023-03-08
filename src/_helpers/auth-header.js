import Cookies from 'universal-cookie';
const cookie = new Cookies();

export default function authHeader() {
  const user = typeof window !== 'undefined' ? cookie.get('user') : null;
  const token = typeof window !== 'undefined' ? cookie.get('token') : null;

  const refreshToken = typeof window !== 'undefined' ? cookie.get('refreshToken') : null;
  if (user && token) {
    let header = { Authorization: 'Bearer ' + token, 'x-refresh-token': refreshToken}
    return header;
  } else {
    return {};
  };
};
