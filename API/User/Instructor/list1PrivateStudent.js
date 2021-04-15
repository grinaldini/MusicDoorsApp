class InstructorPrivateStudentL1 {
  static getPrivateStudentList(instrument, instrument_2, instrument_3) {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instrument: instrument,
        instrument_2: instrument_2,
        instrument_3: instrument_3,
      }),
    };
    return fetch(
      'http://musicdoors.org/Database/User/Instructor/L1PrivateStudentList.php',
      payload,
    );
  }
}

export default InstructorPrivateStudentL1;
