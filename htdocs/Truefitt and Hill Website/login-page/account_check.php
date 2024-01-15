<?php 

$con = mysqli_connect("localhost", "root", "sam.iit.2022", "db_contact");
$username = [];
$password = [];
if($con)
{


    function fetch_data($db, $columns){
        if(empty($db)){
            $msg= "Database connection error";
        }elseif (empty($columns) || !is_array($columns)) {
            $msg="columns Name must be defined in an indexed array";
        }else{
            $query = "SELECT Username, Password FROM account_table";
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

    $db = $con;
    $columns = ['Username','Password'];
    $fetchData = fetch_data($db, $columns);
    for($x = 0; $x<count($fetchData); $x++){
        if(is_array($fetchData)){
            $str5 = $fetchData[$x]['Username'];
            $str6 = $fetchData[$x]['Password'];
            array_push($username, $str5);
            array_push($password, $str6);
        }
    }
}
?>