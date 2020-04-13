class AvailableAppt {
  static getAllAppt(instructor_id) {
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
      'http://musicdoors.org/Database/User/Student/L2AppointmentList.php',
      payload,
    );
  }
}
export default AvailableAppt;
