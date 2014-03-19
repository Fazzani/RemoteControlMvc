<?php

/* This controller renders the category pages */
class TvShowsController extends BaseController {
	public function handleRequest() {
		if (isset($_GET ['season'])) {
			$action = sprintf ( parent::getEpisodes, $_GET ['tvshows'], $_GET ['season'] );
			$view = "tvshowsEpisode";
		} else {
			$action = $_GET ['tvshows'] != "" ? sprintf ( parent::getSeasons, $_GET ['tvshows'] ) : parent::videoLibraryGetTVShows;
			$view = $_GET ['tvshows'] == "" ? "tvshows" : "tvshowsSeason";
		}
		$rawresponse = parent::getjsonrpc ( $action, $this->url );
		$response = json_decode ( $rawresponse, true );
		render ( $view, array (
				'title' => 'tv Shows',
				'url' => $this->url,
				'rurl' => $this->rurl,
				'response' => $response 
		) );
	}
}

?>