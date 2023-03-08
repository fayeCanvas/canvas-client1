import Cookies from 'universal-cookie';
const cookie = new Cookies();

export function isAuthenticated() {
  const user = cookie.get('user')
  if (user !== undefined ) {
    return true
  } else {
    return false
  }
}

export async function getUserRole() {
  const user = await cookie.get('user')
  return user

}
