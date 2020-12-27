<?php
	$url = $_GET["url"];
	$command = "python main.py ".$_GET["url"];
	exec($command, $output);
	echo implode("\n", $output);
?>