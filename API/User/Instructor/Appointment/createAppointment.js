class CreateAppointment {
  static createAppt(instructor_id, start, end, date) {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instructor_id: instructor_id,
        start: start,
        end: end,
        date: date,
      }),
    };
    return fetch(
      'http://musicdoors.org/Database/User/Instructor/Appointment/CreateAppointment.php',
      payload,
    );
  }
}
export default CreateAppointment;
