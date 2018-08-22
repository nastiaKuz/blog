import Api from '../services/Api';

export function login(credentials) {
  return new Promise((resolve, reject) => {
    Api().post('login', credentials)
      .then((response)=> {
       // localStorage.setItem('token', response.data.token);
        setAuthorization(response.data.token);
        resolve(response.data);
      })
      .catch((err) =>{
        reject("Wrong email or password", {err});
      })
  });
}

export function registrate(credentials) {
  return new Promise((resolve, reject)=> {
    Api().post('/register', credentials)
      .then((response)=> {
        resolve(response.data);
      })
      .catch((err) =>{
        reject("Registration failed", {err});
      })
  })
}

export function setAuthorization(token) {
  Api().defaults.headers.common["token"] = `${token}`;
}

export function getLocalAuthor() {
  const authorStr = localStorage.getItem("author");
  if (!authorStr) {
    return null;
  }
  return JSON.parse(authorStr);
}
