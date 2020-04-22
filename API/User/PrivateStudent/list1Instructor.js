class PrivateStudentInstructorL1 {
  static getInstructorList(instrument, instrument_2, instrument_3) {
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
      'http://musicdoors.org/Database/User/PrivateStudent/L1InstructorList.php',
      payload,
    );
  }
}
export default PrivateStudentInstructorL1;
