class GetGallery {
  static loadGallery() {
    let payload = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return fetch(
      'http://musicdoors.org/Database/Gallery/GetGallery.php',
      payload,
    );
  }
}

export default GetGallery;
