<?php
	include 'libs/conn.php';
	
	$stmt = $conn->prepare("SELECT COUNT(*) FROM [TEST].[TEAM3_ACCOUNTS]");
	$stmt->execute();
	
	$r = json_encode(array('accounts' => $stmt->fetchColumn()));
	die($r);