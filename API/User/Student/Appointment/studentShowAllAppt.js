class StudentAllAppt {
    static getAllAppt(student_id) {
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
        'http://musicdoors.org/Database/User/Student/Appointment/ShowAllAppointment.php',
        payload,
      );
    }
  }
  export default StudentAllAppt;
  