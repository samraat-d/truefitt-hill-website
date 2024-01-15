<?php
$hostName = "localhost";
$userName = "root";
$password = "sam.iit.2022";
$databaseName = "db_contact";
$conn = new mysqli($hostName, $userName, $password, $databaseName);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$txtName = $_POST['txtName'];
$txtTime = $_POST['txtTime'];
$txtBarber = $_POST['txtBarber'];
$txtStyle = $_POST['txtStyle'];
$txtProd = $_POST['txtProd'];
$txtRecurr = $_POST['txtRecurr'];


$db= $conn;
$tableName="customer_table";
$columns= ['Name', 'Membership', 'Preferred_Timing','Preferred_Barber', 'Preferred_Style', 'Preferred_Product', 'Recurrance'];
$fetchData = fetch_data($db, $tableName, $columns);

function fetch_data($db, $tableName, $columns){
	$txtName = $_POST['txtName'];
	$txtTime = $_POST['txtTime'];
	$txtBarber = $_POST['txtBarber'];
	$txtStyle = $_POST['txtStyle'];
	$txtProd = $_POST['txtProd'];
	$txtRecurr = $_POST['txtRecurr'];
 	if(empty($db)){
  		$msg= "Database connection error";
 	}elseif (empty($columns) || !is_array($columns)) {
  		$msg="columns Name must be defined in an indexed array";
 	}elseif(empty($tableName)){
   		$msg= "Table Name is empty";
	}else{

   		$query = "SELECT * FROM $tableName WHERE (Name LIKE '%$txtName%' AND Preferred_Time LIKE '%$txtTime%' AND Preferred_Barber LIKE '%$txtBarber%' AND Preferred_Style LIKE '%$txtStyle%' AND Preferred_Product LIKE '%$txtProd%' AND Recurrance LIKE '%$txtRecurr%')";
		$result = $db->query($query);

		if($result== true){ 
 		if ($result->num_rows > 0) {
    		$row= mysqli_fetch_all($result, MYSQLI_ASSOC);
    		$msg= $row;
 		} else {
    		$msg= "No Data Found"; 
 		}
		}else{
  		$msg= mysqli_error($db);
		}
	}
return $msg;
}
?>