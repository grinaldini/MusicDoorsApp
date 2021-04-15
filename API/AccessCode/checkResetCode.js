class CheckResetCode {
    static checkValid(code, email) {
      let payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: code,
          email: email,
        }),
      };
      return fetch('http://musicdoors.org/Database/AccessCode/CheckResetCode.php', payload);
    }
  }
  export default CheckResetCode;