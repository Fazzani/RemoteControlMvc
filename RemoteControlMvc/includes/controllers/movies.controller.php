<?php

/* This controller renders the category pages */

class MoviesController extends BaseController{
	public function handleRequest(){
		//if (HostsManager::IsConnected ()) {
			$rawresponse = parent::getjsonrpc ( parent::videoLibraryGetMovies, $this->url );
			$response = json_decode ( $rawresponse, true );
			render('movies',array('title'=> 'Movies',
			'url'		=> $this->url,
			'rurl'		=> $this->rurl,
			'response'=>$response));
		//}
	}
}


?>