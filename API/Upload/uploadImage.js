class UploadImage {
    static tempPass(email, code) {
      let payload = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
         [
        
         ]
        body: JSON.stringify({
          email: email,
          code: code,
        }),
      };
      return fetch(
        'http://musicdoors.org/Database/Upload/UploadImage.php',
        payload,
      );
    }
  }
  export default EmailPassword;
  


'http://musicdoors.org/Database/User/ForgotPassword.php',