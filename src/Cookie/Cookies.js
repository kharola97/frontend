import Cookies from 'js-cookie';

export function getCookie(name) {
    console.log("hello from cookie")
    console.log(Cookies.get(name))
  return Cookies.get(name);
}