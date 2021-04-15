class GetSchools {
  static loadSchools() {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return fetch(
      'http://musicdoors.org/Database/SchoolsList/GetSchools.php',
      payload,
    );
  }
}

export default GetSchools;
