<?php
	header('Access-Control-Allow-Origin: *');
	include 'libs/conn.php';
	include 'functions.php';
	
	$type = isset($_POST['type']) ? intval($_POST['type']) : 1;
	$periodicity = isset($_POST['periodicity']) ? intval($_POST['periodicity']) : 1;

	$start = isset($_POST['start']) ? $_POST['start'] : null;
	$end = isset($_POST['end']) ? $_POST['end'] : null;
	$statuses_order = ['Assigned', 'In progress', 'Pending', 'Cancelled', 'Closed', 'Resolved'];
	
	$result = ['status' => 0, 'message' => 'Datele introduse nu sunt valide.'];

	if($type==1)
		$result = ['status' => 1, 'type' => $type, 'incidents_stats' => get_incidents_by_status($periodicity, null, null, $start, $end), 'status_list' => get_status_list($periodicity, $start, $end), 'quality' => get_quality_factor($periodicity, $start, $end)];
	else if($type==2)
	{
		$priority = isset($_POST['priority']) ? $_POST['priority'] : 0;
		$incident_type = isset($_POST['incident_type']) ? $_POST['incident_type'] : null;
		$status = isset($statuses_order[$incident_type]) ? $statuses_order[$incident_type] : null;

		$result = ['status' => 1, 'type' => $type, 'data' => get_status_list_table($priority, $status, $start, $end)];
	} else if($type==3) {
		$status = isset($_POST['status']) ? intval($_POST['status']) : null; $status = 0;
		$per = isset($_POST['per']) ? $_POST['per'] : null;
		$status = isset($statuses_order[$status]) ? $statuses_order[$status] : null;
		
		$result = ['status' => 1, 'type' => $type, 'incidents_stats' => get_incidents_by_status($periodicity, $per, $status, $start, $end)];
	}

	die(json_encode($result));