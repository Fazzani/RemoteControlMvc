<?php 
render('_header', array('title'=>$title,
			'url'		=> $url,
			'rurl'		=> $rurl));?>
<?php
try {
	if (HostsManager::IsConnected ()) {
		if (isset ( $response ["result"] ["movies"] ))
			foreach ( $response ["result"] ["movies"] as $movie ) {
				?>
<div>
	<h2>
		<a
			href="#"
			class="xbmcAction"
			data-method="Player.Open"
			data-params='{"item":{"movieid":<?= $movie["movieid"]?>}}'
		> <?= $movie["label"]?></a>
	</h2>
	<div class="sidebar">
		<img
			id="poster"
			class="movie-pic"
			src="<?php echo $rurl.'image/image://'.str_replace("%","%25",urlencode(substr(urldecode(explode("://",$movie["art"]["poster"])[1]), 0, -1)));?>"
		/>
		<div id="details"></div>
	</div>
	<div class="descmovie">
		<div id="year">
			<p>
            Year:
            <?php echo $movie["year"];?>
         </p>
		</div>
		<div id="rating">
			<p>
            Rating:
            <?php
				// put filled stars above blank stars and set visiblity to that of rating.
				$starNumber = round ( $movie ["rating"], 1 );
				echo $starNumber . '</p>';
				echo '<div style="z-index: 1;"><img style="z-index: 1;" src="assets/img/stars_empty.png" /></div>';
				$fullwidth = 160 * $starNumber / 10.0;
				echo '<div style="z-index: 2; width:' . $fullwidth . 'px; overflow:hidden;"> <img src="assets/img/stars_full.png" /></div>';
				?>
		</div>
	</div>
	<div class="movie-text">
      <?= $movie["plot"]?>
   </div>
</div>
<?php
			}
	}
} catch ( Exception $e ) {
print_r($e);
}
?>
<?php render('_footer');?>