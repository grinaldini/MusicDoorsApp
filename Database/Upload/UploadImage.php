<?php
    // Importing DBConfig.php file.
    $HostName = "localhost";

    //Define your database name here.
    $DatabaseName = "musicdoo_database";

    //Define your database username here.
    $HostUser = "musicdoo_root_us";

    //Define your database password here.
    $HostPass = "musicdoors@dallas@2020";
 
    // Creating connection.
    $con = mysqli_connect($HostName,$HostUser,$HostPass,$DatabaseName);
    
    //echo phpinfo

    $email = $_POST['email'];

    $image_name = $_POST['imageName'];

	// Type your website name or domain name here.
	$domain_name = 'http://musicdoors.org/Assets/Avatar/';
	
	// Image uploading folder.
    $avatar_dir = getcwd() . "/Avatar/";
	
	// Generating random image name each time so image name will not be same .
	$file_name =  $image_name . ".jpeg";
    

    $target_dir = $avatar_dir . $file_name;

    $avatarURI = $domain_name . $file_name;

	// Receiving image sent from Application	
	if(move_uploaded_file($_FILES['avatar']['tmp_name'], $target_dir)){
		
		// Adding domain name with image random name.
		$avatar = $domain_name . $target_dir ;
		
        // Inserting data into MySQL database.
        $query = "UPDATE mainTable SET avatar='$avatarURI' WHERE email='$email' ";
        $result = mysqli_query($con, $query);
			
		// Printing response message on screen after successfully inserting the image .	
		echo json_encode(array('avatar'=>$avatarURI));
    }
    else{
       // echo json_encode(array('status'=>false));
       echo json_encode(false);
    }

?>