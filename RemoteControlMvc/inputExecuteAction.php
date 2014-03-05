<?php
require_once "includes/main.php";
$ctrl = new BaseController();
//$cmdHome = '{"jsonrpc":"2.0","id": 1,"method":"GUI.ActivateWindow", "params": {"window":"video"}, "id": "1"}}';
$id = isset ( $_GET ['id'] ) ? $_GET ['id'] : 1;
$action = isset ( $_GET ['action'] ) ? $_GET ['action'] : "home";
$method = isset ( $_GET ['method'] ) ? $_GET ['method'] : "";
$params = isset ( $_GET ['param'] ) ? $_GET ['param'] : "";
$type = isset ( $_GET ['type'] ) ? $_GET ['type'] : "";

// Set your return content type
header ( 'Content-type: application/json' );
// Player.Open

if (isset ( $_GET ['request'] )) {
	$daurl = $ctrl->rurl . 'jsonrpc?request=' . ${$_GET ['request']}; // .$guiGetProperties;
	
} else if (isset ( $_GET ['method'] )) {
	if (isset ( $_GET ['param'] )){
	//	echo($_GET ['param']);
		$daurl = $ctrl->rurl . 'jsonrpc?request={"jsonrpc":"2.0","method":"' . $method . '","params":' . $params . ',"id":1}';
	}
	else
		$daurl = $ctrl->rurl . 'jsonrpc?request={"jsonrpc":"2.0","method":"' . $method . '","id":1}';
	//echo $daurl;
} else // Website url to open
if ($action == "home") {
	$daurl = $ctrl->rurl . 'jsonrpc?request={"jsonrpc":"2.0","method":"Input.Home","id":1}';
} else if ($action == "play" || $action == "pause") {
	$daurl = $ctrl->rurl . 'jsonrpc?request={"jsonrpc":"2.0","method":"Player.PlayPause","params":{"playerid":' . $id . '},"id":1}';
} else if ($action == "editmeta") {
	$sparam = "";
	
	$decode = json_decode ( $params, true );
	
	foreach ( $decode as $d ) {
		$sparam = (strlen ( $sparam ) == 0 ? $sparam : $sparam . ',') . '"' . $d ["id"] . '":"' . $d ["value"] . '"';
	}
	
	if ($type == "movie") {
		$daurl = $ctrl->rurl . 'jsonrpc?request={"jsonrpc":"2.0","method":"VideoLibrary.SetMovieDetails","id":1,"params":{"movieid":' . $id . ',' . $sparam . '}}';
	} else if ($type == "tvshow") {
	} else if ($type == "episode") {
	}
	$daurl = str_replace ( " ", "%20", $daurl );
} else {
	$daurl = $ctrl->rurl . 'jsonrpc?request={"jsonrpc":"2.0","method":"Input.ExecuteAction","params":{"action":"' . $action . '"},"id":1}';
}

 //echo($daurl);
//echo $_SESSION ["isConnected"];
if (HostsManager::IsConnected()) {
	// Get that website's content
	$handle = fopen ( $daurl, "r" );
	// If there is something, read and return
	if ($handle) {
		while ( ! feof ( $handle ) ) {
			$buffer = fgets ( $handle, 4096 );
			// echo str_replace($rurl ."jsonrpc?request=","",);
			echo $buffer;
		}
		fclose ( $handle );
	}
}
?>