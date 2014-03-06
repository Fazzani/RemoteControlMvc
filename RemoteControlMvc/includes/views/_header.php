<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html>
<head>
<meta
   http-equiv="Content-Type"
   content="text/html; charset=utf-8"
/>
<meta
   name="viewport"
   content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=1"
/>
<meta
   name="apple-mobile-web-app-capable"
   content="yes"
/>
<meta
   name="apple-mobile-web-app-status-bar-style"
   content="black-translucent"
/>
<title>Remote XBMC</title>
<link
   type="text/css"
   rel="stylesheet"
   href="assets/css/style.css"
/>
<link
   type="text/css"
   rel="stylesheet"
   href="assets/css/remote_style.css"
/>

<link
   rel="stylesheet"
   href="http://code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.min.css"
/>
<link
   rel="stylesheet"
   href="assets/css/simple-app.css"
/>
<!-- <link -->
<!--    rel="stylesheet" -->
<!--    type="text/css" -->
<!--    href="flowplayer/skin/playful.css" -->
<!-- /> -->
<link
   rel="stylesheet"
   type="text/css"
   href="assets/css/player.css"
/>
<link
   rel="shortcut icon"
   href="favicon.ico"
   type="image/x-icon"
/>
<script
   language="javascript"
   type="text/javascript"
>

var isFirstCnx = '<?= HostsManager::isFirstCnx() ?>'=='1' ? true: false;
var isConnected = '<?= HostsManager::IsConnected() ?>'=='1' ? true: false;
var rurl = '<?php echo($rurl); ?>';	
var url = '<?php echo($url); ?>';
console.log('isFirstCnx : ' + isFirstCnx);
console.log('isConnected : ' + isConnected);
</script>
</head>
<body> 

<div data-role="page" data-theme="b" id="page_<?php echo strtolower(str_replace(" ","",$title))?>">

	<div data-role="header" data-theme="b" data-position="fixed" data-id="PersistentHeader">
<!-- 	    <a href="./" data-icon="home" data-iconpos="notext" data-transition="fade">Home</a> <h1></h1>-->
		
		<div data-role="navbar" id="mainheader">
      		<ul>
        		<li><a href="./" data-icon="home" id="page_home">Home</a></li>
        		<li><a href="?livetv" data-icon="custom-livetv" id="page_livetv">Live Tv</a></li>
        		<li><a href="?tvshows" data-icon="custom-tvshows" id="page_tvshows">Tv Shows</a></li>
        		<li><a href="?movies" data-icon="custom-movies" id="page_movies">Movies</a></li>
        		<li><a href="?settings" data-icon="custom-settings" id="page_settings">Settings</a></li>
      		</ul>
    	</div>
	</div>

	<div data-role="content">