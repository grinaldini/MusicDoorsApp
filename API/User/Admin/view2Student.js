class AdminApptStudentV2 {
  static getParticipant(student_id) {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        student_id: student_id,
      }),
    };
    return fetch(
      'http://musicdoors.org/Database/User/Admin/View2Student.php',
      payload,
    );
  }
}

export default AdminApptStudentV2;
