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
<div
   id="detailsMovie"
   style="position: relative;"
>
   <img
      width="100%"
      height="100%"
      style="opacity: 0.5;"
      src="<?php echo $rurl.'image/image://'.str_replace("%","%25",urlencode(substr(urldecode(explode("://",$response["thumbnail"])[1]), 0, -1)));?>"
   > </img>
   <div class="detailMovie">
      <div>
         <h2 class="inline-title">
            <?= $response["label"]?>
         </h2>
         <span class="ui-mini">(<?= $response["originaltitle"]?>) <span class="right-position midium-title"> <?php echo $response["year"];?>
         </span>
      
      </div>
      <div>
         </span> <span class="midium-title">Genre :</span>
         <?php
   foreach ( $response["genre"] as $genre ) {?>
         <span><?= $genre?> </span>
         <?php }
         ?>
      </div>
      <div>
         </span> <span class="midium-title">Réalisateurs :</span>
         <?php
   foreach ( $response["director"] as $director ) {?>
         <span><?= $director?> </span>
         <?php }
         ?>
      </div>
      <div >
         <?php
   foreach ( $response["cast"] as $cast ) {?>
   <div class="cast-bloc">
         <img width="100%" height="80%"  class="ui-corner-all ui-shadow"
            src="<?php echo $rurl.'image/image://'.str_replace("%","%25",urlencode(substr(urldecode(explode("://",$cast["thumbnail"])[1]), 0, -1)));?>"
         > </img>
         <p class="ui-mini"><?= $cast["name"]?> </p>
         </div>
         <?php }
         ?>
      </div>
      <div class="ui-body ui-body-b ui-corner-all">
         <h3 class="ui-bar ui-bar-b">Résumé</h3>
         <p><?= $response["plot"]?></p>
      </div>
   </div>
</div>
<?php
} catch ( Exception $e ) {
	print_r ( $e );
}
?>
<?php render('_footer');?>
