<?php 
render('_header',array('title'=>$title,
			'url'		=> $url,
			'rurl'		=> $rurl));?>
<?php
// if (session_id () == '')
// 	session_start ();
//require_once 'includes/config.php';
if (HostsManager::IsConnected()) {
// 	$livetvChannels = '{"jsonrpc":"2.0","id":1,"method":"PVR.GetChannels","params":{"channelgroupid":"alltv"}}';
// 	$livetvgroups = '{"jsonrpc":"2.0","id":1,"method":"PVR.GetChannelGroups","params":{"channeltype":"tv"}}';
// 	$rawresponse = getjsonrpc ( $livetvChannels, $url );
// 	$response = json_decode ( $rawresponse, true );
// 	$responsegroup = json_decode ( getjsonrpc ( $livetvgroups, $url ), true );
	//echo '<script> var response = \'' . str_replace ( "'", "\\'", $rawresponse ) . '\'; rurl ="' . $rurl . '"; totalv=' . count ( $response ["result"] ["channels"] ) . ';</script>';

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