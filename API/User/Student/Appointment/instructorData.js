class InstructorData {
    static getApptInfo(instructor_id) {
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
        'http://musicdoors.org/Database/User/Student/Appointment/InstructorData.php',
        payload,
      );
    }
  }
  export default InstructorData;
  