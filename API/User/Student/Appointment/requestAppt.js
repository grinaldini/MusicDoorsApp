class RequestAppointment {
  static reqAppt(student_id, instructor_id, date, start, end) {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student_id: student_id,
        instructor_id: instructor_id,
        date: date,
        start: start,
        end: end,
      }),
    };
    return fetch(
      'http://musicdoors.org/Database/User/Student/Appointment/RequestAppointment.php',
      payload,
    );
  }
}
export default RequestAppointment;
