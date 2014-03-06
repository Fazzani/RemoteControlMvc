<?php 
render('_header',array('title'=>$title,
			'url'		=> $url,
			'rurl'		=> $rurl));?>
<?php
if (HostsManager::IsConnected()) {
	?>
<div id="leftsystem">
   <ul>
      <?php foreach ($responsegroup["result"]["channelgroups"] as $group){?>
      <li onclick="$(this).children()[0].click()"><a
         class="xbmcAction"
         data-method="PVR.GetChannelGroupDetails"
         id='<?= $group["channelgroupid"]?>'
         data-params='{"channelgroupid":<?= $group["channelgroupid"]?>}'
      ><?= $group["label"]?> </a></li>
      <?php }?>
   </ul>
</div>
<div id="rightsystem">
   <table>
      <?php foreach ($response["result"]["channels"] as $channel){?>
      <tr>
         <td><a
            href="#"
            class="xbmcAction"
            data-method="Player.Open"
            data-params='{"item":{"channelid":<?= $channel["channelid"]?>}}'
         >(<?= $channel["channelid"]?>) <b><?= $channel["label"]?> </b>
         </a></td>
      </tr>
      <?php }?>
   </table>
</div>

<?php }?>
<?php render('_footer');
?>