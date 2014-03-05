<?php

/* This controller renders the home page */

class BaseController{
	public  $url;
	public  $rurl;
	public  $isConnected;
	
	function __construct() {
		
		$this->isConnected = HostsManager::IsActiveCnx ( HostsManager::GetLastCnx () );
		
		if ($this->isConnected) {
			$cnx = HostsManager::GetCnx ( HostsManager::GetLastCnx () );
			$XBMC_USER = $cnx->{'user'};
			$XBMC_PASS = $cnx->{'password'};
			$XBMC_IP = $cnx->{'host'};
			$XBMC_PORT = $cnx->{'port'};
	
			if ($XBMC_PASS == "") {
				$this->url = "http://" . $XBMC_IP . ":" . $XBMC_PORT . "/jsonrpc";
				$this->rurl = 'http://' . $XBMC_IP . ':' . $XBMC_PORT . '/';
			} else {
				$this->url = "http://" . $XBMC_USER . ":" . $XBMC_PASS . "@" . $XBMC_IP . ":" . $XBMC_PORT . "/jsonrpc";
				$this->rurl = 'http://' . $XBMC_USER . ':' . $XBMC_PASS . '@' . $XBMC_IP . ':' . $XBMC_PORT . '/';
			}
		}
	}

	
	const refreshPvr = '{"jsonrpc":"2.0","method":"Addons.SetAddonEnabled","params":{"addonid":"pvr.iptvsimple","enabled":true},"id":25}';
	const videoLibraryGetTVShows = '{"jsonrpc": "2.0", "method": "VideoLibrary.GetTVShows", "id": 1, "params":{"properties":["art","genre","plot","title","originaltitle","year","rating","thumbnail","playcount","file","fanart","episode"]}}';
	const videoLibraryGetMovies = '{"jsonrpc": "2.0", "method": "VideoLibrary.GetMovies", "id": 1, "params":{"properties":["art","genre","plot","title","originaltitle","year","rating","thumbnail","playcount","file","fanart"]}}';
	const fileGetDirectory = '{"jsonrpc":"2.0","method":"Files.GetDirectory","id":2,"params":{"directory":"D:\\TV Shows\\30 Rock","properties":["file"]}}'; // directory from above query
	const filesGetFileDetails = '{"jsonrpc": "2.0", "id": 1, "method": "Files.GetFileDetails", "params":{"file":"D:\\TV Shows\\30 Rock\\Season 7\\30.Rock.S07E06.720p.WEB-DL.DD5.1.H.264-POD.mkv","properties":["size","mimetype","file"]}}';
	const playerGetActivePlayers = '{"jsonrpc":"2.0","method":"Player.GetActivePlayers","id":1}';
// 	if (strlen ( $playerGetActivePlayers ) > 35) {
// 		playerGetItem = '{"jsonrpc": "2.0","id": 1, "method": "Player.GetItem","params":{"playerid":' . $playerGetActivePlayers . '}}';
// 		playerPlayPause = '{"jsonrpc":"2.0","method":"Player.PlayPause","params":{"playerid":' . $playerGetActivePlayers . '},"id":1}'; // speed = 0 --> paused, speed = 1 --> playing
// 		playerGetProperties = '{"jsonrpc": "2.0", "method": "Player.GetProperties", "params": { "playerid": ' . $playerGetActivePlayers . ' ,"properties":["type","partymode", "speed", "time", "percentage", "totaltime", "playlistid", "position", "repeat", "shuffled", "canseek", "canchangespeed", "canmove", "canzoom", "canrotate", "canshuffle", "canrepeat", "currentaudiostream", "audiostreams", "subtitleenabled", "currentsubtitle", "subtitles", "live"]}, "id": 1}';
// 	}
	const playerOpen = '{"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"episodeid": 1}}, "id":1}';
	const filePrepareDownload = '{"jsonrpc": "2.0","id":2,"method":"Files.PrepareDownload","params": {"path":"D:\\TV Shows\\30 Rock\\Season 7\\30.Rock.S07E06.720p.WEB-DL.DD5.1.H.264-POD.nfo"}}';
	const fileGetSources = '{"jsonrpc": "2.0","id":2, "method":"Files.GetSources","params":{"media":"video"}}'; // media = audio, media = video
	const inputExecuteAction = '{"jsonrpc":"2.0","method":"Input.ExecuteAction","params":{"action":"back"},"id":1}'; // action list: "left","right","up","down","pageup","pagedown","select","highlight","parentdir","parentfolder","back","previousmenu","info","pause","stop","skipnext","skipprevious","fullscreen","aspectratio","stepforward","stepback","bigstepforward","bigstepback","osd","showsubtitles","nextsubtitle","codecinfo","nextpicture","previouspicture","zoomout","zoomin","playlist","queue","zoomnormal","zoomlevel1","zoomlevel2","zoomlevel3","zoomlevel4","zoomlevel5","zoomlevel6","zoomlevel7","zoomlevel8","zoomlevel9","nextcalibration","resetcalibration","analogmove","rotate","rotateccw","close","subtitledelayminus","subtitledelay","subtitledelayplus","audiodelayminus","audiodelay","audiodelayplus","subtitleshiftup","subtitleshiftdown","subtitlealign","audionextlanguage","verticalshiftup","verticalshiftdown","nextresolution","audiotoggledigital","number0","number1","number2","number3","number4","number5","number6","number7","number8","number9","osdleft","osdright","osdup","osddown","osdselect","osdvalueplus","osdvalueminus","smallstepback","fastforward","rewind","play","playpause","delete","copy","move","mplayerosd","hidesubmenu","screenshot","rename","togglewatched","scanitem","reloadkeymaps","volumeup","volumedown","mute","backspace","scrollup","scrolldown","analogfastforward","analogrewind","moveitemup","moveitemdown","contextmenu","shift","symbols","cursorleft","cursorright","showtime","analogseekforward","analogseekback","showpreset","presetlist","nextpreset","previouspreset","lockpreset","randompreset","increasevisrating","decreasevisrating","showvideomenu","enter","increaserating","decreaserating","togglefullscreen","nextscene","previousscene","nextletter","prevletter","jumpsms2","jumpsms3","jumpsms4","jumpsms5","jumpsms6","jumpsms7","jumpsms8","jumpsms9","filter","filterclear","filtersms2","filtersms3","filtersms4","filtersms5","filtersms6","filtersms7","filtersms8","filtersms9","firstpage","lastpage","guiprofile","red","green","yellow","blue","increasepar","decreasepar","volampup","volampdown","channelup","channeldown","previouschannelgroup","nextchannelgroup","leftclick","rightclick","middleclick","doubleclick","wheelup","wheeldown","mousedrag","mousemove","noop"
	const systemGetPtoperties = '{"jsonrpc":"2.0","id":1,"method":"System.GetProperties","params":{"properties":["canshutdown","cansuspend","canhibernate","canreboot"]}}';
	const guiActivateWindow = '{"jsonrpc":"2.0","id":1, "method":"GUI.ActivateWindow","params":{"window":"home"}}';
	// window list: "home", "programs", "pictures", "filemanager", "files", "settings", "music", "video", "videos", "tv", "pvr", "pvrguideinfo", "pvrrecordinginfo", "pvrtimersetting", "pvrgroupmanager", "pvrchannelmanager", "pvrguidesearch", "pvrchannelscan", "pvrupdateprogress", "pvrosdchannels", "pvrosdguide", "pvrosddirector", "pvrosdcutter", "pvrosdteletext", "systeminfo", "testpattern", "screencalibration", "guicalibration", "picturessettings", "programssettings", "weathersettings", "musicsettings", "systemsettings", "videossettings", "networksettings", "servicesettings", "appearancesettings", "pvrsettings", "tvsettings", "scripts", "videofiles", "videolibrary", "videoplaylist", "loginscreen", "profiles", "skinsettings", "addonbrowser", "yesnodialog", "progressdialog", "virtualkeyboard", "volumebar", "submenu", "favourites", "contextmenu", "infodialog", "numericinput", "gamepadinput", "shutdownmenu", "mutebug", "playercontrols", "seekbar", "musicosd", "addonsettings", "visualisationsettings", "visualisationpresetlist", "osdvideosettings", "osdaudiosettings", "videobookmarks", "filebrowser", "networksetup", "mediasource", "profilesettings", "locksettings", "contentsettings", "songinformation", "smartplaylisteditor", "smartplaylistrule", "busydialog", "pictureinfo", "accesspoints", "fullscreeninfo", "karaokeselector", "karaokelargeselector", "sliderdialog", "addoninformation", "musicplaylist", "musicfiles", "musiclibrary", "musicplaylisteditor", "teletext", "selectdialog", "musicinformation", "okdialog", "movieinformation", "textviewer", "fullscreenvideo", "fullscreenlivetv", "visualisation", "slideshow", "filestackingdialog", "karaoke", "weather", "screensaver", "videoosd", "videomenu", "videotimeseek", "musicoverlay", "videooverlay", "startwindow", "startup", "peripherals", "peripheralsettings", "extendedprogressdialog", "mediafilter"
	const guiGetProperties = '{"jsonrpc":"2.0","id":1,"method":"GUI.GetProperties","params":{"properties":["currentwindow","currentcontrol","skin","fullscreen"]}}';
	const guiSetFullscreen = '{"jsonrpc":"2.0","id": 1,"method":"GUI.SetFullscreen","params":{"fullscreen":"toggle"}}'; // works when playing videos
	const guiShowNotification = '{"jsonrpc": "2.0","id":1,"method":"GUI.ShowNotification","params":{"title":"Message Title","message":"This is a sample message","displaytime":4000}}';
	const inputSendText = '{"jsonrpc":"2.0","id":1,"method":"Input.SendText","params":{"text":"Movies"}}'; // sends text and return command
	const inputShowCodec = '{"jsonrpc":"2.0","id":1,"method":"Input.ShowCodec","params":{}}'; // shows codec overlay
	const xbmcGetInfoLabels = '{"jsonrpc":"2.0","id":1,"method":"XBMC.GetInfoLabels","params":{"labels":["System.TotalSpace"]}}'; // labels can be found here: http://wiki.xbmc.org/index.php?title=InfoLabels
	const videoLibraryExport = '{"jsonrpc":"2.0","id":1,"method":"VideoLibrary.Export","params":{"options":{"path":"C:\\"}}}';
	const livetvChannels = '{"jsonrpc":"2.0","id":1,"method":"PVR.GetChannels","params":{"channelgroupid":"alltv"}}';
	const livetvgroups = '{"jsonrpc":"2.0","id":1,"method":"PVR.GetChannelGroups","params":{"channeltype":"tv"}}';
	const jsonrpcping = '{"jsonrpc":"2.0","method":"JSONRPC.Ping","params":{},"id":1}';

