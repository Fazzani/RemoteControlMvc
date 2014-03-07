<?php
render('_header',array('title'=>$title,
			'url'		=> $url,
			'rurl'		=> $rurl));?>
<?php
try {
	if (HostsManager::IsConnected ()) {
		//print_r($response);

		if (isset ( $response ["result"] ["tvshows"] ))?>
<ul data-role="listview" data-inset="true" data-icon="carat-r" data-filter="true" data-filter-placeholder="Search Tv shows...">
			<?php foreach ( $response ["result"] ["tvshows"] as $tvshow ) {
				?>
<li class="nestedList ui-btn ui-li ui-li-has-thumb" data-method="VideoLibrary.GetSeasons"  data-params='{"tvshowid":<?= $tvshow["tvshowid"]?>}'>
	<img
		src="<?php echo $rurl.'image/image://'.str_replace("%","%25",urlencode(substr(urldecode(explode("://",$tvshow["art"]["poster"])[1]), 0, -1)));?>"
		height="200"
		width="200"
		alt=""
	/>
	<h2>
		<a href="#" class="xbmcAction"
            data-method="Player.Open"
            data-params='{"item":{"tvshowid":<?= $tvshow["tvshowid"]?>}}'>
	<?= $tvshow["label"]?></a>
	</h2>
	<p class="ui-li-aside">
            <?php echo $tvshow["year"];?>
		</p>
	<p class="ui-li-desc"><?= $tvshow["plot"]?></p>
	<ul id="nestedLevel1">
		<li>
		</li>
	</ul>
</li>
<?php
			}?>
</ul>
			<?php 
	}
} catch ( Exception $e ) {
}?>

<?php render('_footer');?>

