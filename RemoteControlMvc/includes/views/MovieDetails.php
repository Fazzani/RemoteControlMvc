<?php
render ( '_header', array (
		'title' => $title,
		'url' => $url,
		'rurl' => $rurl 
) );
?>
<?php

try {
	
	?>
<div class="detailsMovieContainer">
	<img src="<?php echo getXbmcImg($response["thumbnail"], $rurl);?>" />
	<div class="detailsMovie">
		<div>
			<h2 class="inline-title">
            <?= $response["label"]?>
         </h2>
			<span class="ui-mini">(<?= $response["originaltitle"]?>) <span class="right-position midium-title"> <?php echo $response["year"];?>
         </span>
			</span>
		</div>
		<div>
			<span class="midium-title">Genre :</span>
         <?php
	foreach ( $response ["genre"] as $genre ) {
		?>
         <span><?= $genre?> </span>
         <?php
	}
	?>
      </div>
		<div>
			<span class="midium-title">Réalisateurs :</span>
         <?php
	foreach ( $response ["director"] as $director ) {
		?>
         <span><?= $director?> </span>
         <?php
	}
	?>
      </div>
		<ul
			id="carousel"
			class="elastislide-list"
		>
         <?php
	foreach ( $response ["cast"] as $cast ) {
		if (isset ( $cast ["thumbnail"] )) {
			?>
   
   <li><a href="#"> <img src="<?php echo (getXbmcImg($cast["thumbnail"], $rurl));?>" />
			</a></li>
         <?php
		}
	}
	?>
      </ul>
		<div>
			<h3 class="ui-bar ui-bar-b">Résumé</h3>
			<p><?= $response["plot"]?></p>
		</div>
	</div>
	<div
		data-role="footer"
		style="overflow: hidden;"
		data-position="fixed"
	>
		<div data-role="navbar">
			<ul>
				<li><a
					href="#"
					id="back2"
					data-icon="custom"
				></a></li>
				<li><a
				class="xbmcAction"
			data-method="Player.Open"
			data-params='{"item":{"movieid":<?= $response["movieid"]?>}}'
					href="#"
					id="play2"
					data-icon="custom"
				></a></li>
			</ul>
		</div>
		<!-- /navbar -->
	</div>
	<!-- /footer -->
	</div>
<?php
} catch ( Exception $e ) {
	print_r ( $e );
}
?>
<?php render('_footer');?>
