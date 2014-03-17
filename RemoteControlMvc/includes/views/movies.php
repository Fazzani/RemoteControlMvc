<?php
render ( '_header', array (
'title' => $title,
'url' => $url,
'rurl' => $rurl
) );
?>
<?php

try {
	if (HostsManager::IsConnected () && array_key_exists("movies",$response ["result"])) {
			?>
<ul
   data-role="listview"
   data-inset="true"
   data-icon="carat-r"
   data-filter="true"
   data-filter-placeholder="Search movies..."
>
   <?php
   foreach ( $response ["result"] ["movies"] as $movie ) {
			?>
   <li 
      class="ui-btn ui-li ui-li-has-thumb"
   ><a href="?movies&movieid=<?= $movie['movieid']?>"><img
  		height="80px"
   		width="80px"
   		src="assets/img/loader-img.gif" 
        id="poster"
        class="movie-pic lazy"
        data-original="<?php echo (getXbmcImg($movie["thumbnail"], $rurl));?>"
      	/>
         <h2>
            <?= $movie["label"]?>
         </h2>
         <p class="ui-li-aside">
            <?php echo $movie["year"];?>
         </p>
         <p class="ui-li-desc">
            <?= $movie["plot"]?>
         </p> </a></li>
   <?php
		}
		?>
</ul>
<?php
	}
} catch ( Exception $e ) {
	print_r ( $e );
}
?>
<?php render('_footer');?>