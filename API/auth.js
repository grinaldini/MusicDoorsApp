class AuthApi {
  static login(username, password) {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: username,
        password: password,
      }),
    };
    return fetch('http://musicdoors.org/Database/User/Login.php', payload);
  }
}

export default AuthApi;
