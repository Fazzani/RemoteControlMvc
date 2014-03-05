<?php

/* This controller renders the category pages */

class LiveTvController extends  BaseController{
	public function handleRequest(){
		$rawresponse = parent::getjsonrpc ( parent::livetvChannels, $this->url );
		$response = json_decode ( $rawresponse, true );
		$responsegroup = json_decode ( $this->getjsonrpc ( parent::livetvgroups, $this->url ), true );
		render('livetv',array('title'=> 'live tv',
		'response'=>$response,
		'responsegroup'=>$responsegroup,
		'url'		=> $this->url,
		'rurl'		=> $this->rurl
		));
	}
}


?>