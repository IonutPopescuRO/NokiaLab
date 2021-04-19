<?php

$config = "sqlsrv:Server=tcp:synopsis-playground.database.windows.net,1433;Database=PLAYGROUND";
$conn = new PDO($config, 'playground', 'synopsis123@');