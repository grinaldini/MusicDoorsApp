class StudentData {
  static getApptInfo(student_id) {
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
      'http://musicdoors.org/Database/User/Instructor/Appointment/StudentData.php',
      payload,
    );
  }
}
export default StudentData;
