class CreateAccessCode {
  static createAC(code, user_type_id, description, dateString) {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
        user_type_id: user_type_id,
        description: description,
        dateString: dateString,
      }),
    };
    return fetch(
      'http://musicdoors.org/Database/AccessCode/InsertAccessCode.php',
      payload,
    );
  }
}
export default CreateAccessCode;
