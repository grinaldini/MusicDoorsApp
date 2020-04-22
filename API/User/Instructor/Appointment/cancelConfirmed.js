class CancelConfirmedAppt {
    static requestCancel(appointment_id) {
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
        'http://musicdoors.org/Database/User/Student/Appointment/CancelConfirmedAppt.php',
        payload,
      );
    }
  }
  export default CancelConfirmedAppt;
  