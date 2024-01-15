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

$db= $conn;
$tableName="account_table";
$columns= ['Name', 'Username', 'Password'];

if (isset($_GET['data'])){
	$data = $_GET['data'];
	$jsonData = json_decode(urldecode($data), true);
}

$query = "CREATE TABLE IF NOT EXISTS account_table (ID int NOT NULL AUTO_INCREMENT, Name varchar(1000), Username varchar(1000), Password varchar(1000), PRIMARY KEY (ID))";
$result = $db->query($query);
$query = "ALTER TABLE account_table DROP ID";
$result = $db->query($query);
$query = "ALTER TABLE account_table ADD ID BIGINT(200) NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (ID)";
$result = $db->query($query);

// Decode the URL parameter
if(empty($jsonData)){

}
else{
	$query = "DELETE FROM account_table WHERE ID ='$jsonData'";
	$result = $db->query($query);
	$query = "ALTER TABLE account_table DROP ID";
	$result = $db->query($query);
	$query = "ALTER TABLE account_table ADD ID BIGINT(200) NOT NULL AUTO_INCREMENT FIRST, ADD PRIMARY KEY (ID)";
	$result = $db->query($query);
}

$fetchData = fetch_data($db, $tableName, $columns);

function fetch_data($db, $tableName, $columns){
 	if(empty($db)){
  		$msg= "Database connection error";
 	}elseif (empty($columns) || !is_array($columns)) {
  		$msg="columns Name must be defined in an indexed array";
 	}elseif(empty($tableName)){
   		$msg= "Table Name is empty";
	}else{
		
   		$query = "SELECT * FROM $tableName";
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