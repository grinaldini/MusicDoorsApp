class CancelPendingRequest {
    static cancelPending(appointment_id) {
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
        'http://musicdoors.org/Database/User/Student/Appointment/CancelPendingAppt.php',
        payload,
      );
    }
  }
  export default CancelPendingRequest;
  