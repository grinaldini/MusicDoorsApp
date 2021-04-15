class DeleteAppointment {
  static deleteAppt(id) {
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
      'http://musicdoors.org/Database/User/Instructor/Appointment/DeleteAppointment.php',
      payload,
    );
  }
}
export default DeleteAppointment;
