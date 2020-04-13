class EmailPassword {
  static tempPass(email, code) {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        code: code,
      }),
    };
    return fetch(
      'http://musicdoors.org/Database/User/ForgotPassword.php',
      payload,
    );
  }
}
export default EmailPassword;
