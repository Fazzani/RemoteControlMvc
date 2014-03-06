<?php

/* This controller renders the home page */

class HomeController extends  BaseController{
	public function handleRequest(){
		render('home',array(
			'title'		=> 'home',
			'url'		=> $this->url,
			'rurl'		=> $this->rurl,
			'content'	=> ''
		));
	}
}

?>