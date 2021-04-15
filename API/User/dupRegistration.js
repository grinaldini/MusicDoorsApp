class DupRegistration {
  static checkDup(email, user_type_id) {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        user_type_id: user_type_id,
      }),
    };
    return fetch(
      'http://musicdoors.org/Database/User/DupRegistration.php',
      payload,
    );
  }
}

export default DupRegistration;
