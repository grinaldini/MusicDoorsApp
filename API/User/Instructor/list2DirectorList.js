class DirectorList {
    static getDirectorList(current_school) {
      let payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          current_school: current_school,
        }),
      };
      return fetch(
        'http://musicdoors.org/Database/User/Instructor/L2DirectorList.php',
        payload,
      );
    }
  }
  
  export default DirectorList;
  