
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
</body>
<script src="assets/js/simple-app.js"></script>
<script src="assets/js/xbmcDefaultLibrary.js"></script>
<script src="assets/js/MediaLibrary.js"></script>
</html>
