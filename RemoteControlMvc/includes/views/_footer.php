   </div>
	     </div>
	   <div id="statusbar">
      <div
         style="display: none; height: 100%"
         id="nowPlayingPanel"
      >
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
       <p>
            <input
               type="text"
               name="configname"
               placeholder="Le nom de la config..."
               id="configName"
            required/>
         </p>
         <p>
            <input
               type="text"
               name="host"
               placeholder="Adresse du serveur Xbmc..."
               id="configAdress"
            required/>
         </p>
         <p>
            <input
               type="text"
               name="port"
               placeholder="Port..."
               id="configport"
            required/>
         </p>
         <p>
            <input
               type="text"
               name="user"
               placeholder="Nom d'utilisateur..."
               id="configuser"
            />
         </p>
         <p>
            <input
               type="password"
               name="password"
               placeholder="Mot de passe..."
               id="configpwd"
            />
            <input
               type="hidden"
               name="ismodif"
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
      <input type="hidden" name="selectedconfig" id="selectedconfig"/>
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

</body>
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
<script src="http://code.jquery.com/mobile/1.4.2/jquery.mobile-1.4.2.min.js"></script>
<script src="assets/js/simple-app.js"></script>

<script
   type="text/javascript"
   src="assets/js/xbmcDefaultLibrary.js"
></script>
<script
   type="text/javascript"
   src="assets/js/MediaLibrary.js"
></script>
</html>