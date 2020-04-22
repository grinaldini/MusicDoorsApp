class InstructorCancelPendingRequest {
  static cancel(id) {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    };
    return fetch(
      'http://musicdoors.org/Database/User/Instructor/Appointment/CancelPendingRequest.php',
      payload,
    );
  }
}
export default InstructorCancelPendingRequest;
