class AdminPrivateStudentL1 {
    static getPS() {
      let payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      return fetch(
        'http://musicdoors.org/Database/User/Admin/L1PrivateStudentList.php',
        payload,
      );
    }
  }
  
  export default AdminPrivateStudentL1;
  