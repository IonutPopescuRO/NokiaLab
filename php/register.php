<?php
	header('Access-Control-Allow-Origin: *');
	include 'libs/conn.php';
	
	function getHashPassword($password, $salt) {
		return hash('sha256', $password.$salt);
	}
	
	function random_salt($length = 10) {
		$characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
		$charactersLength = strlen($characters);
		$randomString = '';
		for ($i = 0; $i < $length; $i++) {
			$randomString .= $characters[rand(0, $charactersLength - 1)];
		}
		return $randomString;
	}
	
	$r = array('status' => 0, 'message' => 'Eroare');
	$name = $_POST['name'];
	$email = $_POST['email'];
	$password = $_POST['password'];
	
	//Check if email already exists
	$stmt = $conn->prepare("SELECT COUNT(*) FROM [TEST].[TEAM3_ACCOUNTS] WHERE email=:email");
	$stmt->bindparam(":email", $email);
	$stmt->execute();
	
	$email_check = $stmt->fetchColumn();//0 = not registred
	
	if(!$email_check)
	{
		$salt = random_salt();
		$password = getHashPassword($password, $salt);
		
		$stmt = $conn->prepare("INSERT INTO [TEST].[TEAM3_ACCOUNTS] ([NUME], [EMAIL], [PASSWORD], [SALT]) VALUES(:name, :email, :password, :salt)");
		$stmt->bindparam(":name", $name);
		$stmt->bindparam(":email", $email);
		$stmt->bindparam(":password", $password);
		$stmt->bindparam(":salt", $salt);
		
		$stmt->execute();
		
		$r = array('status' => 1, 'message' => 'Contul a fost creat cu succes!');
	} else $r['message'] = 'Email-ul este deja folosit.';
	
	print json_encode($r);
