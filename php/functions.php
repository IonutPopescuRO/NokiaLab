<?php
	function get_date($type)
	{
		$d = strtotime("today");
		$start = null;

		switch ($type) {
			case 2:
				$start = date("Y-m-d", strtotime("last monday midnight", $d));
				break;
			case 3:
				$start = date("Y-m-d", strtotime("first day of this month", $d));
				break;
			case 4:
				$start = date('Y-m-d', strtotime('first day of january this year'));
				break;
		}

		return ['start' => $start, 'end' => date("Y-m-d", $d)];
	}

	function get_incidents_by_status($type, $status=null, $start=null, $end=null) {
		global $conn;
		$cases = [ //1 = last week, 2 = last month, 3 = last year
			1 => 'DATEPART(year, GETDATE()) = DATEPART(year, [SUBMIT_DATE]) AND DATEPART(month, GETDATE()) = DATEPART(month, [SUBMIT_DATE])',
			2 => 'DATEPART(year, GETDATE()) = DATEPART(year, [SUBMIT_DATE]) AND DATEPART(week, GETDATE()) = DATEPART(week, [SUBMIT_DATE])',
			3 => 'DATEPART(year, GETDATE()) = DATEPART(year, [SUBMIT_DATE]) AND DATEPART(month, GETDATE()) = DATEPART(month, [SUBMIT_DATE])',
			4 => 'DATEPART(year, [SUBMIT_DATE]) = 2021',
		];

		$status_query = "[STATUS]!='Resolved'";
		if($status!=null)
			$status_query = "[STATUS]='".$status."'";

		if(!$start && !$end)
		{
			$stmt = $conn->query("SELECT [PRIORITY], Count(*) AS COUNT
								FROM [TEST].[TEAM3_INCIDENTS] WITH(NOLOCK)
								WHERE ".$status_query." 
								AND ".$cases[$type]."
								GROUP BY [PRIORITY]
								ORDER BY [PRIORITY] ASC");
		} else {
			$stmt = $conn->prepare("SELECT [PRIORITY], Count(*) AS COUNT
								FROM [TEST].[TEAM3_INCIDENTS] WITH(NOLOCK)
								WHERE ".$status_query." AND [SUBMIT_DATE] BETWEEN DateAdd(DAY, 1, :start) AND :end
								GROUP BY [PRIORITY]
								ORDER BY [PRIORITY] ASC");
			$stmt->bindparam(":start", $start);
			$stmt->bindparam(":end", $end);
			$stmt->execute();
		}
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		return $result;
	}
	
	function get_status_list($type, $start=null, $end=null) {
		global $conn;
		$cases = [ //1 = last week, 2 = last month, 3 = last year
			1 => 'DATEPART(year, GETDATE()) = DATEPART(year, [SUBMIT_DATE]) AND DATEPART(month, GETDATE()) = DATEPART(month, [SUBMIT_DATE])',
			2 => 'DATEPART(year, GETDATE()) = DATEPART(year, [SUBMIT_DATE]) AND DATEPART(week, GETDATE()) = DATEPART(week, [SUBMIT_DATE])',
			3 => 'DATEPART(year, GETDATE()) = DATEPART(year, [SUBMIT_DATE]) AND DATEPART(month, GETDATE()) = DATEPART(month, [SUBMIT_DATE])',
			4 => 'DATEPART(year, [SUBMIT_DATE]) = 2021',
		];
		if(!$start && !$end)
		{
			$stmt = $conn->query("SELECT [STATUS], Count(*) AS COUNT
								FROM [TEST].[TEAM3_INCIDENTS] WITH(NOLOCK)
								WHERE ".$cases[$type]."
								GROUP BY [STATUS]
								ORDER BY [STATUS] ASC");
		} else {
			$stmt = $conn->prepare("SELECT [STATUS], Count(*) AS COUNT
								FROM [TEST].[TEAM3_INCIDENTS] WITH(NOLOCK)
								where [SUBMIT_DATE] BETWEEN DateAdd(DAY, 1, :start) AND :end
								GROUP BY [STATUS]
								ORDER BY [STATUS] ASC");
			$stmt->bindparam(":start", $start);
			$stmt->bindparam(":end", $end);
			$stmt->execute();
		}
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		return $result;
	}
	
	function get_status_list_table($priority, $status=null, $start=null, $end=null) {
		global $conn;

		$status_query = "[STATUS]!='Resolved'";
		if($status!=null)
			$status_query = "[STATUS]='".$status."'";
		
		if(!$start && !$end)
		{
			$stmt = $conn->prepare("SELECT [INCIDENT_NUMBER], [STATUS], [SUBMIT_DATE], [CAT_TIER_1]
								FROM [TEST].[TEAM3_INCIDENTS]
								WHERE priority = :priority AND ".$status_query." AND DATEPART(year, GETDATE()) = DATEPART(year, [SUBMIT_DATE])
								AND DATEPART(month, GETDATE()) = DATEPART(month, [SUBMIT_DATE])
								ORDER BY [SUBMIT_DATE] ASC");
			$stmt->bindparam(":priority", $priority);
		} else {
			$stmt = $conn->prepare("SELECT [INCIDENT_NUMBER], [STATUS], [SUBMIT_DATE], [CAT_TIER_1]
								FROM [TEST].[TEAM3_INCIDENTS]
								WHERE priority = :priority AND ".$status_query." AND [SUBMIT_DATE] BETWEEN DateAdd(DAY, 1, :start) AND :end
								ORDER BY [SUBMIT_DATE] ASC");
			$stmt->bindparam(":priority", $priority);
			$stmt->bindparam(":start", $start);
			$stmt->bindparam(":end", $end);
		}
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		return $result;
	}