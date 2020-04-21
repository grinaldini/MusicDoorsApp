class UpdateStudent {
    static update(
      id,
      email,
      password,
      first_name,
      last_name,
      phone_number,
      street_address,
      city,
      st,
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
          id: id,
          email : email, 
          password : password, 
          first_name: first_name,
          last_name : last_name,
          phone_number : phone_number,
          street_address : street_address,
          city : city,
          state : st,
          zip_code : zip_code,
          feeder_school : feeder_school, 
          current_school : current_school, 
          instrument : instrument, 
          instrument_2 : instrument_2,
          instrument_3: instrument_3,
        }),
      };
      return fetch(
        'http://musicdoors.org/Database/User/UpdateUser.php',
        payload,
      );
    }
  }
export default UpdateStudent;
  