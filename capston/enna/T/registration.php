<html lang="en">
<head>
    <script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css" rel="stylesheet" integrity="sha256-MfvZlkHCEqatNoGiOXveE8FIwMzZg4W85qfrfIFBfYc= sha512-dTfge/zgoMYpP7QbHy4gWMEGsbsdZeCXz7irItjcC3sPUFtf0kuFbDz/ixG7ArTxmDjLXDmezHubeNikyKGVyQ==" crossorigin="anonymous">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js" integrity="sha256-Sk3nkD6mLTMOF0EOpNtsIry+s1CsaqQC1rVLTAy+0yc= sha512-K1qjQ+NcF2TYO/eI3M6v8EiNYZfA95pQumfvcVrTHtwQVDG+aHRqLi/ETn2uB+1JqwYqVG3LIvdm9lj6imS/pQ==" crossorigin="anonymous"></script>
    <link type="text/css" rel="stylesheet" href="master.css"/>
    <meta charset="UTF-8">
    <title>Registration</title>
</head>
<body>

<?php
    include "session.php";
    $reg_username = $reg_email = $reg_pass = $reg_repass = "";
    $ID = $EMAIL = $USER = "";

    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        foreach($_POST as $var => $value) {
            if(empty($_POST[$var])) {
                echo ucwords($var)."field is required!";
                break;
            }
        }

        if($_POST['reg_pass'] != $_POST['reg_repass'])
            echo "Passwords should be same!<br>";

        else if($_POST['reg_pass'] != $_POST['reg_repass'])
            echo "Passwords should be same!<br>";
/*
        else if(!isset($message)) {
            if (!filter_var($_POST["userEmail"], FILTER_VALIDATE_EMAIL)) {
                echo "Invalid UserEmail!";
            }
        }
*/
        else if(!empty($_POST['reg_email'])&& !empty($_POST['reg_pass'])) {

           /* if(not exist)
            $row_max = mysql_fetch_array(mysql_query("select MAX(id) FROM boos"));
            $count=$row_max[0]+1; */

            $id = $_POST["reg_username"];
            $pass = $_POST["reg_pass"];
            $email = $_POST["reg_email"];
            
            $query = 
            "INSERT INTO USERS (USERNAME, PASSWORD, EMAIL) 
            VALUES ($id, $pass, $email)";

            $result = @mysql_query($query, $mysqli);
            
            if(!$result) {
                echo "You have registered successfully!"; 
                unset($_POST);
            } else {
                echo "Problem in registration. Try Again!";   
            }





/*
            $result = $mysqli->query("SELECT * FROM users ORDER BY id");

            while($row = $result->fetch_array(MYSQLI_ASSOC)) {
               if ($row["EMAIL"] == $_POST["login_email"] && $row["PASSWORD"] == $_POST["login_pass"]) {
                   echo "You successfully logged in!";
                   $_SESSION['ID'] = $row['ID'];
                   $_SESSION['EMAIL'] = $row['EMAIL'];
                   $_SESSION['USER'] = $row['USERNAME'];

                    header("location: ../index.html");
                    mysqli_close($mysqli);
                }
            }*/
        }
    }
?>

<div class="title" style="text-align: left;"><a href="../index.html" style="margin-left: 10px;">TimeSYNC</a>
    <!-- <form class="navbar-form navbar-right" role="search">
        <div class="form-group">
            <input type="text" class="form-control" name="username" placeholder="Username">
        </div>
        <div class="form-group">
            <input type="text" class="form-control" name="password" placeholder="Password">
        </div>
        <button type="submit" class="form-submit btn btn-default" style="margin-right: 10px;">Sign In</button>
    </form> --></div>

<div id=bar class="navbar navbar-inverse navbar-static-top">
    <div class="menu-wrap">
        <nav class="menu">
            <ul class="clearfix">
                <li><a href="../index.html">Home</a></li>
                <li><a href="../calendar.html">My Schedule</a></li>
                <li><a href="../myGroups.html">My Groups</a></li>
                <li><a href="../settings.html">Settings<span class="arrow">&#9660;</span></a>
                    <a class="sub-menu" href="../logout.html">Logout</a>

                </li>

            </ul>
        </nav>
    </div>
</div>

<div id ='login' class=''>
    <form action='<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>' method='POST'>
    Username: <input type="text" name="reg_username" value='<?php if(isset($_POST['reg_username'])) echo $reg_username; ?>'><br>
    Email: <input type="text" name="reg_email" value='<?php if(isset($_POST['reg_email'])) echo $reg_email; ?>'><br>
    Password: <input type="password" name="reg_pass" value="<?php if(isset($_POST['reg_pass'])) echo $reg_pass; ?>"><br>
    Re-Password: <input type="password" name="reg_repass" value="<?php if(isset($_POST['reg_repass'])) echo $reg_repass; ?>"><br>
    <button type="submit" value="register">Sign Up</button>
    </form>

</div>

</body>
</html>
