<?php
render('_header',array('title'=>$title,
			'url'		=> $url,
			'rurl'		=> $rurl));?>
<?php
try {
	if (HostsManager::IsConnected () && array_key_exists("seasons",$response ["result"])) {
	?>
<ul data-role="listview" data-inset="true" data-icon="carat-r">
			<?php foreach ( $response ["result"] ["seasons"] as $tvshow ) {
			
				?>
<li data-url="?tvshowid=<?= $tvshow['seasonid']?>" class=" ui-btn ui-li ui-li-has-thumb">
<a href="?tvshows=<?= $tvshow['tvshowid']?>&season=<?= $tvshow['season']?>">
	<img
		src="<?php echo $rurl.'image/image://'.str_replace("%","%25",urlencode(substr(urldecode(explode("://",$tvshow["thumbnail"])[1]), 0, -1)));?>"
		height="200"
		width="200"
		alt=""
	/>
	<h2>
	<?= $tvshow["label"]?>
	</h2>
		<span class="ui-li-count">
            <?php echo $tvshow["episode"];?>
		</span>
		<p class="ui-li-desc"><?= $tvshow["showtitle"]?></p>
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

