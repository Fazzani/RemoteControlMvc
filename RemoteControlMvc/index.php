<?php

/*
 This is the index file of our simple website.
It routes requets to the appropriate controllers
*/

require_once "includes/main.php";

try {

	if(isset($_GET['tvshows'])){
		$c = new TvShowsController();
	}
	else if(isset($_GET['movies'])){
		$c = new MoviesController();
	}
	else if(isset($_GET['settings'])){
		$c = new SettingsController();
	}
	else if(isset($_GET['livetv'])){
		$c = new LiveTvController();
	}
	else if(empty($_GET)){
		$c = new HomeController();
	}
	else throw new Exception('Wrong page!');

	$c->handleRequest();
}
catch(Exception $e) {
	render('error', array('message'=>$e->getMessage()));
}
?>