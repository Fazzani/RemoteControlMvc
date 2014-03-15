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
<div style="background: url(<?php echo $rurl.'image/image://'.str_replace("%","%25",urlencode(substr(urldecode(explode("://",$response["thumbnail"])[1]), 0, -1)));?>) no-repeat"
   id="detailsMovie"
   style="position: relative;"
>
   <div>
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
   foreach ( $response["genre"] as $genre ) {?>
         <span><?= $genre?> </span>
         <?php }
         ?>
      </div>
      <div>
          <span class="midium-title">Réalisateurs :</span>
         <?php
   foreach ( $response["director"] as $director ) {?>
         <span><?= $director?> </span>
         <?php }
         ?>
      </div>
      <ul id="carousel" class="elastislide-list">
         <?php
   foreach ( $response["cast"] as $cast ) {?>
   <li><a href="#">
         <img 
            src="<?php echo $rurl.'image/image://'.str_replace("%","%25",urlencode(substr(urldecode(explode("://",$cast["thumbnail"])[1]), 0, -1)));?>"
         />
         </a>
         </li>
         <?php }
         ?>
      </ul>
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
