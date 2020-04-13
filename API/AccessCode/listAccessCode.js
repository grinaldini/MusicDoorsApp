class AccessCodeList {
  static getAC() {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return fetch(
      'http://musicdoors.org/Database/AccessCode/ListAccessCode.php',
      payload,
    );
  }
}
export default AccessCodeList;
