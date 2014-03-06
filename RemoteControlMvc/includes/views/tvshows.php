<?php
render('_header',array('title'=>$title,
			'url'		=> $url,
			'rurl'		=> $rurl));?>
<?php
try {
	if (HostsManager::IsConnected ()) {
		//print_r($response);
		if (isset ( $response ["result"] ["tvshows"] ))
			foreach ( $response ["result"] ["tvshows"] as $tvshow ) {
				?>
<div>
	<h2>
		<a href="#" class="xbmcAction"
            data-method="Player.Open"
            data-params='{"item":{"tvshowid":<?= $tvshow["tvshowid"]?>}}'>
	<?= $tvshow["label"]?></a>
	</h2>
	<img
		src="<?php echo $rurl.'image/image://'.str_replace("%","%25",urlencode(substr(urldecode(explode("://",$tvshow["art"]["poster"])[1]), 0, -1)));?>"
		height="200"
		width="224"
		alt=""
	/>
	<div class="movie-text"><?= $tvshow["plot"]?></div>
</div>
<?php
			}
	}
} catch ( Exception $e ) {
}?>

<?php render('_footer');?>

