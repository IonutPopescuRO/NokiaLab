<?php
	header('Access-Control-Allow-Origin: *');
	
	$r = json_encode(array('status' => 1, 'data' => array(65, 59, 80, 81, 56, 55, 40)));
	die($r);