<?php
$hostName = "localhost";
$userName = "root";
$password = "sam.iit.2022";
$databaseName = "db_contact";
$conn = new mysqli($hostName, $userName, $password, $databaseName);
// Check connection
//if ($conn->connect_error) {
  //die("Connection failed: " . $conn->connect_error);
//}

$db= $conn;
$tableName="full_table";
$columns= ['Name', 'Date', 'Timing', 'Barber', 'Style', 'Membership'];
$fetchData = fetch_data($db, $tableName, $columns);

function fetch_data($db, $tableName, $columns){
 	if(empty($db)){
  		$msg= "Database connection error";
 	}elseif (empty($columns) || !is_array($columns)) {
  		$msg="columns Name must be defined in an indexed array";
 	}elseif(empty($tableName)){
   		$msg= "Table Name is empty";
	}else{
   		$query = "SELECT Name, Date, Timing, Barber, Style, Membership FROM full_table WHERE Membership LIKE '%annual%'";
   		$result = $db->query($query);

		if($result== true){ 
 		if ($result->num_rows > 0) {
    		$row= mysqli_fetch_all($result, MYSQLI_ASSOC);
    		$msg= $row;
 		} else {
    		$msg= "No data found for today!"; 
 		}
		}else{
  		$msg= mysqli_error($db);
		}
	}
return $msg;
}
?>