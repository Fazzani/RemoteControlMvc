
</div>
</div>
<div
   id="hostconfigpopup"
   data-role="popup"
   data-theme="b"
   data-overlay-theme="a"
   data-transition="turn"
>
   <!--    <a href="#" data-rel="back" data-role="button" data-theme="a" data-icon="delete" data-iconpos="notext" class="ui-btn-right">Close</a> -->
   <h4>Les paramètres de la hôte XBMC</h4>
   <form
      action="includes/config.php"
      method="post"
      id="configform"
      data-ajax="false"
   >
      <fieldset>
         <p>
            <input
               type="text"
               name="configname"
               placeholder="Le nom de la config..."
               id="configName"
               required
            />
         </p>
         <p>
            <input
               type="text"
               name="host"
               placeholder="Adresse du serveur Xbmc..."
               id="configAdress"
               required
            />
         </p>
         <p>
            <input
               type="text"
               name="port"
               placeholder="Port..."
               id="configport"
               required="required" data-mini="true" 
               pattern="[0-9]{4}"
            />
         </p>
         <p>
            <input
               type="text"
               name="user"
               placeholder="Nom d'utilisateur..." data-mini="true" 
               id="configuser"
            />
         </p>
         <p>
            <input
               type="password"
               name="password"
               placeholder="Mot de passe..." data-mini="true" 
               id="configpwd"
            /> <input
               type="hidden"
               name="ismodif" data-mini="true" 
               id="ismodif"
               value="false"
            />
         </p>
         <p>
            <input
               type="submit"
               value="Valider"
               name="submitSettings"
               id="submitSettings"
            />
         </p>
      </fieldset>
   </form>
</div>
<div
   id="listconfig"
   data-role="popup"
   data-theme="b"
   data-overlay-theme="b"
   data-transition="turn"
>
   <p>Les configurations XBMC :</p>
   <form
      action="includes/config.php"
      method="post"
      id="listconfigform"
   >
      <input
         type="hidden"
         name="selectedconfig"
         id="selectedconfig"
      />
      <?php
      if (isset($_COOKIE['hosts'])) {
   	foreach ($_COOKIE['hosts'] as $name => $value) {
   		echo("<li class='config_select ui-btn ui-corner-all ui-btn-inline' data-val='".$value."'>". htmlspecialchars($name)."</li>");
   	}
   	echo("<li id='add-conf' class='ui-btn ui-corner-all ui-btn-inline  ui-icon-plus ui-btn-icon-notext' data-val=''></li>");
   }
   ?>
   </form>
</div>
<div data-role="sidemenu" data-headername="Lecteur" data-widthcoef="0.6">
	<div style="height: 100%" id="nowPlayingPanel">
      <div id="nowPlayingContent">
         <div id="audioDescription">
            <div id="audioCoverArt"></div>
            <div id="audioTrackWrap">
               <div id="audioArtistTitle"></div>
               <div id="audioAlbumTitle"></div>
            </div>
            <div id="audioTrackTitle"></div>
            <div id="audioDuration"></div>
         </div>
         <div id="videoDescription">
            <div id="videoCoverArt"></div>
            <div id="videoTrackWrap">
               <div id="videoShowTitle"></div>
            </div>
            <div id="videoTitle"></div>
            <div id="videoDuration"></div>
         </div>
         <div id="lecteur">
            <span
               title="Previous"
               id="pbPrev"
            ></span> <span
               title="Pause"
               id="pbPause"
               style="display: none;"
            ></span> <span
               title="Play"
               id="pbPlay"
            ></span> <span
               title="Stop"
               id="pbStop"
            ></span> <span
               title="Next"
               id="pbNext"
            ></span>
         </div>
      </div>
      <div id="playbackControls">
         <div id="progressBar">
            <div
               style="width: 0%"
               class="elapsedTime"
            ></div>
            <span class="progressIndicator"></span>
         </div>
      </div>
      <span id="nextText">Next: </span>
      <div
         style="display: none;"
         id="nextTrack"
      ></div>
      <div
         style="display: none;"
         id="nowPlayingPlaylist"
      ></div>
   </div>
	</div>
</body>
<!-- <script src="assets/js/MediaLibrary.js"></script> -->
<script src="assets/js/xbmcDefaultLibrary.js"></script>
<script src="assets/js/simple-app.js"></script>
</html>
