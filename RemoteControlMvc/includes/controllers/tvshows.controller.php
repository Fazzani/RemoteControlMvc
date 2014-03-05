<?php

/* This controller renders the category pages */

class TvShowsController extends  BaseController{
	public function handleRequest(){
		$rawresponse = parent::getjsonrpc ( parent::videoLibraryGetTVShows, $this->url );
		$response = json_decode ( $rawresponse, true );
		render('tvshows',array(
		'title'=> 'tv Shows',
		'url'		=> $this->url,
		'rurl'		=> $this->rurl,
		'response'=>$response
		));
	}
}


?>