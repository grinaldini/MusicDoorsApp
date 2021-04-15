class DirectorAppointmentL2 {
    static getAppt(student_id) {
      let payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            student_id: student_id,
        }),
      };
      return fetch(
        'http://musicdoors.org/Database/User/Director/L2AppointmentList.php',
        payload,
      );
    }
  }
  
  export default DirectorAppointmentL2;
  