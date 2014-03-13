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
   src="http://code.jquery.com/mobile/1.4.2/images/ajax-loader.gif" 
         id="poster"
         class="movie-pic lazy"
         data-original="<?php echo $rurl.'image/image://'.str_replace("%","%25",urlencode(substr(urldecode(explode("://",$movie["thumbnail"])[1]), 0, -1)));?>"
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