class AdminApptInstructorV2 {
  static getParticipant(instructor_id) {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        instructor_id: instructor_id,
      }),
    };
    return fetch(
      'http://musicdoors.org/Database/User/Admin/View2Instructor.php',
      payload,
    );
  }
}

export default AdminApptInstructorV2;
