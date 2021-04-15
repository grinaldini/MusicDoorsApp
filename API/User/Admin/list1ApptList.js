class AdminAppointmentL1 {
    static getAppt() {
      let payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      return fetch(
        'http://musicdoors.org/Database/User/Admin/L1AppointmentList.php',
        payload,
      );
    }
  }
  
  export default AdminAppointmentL1;
  