	public function getjsonrpc($data, $url, $timeout = 0) {
		// echo($data);
		// echo($url);
		// if (isset ( $_SESSION ["isConnected"] )) {
		try {
			$curl = curl_init  ($this->url );
			curl_setopt ( $curl, CURLOPT_CONNECTTIMEOUT, $timeout );
			curl_setopt ( $curl, CURLOPT_HEADER, false );
			curl_setopt ( $curl, CURLOPT_RETURNTRANSFER, true );
			curl_setopt ( $curl, CURLOPT_HTTPHEADER, array (
			"Content-type: application/json"
					) );
					curl_setopt ( $curl, CURLOPT_POST, true );
					curl_setopt ( $curl, CURLOPT_POSTFIELDS, $data );
	
					$json_response = curl_exec ( $curl );
	
					$status = curl_getinfo ( $curl, CURLINFO_HTTP_CODE );
	
					if ($status != 200) {
						// die ( "Error: call to URL $url failed with status $status, response $json_response, curl_error " . curl_error ( $curl ) . ", curl_errno " . curl_errno ( $curl ) );
						throw new Exception ( "Error: call to URL $this->$url failed with status $status, response $json_response, curl_error " . curl_error ( $curl ) . ", curl_errno " . curl_errno ( $curl ) );
					}
	
					curl_close ( $curl );
					return $json_response;
		} catch ( Exception $e ) {
			// echo 'Exception reÃ§ue : ', $e->getMessage (), "\n";
			//$_SESSION ["isConnected"] = false;
			// session_destroy ();
			return Null;
		}
		// }
		session_destroy ();
		return Null;
	}
}

?>