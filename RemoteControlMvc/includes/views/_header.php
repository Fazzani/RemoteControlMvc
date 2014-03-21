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

$(document).on('mobileinit',function(){
	
	console.log('mobileinit');
	$.mobile.pushStateEnabled = false;
	// $.mobile.loader.prototype.options.text = "loading";
	// $.mobile.loader.prototype.options.textVisible = true;
	// $.mobile.loader.prototype.options.theme = "a";
	$.mobile.loader.prototype.options.html = "<span class='ui-corner-all ui-loader' data-defaults='false'><img src='assets/img/loader.gif' /></span>";
	$.mobile.pageLoadErrorMessage = 'Error';
	$.mobile.ignoreContentEnabled = true;
	$.mobile.hashListeningEnabled = true;
	$.mobile.defaultPageTransition = $.mobile.transitionFallbacks.flow;
	$.event.special.swipe.scrollSupressionThreshold = 10;
	// More than this horizontal displacement, and we will
	// suppress scrolling.
	$.event.special.swipe.horizontalDistanceThreshold = 25;
	// Swipe horizontal displacement must be more than this.
	$.event.special.swipe.durationThreshold = 500;
	// More time than this, and it isn't a swipe.
	$.event.special.swipe.verticalDistanceThreshold = 75;
	// $.mobile.ajaxEnabled = false;
	// This second step ensures that the insertion of the new
	// toolbar does not
	// affect page height
	// $.mobile.resetActivePageHeight();
});
var xremote = window.xremote || {};
xremote.context = {		
			isFirstCnx : '<?= HostsManager::isFirstCnx() ?>'=='1' ? true: false,
     		isConnected: '<?= HostsManager::IsConnected() ?>'=='1' ? true: false,
     		rurl : '<?php echo($rurl); ?>',
			url : '<?php echo($url); ?>'
	};
</script>

</head>
<body> 

<div data-role="page" data-theme="b" id="page_<?php echo strtolower(str_replace(" ","",$title))?>">
	
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