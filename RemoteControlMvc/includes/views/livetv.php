<?php 
render('_header',array('title'=>$title,
			'url'		=> $url,
			'rurl'		=> $rurl));?>
<?php
if (HostsManager::IsConnected () && array_key_exists("channelgroups",$responsegroup ["result"]) ) {
		?>
<div id="leftsystem">
   <ul data-role="listview" data-inset="true">
      <?php foreach ($responsegroup["result"]["channelgroups"] as $group){?>
      <li><a
         class="xbmcAction "
         data-ajax="false"
         data-method="PVR.GetChannelGroupDetails"
         id='<?= $group["channelgroupid"]?>'
         data-params='{"channelgroupid":<?= $group["channelgroupid"]?>}'
      ><?= $group["label"]?> </a></li>
      <?php }?>
   </ul>
</div>
<div id="rightsystem">
   <ul data-role="listview" data-filter="true">
      <?php foreach ($response["result"]["channels"] as $channel){?>
      <li>
        <a
            href="#"
            data-ajax="false"
            class="xbmcAction"
            data-method="Player.Open"
            data-params='{"item":{"channelid":<?= $channel["channelid"]?>}}'
         >(<?= $channel["channelid"]?>) <b><?= $channel["label"]?> </b>
         </a>
      </li>
      <?php }?>
   </ul>
</div>

<?php }?>
<?php render('_footer');
?>