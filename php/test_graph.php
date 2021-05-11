<?php
	header('Access-Control-Allow-Origin: *');
	include 'libs/conn.php';
	include 'functions.php';
	
	$type = isset($_POST['type']) ? intval($_POST['type']) : 1;
	$start = isset($_POST['start']) ? $_POST['start'] : null;
	$end = isset($_POST['end']) ? $_POST['end'] : null;
	
	$result = ['status' => 0, 'message' => 'Datele introduse nu sunt valide.'];
	
	if(in_array($type, [1,2,3,4]))
	{
		$result = ['status' => 1, 'type' => $type, 'incidents_stats' => get_unsolved_incidents($type, $start, $end), 'status_list' => get_status_list($type, $start, $end)];
	} else if($type==5)
	{
		$priority = isset($_POST['priority']) ? $_POST['priority'] : 0;
		$result = ['status' => 1, 'type' => $type, 'data' => get_status_list_table($priority, $start, $end)];
	}

	die(json_encode($result));