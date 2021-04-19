<?php
	include 'libs/conn.php';
	
	function getHashPassword($password, $salt) {
		return hash('sha256', $password.$salt);
	}
	
	$email = $_POST['email'];
	
	$stmt = $db->prepare('SELECT * from [TEST].[TEAM3_ACCOUNTS] WHERE email=:email');
	$stmt->bindparam(":email", $email);
	$stmt->execute();
	
	$result = $stmt->fetchAll();
	
	if(isset($result[0]))
	{
		if(getHashPassword($_POST['password'], $result[0]['SALT']) == $result[0]['PASSWORD'])
			$r = json_encode(array('status' => 1, 'message' => 'Ai fost logat.'));
		else
			$r = json_encode(array('status' => 0, 'message' => 'Parola incorecta.'));
	} $r = json_encode(array('status' => 0, 'message' => 'Contul nu este inregistrat.'));
	die();