class ConfirmPendingRequest {
  static confirmPending(appointment_id) {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        appointment_id: appointment_id,
      }),
    };
    return fetch(
      'http://musicdoors.org/Database/User/Instructor/Appointment/ConfirmPendingAppt.php',
      payload,
    );
  }
}
export default ConfirmPendingRequest;
