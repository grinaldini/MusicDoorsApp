class DayApptList {
    static getAllAppt(instructor_id, date) {
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
        'http://musicdoors.org/Database/User/Instructor/Appointment/DayApptList.php',
        payload,
      );
    }
  }
  export default DayApptList;
  