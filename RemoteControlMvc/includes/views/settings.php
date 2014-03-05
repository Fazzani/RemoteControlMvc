<?php render('_header',array('title'=>$title,
			'url'		=> $url,
			'rurl'		=> $rurl));?>
<ul>
   <?php
   if (isset($_COOKIE['hosts'])) {
   	foreach ($_COOKIE['hosts'] as $name => $value) {
   		$isActive =  HostsManager::isActiveconfig($name)?'selected':'';
   		$isOnline =  HostsManager::IsActiveCnx($name)?'':'ui-state-disabled';
   		
   		echo("<li  class='ui-corner-all listconfig ".$isActive." ".$isOnline."'><span class='config_select' data-val='".$value."'>". htmlspecialchars($name).
   				"</span><span class='actions-config'>
   					<a href='#' data-val='".$value."' class='config_item ui-btn ui-box-heighlight ui-corner-all ui-btn-inline ui-icon-edit ui-btn-icon-notext'></a>
   					<a href='#' data-rel='settings.php?delconfig=".$name."' class='ui-btn ui-box-heighlight ui-corner-all ui-btn-inline ui-icon-delete  ui-btn-icon-notext'></a>
   				</span></li>");
   	}
   	echo("<li id='add-conf' class='listconfig ui-btn ui-corner-all' data-val=''>Une nouvelle config</li>");
   }
   ?>
</ul>

<?php render('_footer');?>