<?php

/* This controller renders the home page */

class HomeController extends  BaseController{
	public function handleRequest(){
		render('home',array(
			'title'		=> 'Welcome to our computer store',
			'url'		=> $this->url,
			'rurl'		=> $this->rurl,
			'content'	=> ''
		));
	}
}

?>