class InstAvailableAppt {
  static getInstAppt(instructor_id, date) {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instructor_id: instructor_id,
        date: date,
      }),
    };
    return fetch(
      'http://musicdoors.org/Database/User/Student/L3InstructorAppointmentList.php',
      payload,
    );
  }
}
export default InstAvailableAppt;
