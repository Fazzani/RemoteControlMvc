<?php

/* This controller renders the category pages */

class MoviesController extends BaseController{
	public function handleRequest(){
		if (isset($_GET ['movieid'])) {
				
			$rawresponse = parent::getjsonrpc ( sprintf (parent::videoLibraryGetMoviesDetails,$_GET ['movieid']), $this->url );
			$response = json_decode ( $rawresponse, true );
			if (HostsManager::IsConnected () && array_key_exists("moviedetails",$response ["result"]))
				render('MovieDetails',array('title'=> $response["result"]["moviedetails"]["title"],
						'url'		=> $this->url,
						'rurl'		=> $this->rurl,
						'response'=>$response["result"]["moviedetails"]));
		}
		else
		{
			$rawresponse = parent::getjsonrpc ( parent::videoLibraryGetMovies, $this->url );
			$response = json_decode ( $rawresponse, true );
			if (HostsManager::IsConnected () && array_key_exists("movies",$response ["result"]))

				render('movies',array('title'=> 'Movies',
						'url'		=> $this->url,
						'rurl'		=> $this->rurl,
						'response'=>$response));
		}
		//print_r($response ["result"]["moviedetails"]["label"]);
	}
}


?>