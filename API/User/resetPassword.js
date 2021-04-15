class UpdateResetPassword {
    static reset(email, new_password) {
      let payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          new_password: new_password,
        }),
      };
      return fetch(
        'http://musicdoors.org/Database/User/ResetPassword.php',
        payload,
      );
    }
  }
  
  export default UpdateResetPassword;
  