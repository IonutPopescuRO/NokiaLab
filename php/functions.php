<?php
	//DateAdd(DAY, 1, :start)
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

	function get_incidents_by_status($periodicity, $per=null, $status=null, $start=null, $end=null) {
		global $conn;

		$status_query = "[STATUS]!='Resolved'";
		if($status!=null)
			$status_query = "[STATUS]='".$status."'";
		$selection = [
			1 => "FORMAT([SUBMIT_DATE],'dd.MM')",
			2 => "DATEPART(week, [SUBMIT_DATE])",
			3 => "FORMAT([SUBMIT_DATE],'MM.yyyy')",
		];
		if($per!=null)
			$status_query.=" AND ".$selection[$periodicity]." = :periodicity";


		$stmt = $conn->prepare("SELECT [PRIORITY], Count(*) AS COUNT
							FROM [TEST].[TEAM3_INCIDENTS] WITH(NOLOCK)
							WHERE ".$status_query."
							GROUP BY [PRIORITY]
							ORDER BY [PRIORITY] ASC");
		if($per!=null)
			$stmt->bindparam(":periodicity", $per);
			
		$stmt->execute();

		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		return $result;
	}
	
	function get_status_list($periodicity, $start=null, $end=null) {
		global $conn;

		$selection = [
			1 => "FORMAT([SUBMIT_DATE],'dd.MM')",
			2 => "DATEPART(week, [SUBMIT_DATE])",
			3 => "FORMAT([SUBMIT_DATE],'MM.yyyy')",
		];
		if(!$start && !$end)
		{
			$stmt = $conn->query("SELECT [STATUS], COUNT([STATUS]) as COUNT, ".$selection[$periodicity]." as X
								FROM [TEST].[TEAM3_INCIDENTS] WITH(NOLOCK)
								WHERE DATEPART(year, GETDATE()) = DATEPART(year, [SUBMIT_DATE]) AND DATEPART(week, GETDATE()) = DATEPART(week, [SUBMIT_DATE])
								GROUP BY ".$selection[$periodicity].", [STATUS] ORDER BY ".$selection[$periodicity]." ASC, [STATUS] ASC");
		} else {
			$stmt = $conn->prepare("SELECT [STATUS], COUNT([STATUS]) as COUNT, ".$selection[$periodicity]." as X
								FROM [TEST].[TEAM3_INCIDENTS] WITH(NOLOCK)
								where [SUBMIT_DATE] BETWEEN :start AND :end
								GROUP BY ".$selection[$periodicity].", [STATUS] ORDER BY ".$selection[$periodicity]." ASC, [STATUS] ASC");
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
								AND DATEPART(week, GETDATE()) = DATEPART(week, [SUBMIT_DATE])
								ORDER BY [SUBMIT_DATE] ASC");
			$stmt->bindparam(":priority", $priority);
		} else {
			$stmt = $conn->prepare("SELECT [INCIDENT_NUMBER], [STATUS], [SUBMIT_DATE], [CAT_TIER_1]
								FROM [TEST].[TEAM3_INCIDENTS]
								WHERE priority = :priority AND ".$status_query." AND [SUBMIT_DATE] BETWEEN :start AND :end
								ORDER BY [SUBMIT_DATE] ASC");
			$stmt->bindparam(":priority", $priority);
			$stmt->bindparam(":start", $start);
			$stmt->bindparam(":end", $end);
		}
		$stmt->execute();
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		return $result;
	}
	
	function get_quality_factor($periodicity, $start=null, $end=null) {
		global $conn;

		$selection = [
			1 => "FORMAT([SUBMIT_DATE],'dd.MM')",
			2 => "DATEPART(week, [SUBMIT_DATE])",
			3 => "FORMAT([SUBMIT_DATE],'MM.yyyy')",
		];
		if(!$start && !$end)
		{
			$stmt = $conn->query("SELECT SUM(CASE WHEN [STATUS] = 'Resolved' THEN 1 END) AS Resolved,
									SUM(CASE WHEN [STATUS] != 'Resolved' THEN 1 END) AS Unsolved,
									COUNT([STATUS]), ".$selection[$periodicity]." as X FROM [TEST].[TEAM3_INCIDENTS] 
									WHERE DATEPART(year, GETDATE()) = DATEPART(year, [SUBMIT_DATE]) AND DATEPART(week, GETDATE()) = DATEPART(week, [SUBMIT_DATE])
									GROUP BY ".$selection[$periodicity]." ORDER BY ".$selection[$periodicity]." ASC;");
		} else {
			$stmt = $conn->prepare("SELECT SUM(CASE WHEN [STATUS] = 'Resolved' THEN 1 END) AS Resolved,
									SUM(CASE WHEN [STATUS] != 'Resolved' THEN 1 END) AS Unsolved,
									COUNT([STATUS]), ".$selection[$periodicity]." as X FROM [TEST].[TEAM3_INCIDENTS] 
									WHERE [SUBMIT_DATE] BETWEEN :start AND :end
									GROUP BY ".$selection[$periodicity]." ORDER BY ".$selection[$periodicity]." ASC;");
			$stmt->bindparam(":start", $start);
			$stmt->bindparam(":end", $end);
			$stmt->execute();
		}
		$result = $stmt->fetchAll(PDO::FETCH_ASSOC);
		
		return $result;
	}