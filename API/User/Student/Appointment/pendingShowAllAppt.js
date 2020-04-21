class AllPendingAppt {
    static getAllPendingAppt(student_id) {
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
        'http://musicdoors.org/Database/User/Student/Appointment/PendingShowAllAppt.php',
        payload,
      );
    }
  }
  export default AllPendingAppt;
  