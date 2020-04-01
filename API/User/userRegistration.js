class UserRegistration {
  static userReg(
    user_type_id,
    email,
    password,
    first_name,
    last_name,
    phone_number,
    street_address,
    city,
    state,
    zip_code,
    feeder_school,
    current_school,
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
        user_type_id: user_type_id,
        email : email, 
        password : password, 
        first_name: first_name,
        last_name : last_name,
        phone_number : phone_number,
        street_address : street_address,
        city : city,
        state : state,
        zip_code : zip_code,
        feeder_school : feeder_school, 
        current_school : current_school, 
        instrument : instrument, 
        instrument_2 : instrument_2,
        instrument_3: instrument_3,
      }),
    };
    return fetch(
      'http://musicdoors.org/Database/User/UserRegistration.php',
      payload,
    );
  }
}

export default UserRegistration;
