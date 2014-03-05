<?php

/* This controller renders the category pages */

class SettingsController extends  BaseController{
	public function handleRequest(){
		render('settings',array(
		'title'=> 'settings',
		'url'		=> $this->url,
		'rurl'		=> $this->rurl
		));
	}
}


?>