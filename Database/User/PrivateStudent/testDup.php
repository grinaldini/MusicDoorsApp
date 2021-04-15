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
 
 // Getting the received JSON into $json variable.
//$json = file_get_contents('php://input');
 
 // decoding the received JSON and store into $obj variable.
//$obj = json_decode($json,true);



// Populate User email from JSON $obj array and store into $email.
$email = "grinaldini@outlook.com";
//http://musicdoors.org/Database/User/Admin/StudentList.php

//Example 1:
//directorSchool1@gmail.com
//password_directorSchool1

//Example 2:
//adminMusicDoors
//MusicDoors@Dallas@Texas


 
// Populate Password from JSON $obj array and store into $password.
$user_type_id = 2;
 
//http://musicdoors.org/Database/User/Login.php

//Applying User Login query with email and password match.
$Sql_Query = "SELECT * FROM mainTable WHERE email = '$email' and user_type_id = '$user_type_id' ";
 
// Executing SQL Query.
$check = mysqli_query($con,$Sql_Query);

$rows = array();

if ($check->num_rows >0) {
 $json = true;

 $json = json_encode($rows);


 echo $json;
} 
 
 else{
 
 // If the record inserted successfully then show the message.
$InvalidMSG = false;
 
// Converting the message into JSON format.
$InvalidMSGJSon = json_encode($InvalidMSG);
 
// Echo the message.
 echo $InvalidMSGJSon ;
 
 }
 
 mysqli_close($con);
?>