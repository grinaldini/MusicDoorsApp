class DirectorStudentL1 {
    static getStudentList(current_school) {
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
        'http://musicdoors.org/Database/User/Admin/L2StudentList.php',
        payload,
      );
    }
  }
  
  export default DirectorStudentL1;
  