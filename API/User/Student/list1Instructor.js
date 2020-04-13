class StudentInstructorL1 {
  static getInstructorList(
    feeder_school,
    instrument,
    instrument_2,
    instrument_3,
  ) {
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
      'http://musicdoors.org/Database/User/Student/L1InstructorList.php',
      payload,
    );
  }
}
export default StudentInstructorL1;
