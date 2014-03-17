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
<!-- <link rel="stylesheet" type="text/css" href="assets/flowplayer/skin/minimalist.css"> -->
<link
   rel="shortcut icon"
   href="favicon.ico"
   type="image/x-icon"
/>
<script src="assets/js/jquery-1.11.0.min.js"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js"></script>
<script src="assets/js/jquery.mobile-1.4.2.min.js"></script>
<script src="assets/js/jquery.mobile.lazyloader.min.js"></script>
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
	<div data-role="sidemenu" data-headername="Lecteur" data-widthcoef="0.6">
		<div style="height: 100%" id="nowPlayingPanel">
      <div id="nowPlayingContent">
         <div id="audioDescription">
            <div id="audioCoverArt"></div>
            <div id="audioTrackWrap">
               <div id="audioArtistTitle"></div>
               <div id="audioAlbumTitle"></div>
            </div>
            <div id="audioTrackTitle"></div>
            <div id="audioDuration"></div>
         </div>
         <div id="videoDescription">
            <div id="videoCoverArt"></div>
            <div id="videoTrackWrap">
               <div id="videoShowTitle"></div>
            </div>
            <div id="videoTitle"></div>
            <div id="videoDuration"></div>
         </div>
         <div id="lecteur">
            <span
               title="Previous"
               id="pbPrev"
            ></span> <span
               title="Pause"
               id="pbPause"
               style="display: none;"
            ></span> <span
               title="Play"
               id="pbPlay"
            ></span> <span
               title="Stop"
               id="pbStop"
            ></span> <span
               title="Next"
               id="pbNext"
            ></span>
         </div>
      </div>
      <div id="playbackControls">
         <div id="progressBar">
            <div
               style="width: 0%"
               class="elapsedTime"
            ></div>
            <span class="progressIndicator"></span>
         </div>
      </div>
      <span id="nextText">Next: </span>
      <div
         style="display: none;"
         id="nextTrack"
      ></div>
      <div
         style="display: none;"
         id="nowPlayingPlaylist"
      ></div>
   </div>
	</div>
	<div data-role="header" data-position="fixed">
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