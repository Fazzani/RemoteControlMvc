<?php
render('_header',array('title'=>$title,
			'url'		=> $url,
			'rurl'		=> $rurl));?>
<?php
try {
	if (HostsManager::IsConnected () && array_key_exists("episodes",$response ["result"])) {
?>
<ul data-role="listview" data-inset="true" data-icon="carat-r">
			<?php foreach ( $response ["result"] ["episodes"] as $tvshow ) {
			
				?>
<li class="ui-btn ui-li ui-li-has-thumb" data-method="VideoLibrary.GetSeasons" data-params='{"tvshowid":<?= $tvshow["episodeid"]?>}'>
<a
		href="#"
		class="xbmcAction"
		data-method="Player.Open"
		data-params='{"item":{"movieid":<?= $tvshow["episodeid"]?>}}'
	>
	<img
		src="<?php echo $rurl.'image/image://'.str_replace("%","%25",urlencode(substr(urldecode(explode("://",$tvshow["thumbnail"])[1]), 0, -1)));?>"
		height="200"
		width="200"
		alt=""
	/>
	<h2>
	<?= $tvshow["title"]?>
	</h2>
		<span class="ui-li-count">
            <?php echo ceil($tvshow["rating"]);?>
		</span>
		<p class="ui-li-desc"><?= $tvshow["plot"]?></p>
	</a>
</li>
<?php
			}?>
</ul>
			<?php 
	}
} catch ( Exception $e ) {
}?>

<?php render('_footer');?>

