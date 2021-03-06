class InstructorStudentL1 {
  static getStudentList(feeder_school, instrument, instrument_2, instrument_3) {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        feeder_school: feeder_school,
        instrument: instrument,
        instrument_2: instrument_2,
        instrument_3: instrument_3,
      }),
    };
    return fetch(
      'http://musicdoors.org/Database/User/Instructor/L1StudentList.php',
      payload,
    );
  }
}

export default InstructorStudentL1;
