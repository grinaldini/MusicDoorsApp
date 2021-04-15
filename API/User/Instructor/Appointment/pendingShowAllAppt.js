class InstructorAllPendingAppt {
    static getAllPendingAppt(instructor_id) {
      let payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          instructor_id: instructor_id,
        }),
      };
      return fetch(
        'http://musicdoors.org/Database/User/Instructor/Appointment/PendingShowAllAppt.php',
        payload,
      );
    }
  }
  export default InstructorAllPendingAppt;
  