class DirectorData {
    static getInfo(id) {
      let payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
        }),
      };
      return fetch(
        'http://musicdoors.org/Database/User/Instructor/V2DirectorInfo.php',
        payload,
      );
    }
  }
  export default DirectorData;
  