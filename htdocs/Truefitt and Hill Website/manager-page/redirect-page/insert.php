<?php 

$con = mysqli_connect("localhost", "root", "sam.iit.2022", "db_contact");
if($con)
{


    function fetch_data_timing($db, $tableName, $columns, $name){
        if(empty($db)){
            $msg= "Database connection error";
        }elseif (empty($columns) || !is_array($columns)) {
            $msg="columns Name must be defined in an indexed array";
        }elseif(empty($tableName)){
            $msg= "Table Name is empty";
        }else{
            $query = "SELECT Name, Timing, COUNT(*) AS magnitude FROM full_table GROUP BY Timing HAVING Name='$name' ORDER BY magnitude DESC LIMIT 1";
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

    function fetch_data_barber($db, $tableName, $columns, $name){
        if(empty($db)){
            $msg= "Database connection error";
        }elseif (empty($columns) || !is_array($columns)) {
            $msg="columns Name must be defined in an indexed array";
        }elseif(empty($tableName)){
            $msg= "Table Name is empty";
        }else{
            $query = "SELECT Name, Barber, COUNT(*) AS magnitude FROM full_table GROUP BY Barber HAVING Name='$name' ORDER BY magnitude DESC LIMIT 1";
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

    function fetch_data_style($db, $tableName, $columns, $name){
        if(empty($db)){
            $msg= "Database connection error";
        }elseif (empty($columns) || !is_array($columns)) {
            $msg="columns Name must be defined in an indexed array";
        }elseif(empty($tableName)){
            $msg= "Table Name is empty";
        }else{
            $query = "SELECT Name, Style, COUNT(*) AS magnitude FROM full_table GROUP BY Style HAVING Name='$name' ORDER BY magnitude DESC LIMIT 1";
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

    function fetch_data_product($db, $tableName, $columns, $name){
        if(empty($db)){
            $msg= "Database connection error";
        }elseif (empty($columns) || !is_array($columns)) {
            $msg="columns Name must be defined in an indexed array";
        }elseif(empty($tableName)){
            $msg= "Table Name is empty";
        }else{
            $query = "SELECT Name, Product, COUNT(*) AS magnitude FROM full_table GROUP BY Product HAVING Name='$name' ORDER BY magnitude DESC LIMIT 1";
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

    function fetch_data_date($db, $tableName, $columns, $name){
        if(empty($db)){
            $msg= "Database connection error";
        }elseif (empty($columns) || !is_array($columns)) {
            $msg="columns Name must be defined in an indexed array";
        }elseif(empty($tableName)){
            $msg= "Table Name is empty";
        }else{
            $query = "SELECT Name, DateReal FROM full_table WHERE Name='$name'";
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


    function fetch_datediff($db, $tableName, $columns, $datelist){
        $countdate = count($datelist) - 1;
        if(empty($db)){
            $msg= "Database connection error";
        }elseif (empty($columns) || !is_array($columns)) {
            $msg="columns Name must be defined in an indexed array";
        }elseif(empty($tableName)){
            $msg= "Table Name is empty";
        }else{
            $query = "DROP TABLE IF EXISTS date_table;";
            mysqli_query($db,$query);
            $query = "CREATE TABLE IF NOT EXISTS date_table (Date_Diff int(3));";
            mysqli_query($db,$query);
            for ($x = $countdate; $x>0 ;$x--){
                $y=$x-1;
                $query = "INSERT INTO date_table SELECT DATEDIFF('$datelist[$x]','$datelist[$y]')";
                mysqli_query($db,$query);
            }

            $query = "SELECT Date_Diff, COUNT(Date_Diff) AS Reccur FROM date_table GROUP BY Date_Diff ORDER BY Reccur DESC LIMIT 1;";
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


    for($x=1; $x<count($name_unique); $x++){
        $db = $con;
        $columnst = ['Name','Timing','magnitude'];
        $columnsb = ['Name','Barber','magnitude'];
        $columnss = ['Name','Style','magnitude'];
        $columnsp = ['Name','Product','magnitude'];
        $columnsd = ['Name','DateReal'];
        $tableName = "full_table";
        $fetchDataTiming = fetch_data_timing($db, $tableName, $columnst, $name_unique[$x]);
        if(is_array($fetchDataTiming)){
            $str1 = $fetchDataTiming[0]['Timing'];
            $str2 = $fetchDataTiming[0]['Name'];
            $query="UPDATE full_table SET Preferred_Time = '$str1' WHERE Name = '$str2';";
            mysqli_query($con,$query);
            $query="UPDATE customer_table SET Preferred_Time = '$str1' WHERE Name = '$str2';";
            mysqli_query($con,$query);
        }

        $fetchDataBarber = fetch_data_barber($db, $tableName, $columnsb, $name_unique[$x]);
        if(is_array($fetchDataBarber)){
            $str3 = $fetchDataBarber[0]['Barber'];
            $str4 = $fetchDataBarber[0]['Name'];
            //echo $fetchDataBarber[0]['Name'],$fetchDataBarber[0]['Barber'], $fetchDataBarber[0]['magnitude'];
            $query="UPDATE full_table SET Preferred_Barber = '$str3' WHERE Name = '$str4';";
            mysqli_query($con,$query);
            $query="UPDATE customer_table SET Preferred_Barber = '$str3' WHERE Name = '$str4';";
            mysqli_query($con,$query);
        }

        $fetchDataStyle = fetch_data_style($db, $tableName, $columnss, $name_unique[$x]);
        if(is_array($fetchDataStyle)){
            $str5 = $fetchDataStyle[0]['Style'];
            $str6 = $fetchDataStyle[0]['Name'];
            //echo $fetchDataStyle[0]['Name'],$fetchDataStyle[0]['Style'], $fetchDataStyle[0]['magnitude'];
            $query="UPDATE full_table SET Preferred_Style = '$str5' WHERE Name = '$str6';";
            mysqli_query($con,$query);
            $query="UPDATE customer_table SET Preferred_Style = '$str5' WHERE Name = '$str6';";
            mysqli_query($con,$query);
            
        }

        $fetchDataProduct = fetch_data_product($db, $tableName, $columnsp, $name_unique[$x]);
        if(is_array($fetchDataProduct)){
            $str5 = $fetchDataProduct[0]['Product'];
            $str6 = $fetchDataProduct[0]['Name'];
            $query="UPDATE full_table SET Preferred_Product = '$str5' WHERE Name = '$str6';";
            mysqli_query($con,$query);
            $query="UPDATE customer_table SET Preferred_Product = '$str5' WHERE Name = '$str6';";
            mysqli_query($con,$query);
            
        }

         
        global $datelist;
        $datelist = [];
        $fetchDataDate = fetch_data_date($db, $tableName, $columnsd, $name_unique[$x]);
        if(is_array($fetchDataDate)){      
            foreach($fetchDataDate as $data){
                array_push($datelist,$data['DateReal']);
            }
        }
        

        if(count($datelist)>1){
            $columnsdates = ['Date_Diff', 'Reccur'];
            $tablename = 'date_table';
            $fetchDataDatediff = fetch_datediff($db, $tablename, $columnsdates, $datelist);
            if(is_array($fetchDataDatediff)){
                $str5 = $fetchDataDatediff[0]['Date_Diff'];
                $str6 = $name_unique[$x];
                $query="UPDATE full_table SET Recurrance = '$str5' WHERE Name = '$str6';";
                mysqli_query($con,$query);

                if ($str5 == 1){
                    $str7 = 'Everyday';
                }
                elseif ($str5 == 7){
                    $str7 = 'Once a week';
                }
                elseif ($str5 == 30){
                    $str7 = 'Once a month';
                }
                elseif ($str5 == 0){
                    $str7 = ' ';
                }
                else{
                    $str7 = 'Once in every '.$str5.' days';
                }
                $query="UPDATE customer_table SET Recurrance = '$str7' WHERE Name = '$str6';";
                mysqli_query($con,$query);
                
            }
        }
        elseif(count($datelist)==1){
            $str5 = $datelist[0];
            $str6 = $name_unique[$x];
            $query="UPDATE full_table SET Recurrance = '$str5' WHERE Name = '$str6';";
            mysqli_query($con,$query);
        }



    }

    $query="UPDATE customer_table SET Name = '' WHERE Name IS NULL;";
    mysqli_query($con,$query);
    $query="UPDATE customer_table SET  Membership = '' WHERE Membership IS NULL;";
    mysqli_query($con,$query);
    $query="UPDATE customer_table SET  Preferred_Time = '' WHERE Preferred_Time IS NULL;";
    mysqli_query($con,$query);
    $query="UPDATE customer_table SET  Preferred_Barber = '' WHERE Preferred_Barber IS NULL;";
    mysqli_query($con,$query);
    $query="UPDATE customer_table SET  Preferred_Style = '' WHERE Preferred_Style IS NULL;";
    mysqli_query($con,$query);
    $query="UPDATE customer_table SET  Preferred_Product = '' WHERE Preferred_Product IS NULL;";
    mysqli_query($con,$query);
    $query="UPDATE customer_table SET Recurrance = '' WHERE Recurrance IS NULL;";
    mysqli_query($con,$query);

}
else
{
    echo "connection failed";
}
?>