<?php
render('_header',array('title'=>$title,
			'url'		=> $url,
			'rurl'		=> $rurl));?>
<?php
try {
	if (HostsManager::IsConnected () && array_key_exists("tvshows",$response ["result"])) {
		//print_r($response);?>
<ul data-role="listview" data-inset="true" data-icon="carat-r" data-filter="true" data-filter-placeholder="Search Tv shows...">
			<?php foreach ( $response ["result"] ["tvshows"] as $tvshow ) {
				?>
<li data-url="?tvshowid=<?= $tvshow['tvshowid']?>" class=" ui-btn ui-li ui-li-has-thumb" data-method="VideoLibrary.GetSeasons" data-func="loadNestList" data-params='{"tvshowid":<?= $tvshow["tvshowid"]?>}'>
<a href="?tvshows=<?= $tvshow['tvshowid']?>">
	<img
		src="<?php echo $rurl.'image/image://'.str_replace("%","%25",urlencode(substr(urldecode(explode("://",$tvshow["thumbnail"])[1]), 0, -1)));?>"
		height="200"
		width="200"
		alt=""
	/>
	<h2>
	<?= $tvshow["label"]?>
	</h2>
	<p class="ui-li-aside">
            <?php echo $tvshow["year"];?>
		</p>
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

