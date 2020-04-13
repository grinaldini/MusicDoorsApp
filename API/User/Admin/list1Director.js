class AdminDirectorL1 {
  static getDirectorList() {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return fetch(
      'http://musicdoors.org/Database/User/Admin/L1DirectorList.php',
      payload,
    );
  }
}

export default AdminDirectorL1;
