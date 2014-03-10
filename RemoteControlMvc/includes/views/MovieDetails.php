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
<div id="detailsMovie">
   <video
      id="movie"
      width="200"
      height="200"
      preload
      controls
      poster="<?php echo $rurl.'image/image://'.str_replace("%","%25",urlencode(substr(urldecode(explode("://",$response["thumbnail"])[1]), 0, -1)));?>"
   >
      <object
         classid="clsid:67DABFBF-D0AB-41fa-9C46-CC0F21721616"
         width="320"
         height="260"
         codebase="http://go.divx.com/plugin/DivXBrowserPlugin.cab"
      >
         <param
            name="custommode"
            value="none"
         />
         <param
            name="previewImage"
            value="<?= $response["file"]?>"
         />
         <param
            name="autoPlay"
            value="false"
         />
         <param
            name="src"
            value="<?= $response["file"]?>"
         />
         <object
            type="application/x-vlc-plugin"
            pluginspage="http://www.videolan.org"
            data="<?= $response["file"]?>"
            width="400"
            height="300"
            id="video1"
         >
            <param
               name="movie"
               value="<?= $response["file"]?>"
            />
            <embed
               type="application/x-vlc-plugin"
               name="video1"
               autoplay="no"
               loop="no"
               width="400"
               height="300"
               target="<?= $response["file"]?>"
            />
         </object>
      </object>
      <?= $response["label"]?>
   </video>
   <h2>
      <?= $response["label"]?>
   </h2>
   
   <p class="ui-li-aside">
      <?php echo $response["year"];?>
   </p>
   <p class="ui-li-desc">
      <?= $response["plot"]?>
   </p>
</div>
<?php
} catch ( Exception $e ) {
	print_r ( $e );
}
?>
<?php render('_footer');?>
<script
   type="text/javascript"
   src="assets/flowplayer/flowplayer.min.js"
></script>
<script>
  var v = document.getElementById("movie");
  v.onclick = function() {
    if (v.paused) {
      v.play();
    } else {
      v.pause();
    }
  };
</script>
