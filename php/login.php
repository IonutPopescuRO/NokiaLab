<?php
	header('Access-Control-Allow-Origin: *');
	include 'libs/conn.php';
	
	function getHashPassword($password, $salt) {
		return hash('sha256', $password.$salt);
	}
	
	$email = $_POST['email'];
	
	$stmt = $conn->prepare('SELECT * from [TEST].[TEAM3_ACCOUNTS] WHERE email=:email');
	$stmt->bindparam(":email", $email);
	$stmt->execute();
	
	$result = $stmt->fetchAll();

	if($result)
	{
		if(getHashPassword($_POST['password'], $result[0]['SALT']) == $result[0]['PASSWORD'])
			$r = array('status' => 1, 'message' => 'Ai fost logat.');
		else
			$r = array('status' => 0, 'message' => 'Parola incorecta.');
	} else $r = array('status' => 0, 'message' => 'Contul nu este inregistrat.');
	print json_encode($r);
