class AdminInstructorL1 {
    static getInstructors() {
      let payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      return fetch(
        'http://musicdoors.org/Database/User/Admin/L1InstructorList.php',
        payload,
      );
    }
  }
  
  export default AdminInstructorL1;
  