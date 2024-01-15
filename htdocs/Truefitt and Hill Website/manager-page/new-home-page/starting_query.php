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
$tableName="customer_table";
$columns= ['Name', 'Membership','Preferred_Timing','Preferred_Barber', 'Preferred_Style', 'Preferred_Product', 'Recurrance'];
$fetchData = fetch_data($db, $tableName, $columns);

function fetch_data($db, $tableName, $columns){
 if(empty($db)){
  $msg= "Database connection error";
 }elseif (empty($columns) || !is_array($columns)) {
  $msg="columns Name must be defined in an indexed array";
 }elseif(empty($tableName)){
   $msg= "Table Name is empty";
}else{

$columnName = implode(", ", $columns);
$query = "SELECT Name, Membership, Preferred_Time, Preferred_Barber, Preferred_Style, Preferred_Product, Recurrance FROM $tableName GROUP BY Name";
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