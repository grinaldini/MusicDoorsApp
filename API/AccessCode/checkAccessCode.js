class CheckAccessCode {
  static authAccess(code, user_type_id) {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
        user_type_id: user_type_id,
      }),
    };
    return fetch('http://musicdoors.org/Database/AccessCode/CheckAccessCode.php', payload);
  }
}
export default CheckAccessCode;