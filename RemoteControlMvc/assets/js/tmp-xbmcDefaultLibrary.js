/*
 * Copyright (C) 2005-2012 Team XBMC http://www.xbmc.org
 * 
 * This Program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2, or (at your option)
 * any later version.
 * 
 * This Program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with XBMC; see the file COPYING. If not, see
 * <http://www.gnu.org/licenses/>.
 * 
 */
(function(window) {

	var xbmc = window.xbmc || {};
	xbmc.core = {
		'DEFAULT_ALBUM_COVER' : xremote.context.rurl + 'images/DefaultAlbumCover.png',
		'DEFAULT_VIDEO_COVER' : xremote.context.rurl + 'images/DefaultVideo.png',
		'JSON_RPC' : 'jsonrpc',
		'applyDeviceFixes' : function() {
			window.document.addEventListener('touchmove', function(e) {
				e.preventDefault();
			});
		},
		'displayCommunicationError' : function(m) {
			window.clearTimeout(xbmc.core.commsErrorTiemout);
			var message = m || 'Connection to server lost';
			$('#commsErrorPanel').html(message).show();
			xbmc.core.commsErrorTiemout = window.setTimeout('xbmc.core.hideCommunicationError()', 5000);
		},
		'durationToString' : function(duration) {
			var total_seconds = duration || 0, seconds = total_seconds % 60, minutes = Math.floor(total_seconds / 60) % 60, hours = Math
					.floor(total_seconds / 3600), result = ((hours > 0 && ((hours < 10 ? '0' : '') + hours + ':')) || '');
			result += (minutes < 10 ? '0' : '') + minutes + ':';
			result += (seconds < 10 ? '0' : '') + seconds;
			return result;
		},
		'getCookie' : function(name) {
			var i, match, haystack = window.document.cookie.split(';');
			for (i = 0; i < haystack.length; i += 1) {
				match = haystack[i].match(/^\s*[\S\s]*=([\s\S]*)\s*$/);
				if (match && match.length === 2) {
					return match[1];
				}
			}
			return null;
		},
		'hideCommunicationError' : function() {
			$('#commsErrorPanel').hide();
		},
		'setCookie' : function(name, value, days) {
			var date, expires;
			if (name) {
				if (days) {
					date = new Date();
					date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
					expires = "; expires=" + date.toGMTString();
				} else {
					expires = '';
				}
				window.document.cookie = name + "=" + value + expires + "; path=/";
			}
		},
		'timeToDuration' : function(time) {
			var duration;
			time = time || {};
			duration = ((time.hours || 0) * 3600);
			duration += ((time.minutes || 0) * 60);
			duration += (time.seconds || 0);
			return duration;
		}
	};
	window.xbmc = xbmc;
}(window));

/*
 * Copyright (C) 2005-2011 Team XBMC http://www.xbmc.org
 * 
 * This Program is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation; either version 2, or (at your option) any later version.
 * 
 * This Program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 * 
 * You should have received a copy of the GNU General Public License along with
 * XBMC; see the file COPYING. If not, see <http://www.gnu.org/licenses/>.
 * 
 */

var NowPlayingManager = function(pageJqM) {
	this.init(pageJqM);
	return true;
};

NowPlayingManager.prototype = {
	updateCounter : 0,
	activePlayer : "",
	activePlayerId : -1,
	lastActivePlayerId : -1,
	currentItem : -1,
	playing : false,
	paused : false,
	playlistid : -1,
	ischannel : false,
	activePlaylistItem:null,
	init : function() {
		this.lastActivePlayerId = -1;
		this.getElementById('pbPause').hide(); /*
												 * Assume we are not playing
												 * something
												 */
		this.bindPlaybackControls();
		this.updateState();
		this.getElementById('nextTrack').bind('click', $.proxy(this.showPlaylist, this));
		this.getElementById('nowPlayingPlaylist').bind('click', function() {
			return false;
		});
		$(window).bind('click', $.proxy(this.hidePlaylist, this));
	},
	destroy : function() {
		$(this).off();
	},
	getElementById : function(id) {
		return $("#" + id);
	},
	updateState : function() {
		console.log('updateState');
		$.ajax({
			context : this,
			url : 'inputExecuteAction.php?id=1&method=Player.GetActivePlayers',
			success : function(data) {
				if (data && data.result && data.result.length > 0) {
					if (data.result[0].playerid != this.activePlayerId) {
						this.activePlayerId = data.result[0].playerid;
						this.activePlayer = data.result[0].type;
						if (this.activePlayer == "audio") {
							this.stopVideoPlaylistUpdate();
							this.displayAudioNowPlaying();
						} else if (this.activePlayer == "video") {
							this.stopAudioPlaylistUpdate();
							this.displayVideoNowPlaying();
						} else {
							this.stopVideoPlaylistUpdate();
							this.stopAudioPlaylistUpdate();
							this.activePlayer = "";
							this.activePlayerId = -1;
						}
						this.stopRefreshTime();
						this.updatePlayer();
					}
				} else if (!data || !data.result || data.result.length <= 0) {
					this.stopVideoPlaylistUpdate();
					this.stopAudioPlaylistUpdate();
					this.activePlayer = "";
					this.activePlayerId = -1;
				}
				if (this.activePlayerId >= 0) {
					$(document).trigger('playingMedia');
				} else {
					this.stopRefreshTime();
					$(document).trigger('stoppedMedia');
				}
				setTimeout($.proxy(this.updateState, this), 1000);
			},
			error : function(data, error) {
				xbmc.core.displayCommunicationError();
				setTimeout($.proxy(this.updateState, this), 2000);
			}
		});
	},
	updatePlayer : function() {
		console.log('updatePlayer');
		$.ajax({
			context : this,
			url : 'inputExecuteAction.php?id=1&method=Player.GetProperties&param={"playerid":' + this.activePlayerId
					+ ',"properties":["playlistid","speed","position","totaltime","time"]}',
			success : function(data) {
				if (data && data.result) {
					console.log('data.result.playlistid : ' + data.result.playlistid);
					this.playlistid = data.result.playlistid;
					this.playing = data.result.speed != 0;
					this.paused = data.result.speed == 0;
					this.currentItem = data.result.position;
					this.trackBaseTime = xbmc.core.timeToDuration(data.result.time);
					this.trackDurationTime = xbmc.core.timeToDuration(data.result.totaltime);
					if (!this.autoRefreshAudioData && !this.autoRefreshVideoData && this.playing) {
						if (this.activePlayer == 'audio') {
							this.autoRefreshAudioData = true;
							this.refreshAudioData();
						} else if (this.activePlayer == 'video') {
							this.autoRefreshVideoData = true;
							this.refreshVideoData();
						}
					}
				}
				if ((this.autoRefreshAudioData || this.autoRefreshVideoData) && !this.activeItemTimer) {
					this.activeItemTimer = 1;
					setTimeout($.proxy(this.updateActiveItemDurationLoop, this), 3000);
				}

			}
		});
	},
	bindPlaybackControls : function() {
		$('#pbNext').bind('click', $.proxy(this.nextTrack, this));
		$('#pbPrev').bind('click', $.proxy(this.prevTrack, this));
		$('#pbStop').bind('click', $.proxy(this.stopTrack, this));
		$('#pbPlay').bind('click', $.proxy(this.playPauseTrack, this));
		$('#pbPause').bind('click', $.proxy(this.playPauseTrack, this));
	},
	showPlaylist : function() {
		this.getElementById('nextText').html('Playlist: ');
		this.getElementById('nowPlayingPlaylist').show();
		return false;
	},
	hidePlaylist : function() {
		this.getElementById('nextText').html('Next: ');
		this.getElementById('nowPlayingPlaylist').hide();
		return false;
	},
	nextTrack : function() {
		if (this.activePlayer) {
			$.getJSON('inputExecuteAction.php?id=1&method=Player.GoTo&param={"playerid":' + this.activePlayerId
					+ ',"to":"next"}', function(data) {
			});
		}
	},
	prevTrack : function() {
		if (this.activePlayer) {
			$.getJSON('inputExecuteAction.php?id=1&method=Player.GoTo&param={"playerid":' + this.activePlayerId
					+ ',"to":"previous"}', function(data) {
			});
		}
	},
	stopTrack : function() {
		if (this.activePlayer) {
			$.getJSON('inputExecuteAction.php?id=1&method=Player.Stop&param={"playerid":' + this.activePlayerId + '}',
					function(data) {
					});
		}
	},
	playPauseTrack : function() {
		if (this.activePlayer) {
			var method = ((this.playing || this.paused) ? 'Player.PlayPause' : 'Playlist.Play');
			$.getJSON('inputExecuteAction.php?id=1&method=' + method + '&param={"playerid":' + this.activePlayerId
					+ '}', function(data) {
			});
		}
	},
	showPauseButton : function() {
		this.getElementById('pbPause').show();
		this.getElementById('pbPlay').hide();
	},
	showPlayButton : function() {
		this.getElementById('pbPause').hide();
		this.getElementById('pbPlay').show();
	},
	displayAudioNowPlaying : function() {
		if (!this.autoRefreshAudioPlaylist) {
			this.autoRefreshAudioPlaylist = true;
			this.updateAudioPlaylist();
		}
	},
	displayVideoNowPlaying : function() {
		if (!this.autoRefreshVideoPlaylist) {
			console.log('displayVideoNowPlaying');
			this.autoRefreshVideoPlaylist = true;
			this.updateVideoPlaylist();
		}
	},
	playPlaylistItem : function(sender) {
		var sequenceId = $(sender.currentTarget).attr('seq');
		if (!this.activePlaylistItem
				|| (this.activePlaylistItem !== undefined && sequenceId != this.activePlaylistItem.seq)) {
			$.getJSON('inputExecuteAction.php?id=1&method=Player.GoTo&param={"playerid":' + this.activePlayerId
					+ ',"to":'+sequenceId+'}', function(data) {
			});
		}
		this.hidePlaylist();
	},
	playlistChanged : function(newPlaylist) {
		console.log('playlistChanged');
		if (this.activePlaylist && !newPlaylist || !this.activePlaylist && newPlaylist) {
			return true;
		}
		if (!this.activePlaylist && !newPlaylist) {
			return false;
		}
		if (this.activePlaylist.length != newPlaylist.length) {
			return true;
		}
		for (var i = 0; i < newPlaylist.length; i++) {
			if (!this.comparePlaylistItems(this.activePlaylist[i], newPlaylist[i])) {
				return true;
			}
		}
		return false;
	},
	updateAudioPlaylist : function() {
		$.ajax({
			context : this,
			url : 'inputExecuteAction.php?id=1&method=Playlist.GetItems&param={"playlistid":' + this.playlistid
					+ ',"properties":["title","season","episode","plot","runtime","showtitle","thumbnail"]}',
			success : function(data) {
				
				if (data && data.result && data.result.items && data.result.items.length > 0
						&& data.result.limits.total > 0) {
					if (!this.activePlaylistItem || this.playlistChanged(data.result.items)
							|| (this.activePlaylistItem && (this.activePlaylistItem.seq != this.currentItem))) {
						var ul = $('<ul>');
						var activeItem = 'null';
						$.each($(data.result.items), $.proxy(function(i, item) {
							var li = $('<li>');
							var code = '<span class="duration">' + xbmc.core.durationToString(item.duration)
									+ '</span><div class="trackInfo" title="' + item.title + ' - ' + item.artist
									+ '"><span class="trackTitle">' + item.title
									+ '</span> - <span class="trackArtist">' + item.artist + '</span></div>';
							if (i == this.currentItem) {
								activeItem = item;
								activeItem.seq = i;
								li.addClass('activeItem');
							}
							if (i == (this.currentItem + 1)) {
								this.getElementById('nextTrack').html(code).show();
							}
							li.bind('click', $.proxy(this.playPlaylistItem, this));
							ul.append(li.attr('seq', i).html(code));
						}, this));
						if (data.result.limits.total > 1) {
							if (activeItem && data.result.limits.total - 1 == activeItem.seq) {
								this.getElementById('nextTrack').html(
										'<div class="trackInfo">Last track in playlist</div>').show();
							}
							this.getElementById('nextText').show();
							this.getElementById('nowPlayingPlaylist').html('').append(ul);
						} else {
							this.getElementById('nextText').hide();
							this.getElementById('nowPlayingPlaylist').hide();
							this.getElementById('nextTrack').hide();
						}
						if (!this.comparePlaylistItems(activeItem, this.activePlaylistItem)) {
							this.activePlaylistItem = activeItem;
							if (!this.updateActiveItemDurationRunOnce) {
								this.updateActiveItemDurationRunOnce = true;
								this.updatePlayer();
							}
						} else if (!activeItem) {
							this.stopRefreshTime();
						}
						this.activePlaylist = data.result.items;
						this.getElementById('videoDescription').hide();
						this.getElementById('audioDescription').show();
						this.getElementById('nowPlayingPanel').show();
					}
				} else {
					this.activePlaylist = null;
					this.getElementById('audioDescription').hide();
					this.getElementById('nowPlayingPanel').hide();
				}
				if (this.autoRefreshAudioPlaylist) {
					setTimeout($.proxy(this.updateAudioPlaylist, this), 1000);
				}
			}
		});
	},
	stopAudioPlaylistUpdate : function() {
		this.autoRefreshAudioPlaylist = false;
		this.updateActiveItemDurationRunOnce = false;
	},
	stopVideoPlaylistUpdate : function() {
		this.autoRefreshVideoPlaylist = false;
		this.updateActiveItemDurationRunOnce = false;
	},
	updateActiveItemDurationLoop : function() {
		this.activeItemTimer = 0;
		console.log('updateActiveItemDurationLoop');
		this.updatePlayer();
	},
	refreshAudioDataLoop : function() {
		this.audioRefreshTimer = 0;
		this.refreshAudioData();
	},
	refreshAudioData : function() {
		if (this.autoRefreshAudioData && !this.audioRefreshTimer) {
			this.audioRefreshTimer = 1;
			setTimeout($.proxy(this.refreshAudioDataLoop, this), 1000);
		}
		if (this.playing && !this.paused) {
			this.trackBaseTime++;
		}
		if (this.paused) {
			this.showPlayButton();
		} else if (this.playing) {
			this.showPauseButton();
		}
		if (this.activePlaylistItem) {
			if (this.activePlaylistItem != this.lastPlaylistItem) {
				this.lastPlaylistItem = this.activePlaylistItem;
				this.imgPath = xbmc.core.DEFAULT_ALBUM_COVER;
				if (this.activePlaylistItem.thumbnail) {
					imgPath = rurl + 'image/' + encodeURI(this.activePlaylistItem.thumbnail);
				}
				this.getElementById('audioCoverArt').html(
						'<img src="' + imgPath + '" alt="' + this.activePlaylistItem.album + ' cover art">');
				this.getElementById('audioTrackTitle').html(
						'<span title="' + this.activePlaylistItem.title + '">' + this.activePlaylistItem.title
								+ '</span>');
				if (this.activePlaylistItem.album) {
					this.getElementById('audioAlbumTitle').html(
							'<span title="' + this.activePlaylistItem.album + '">' + this.activePlaylistItem.album
									+ '</span>').show();
				} else {
					this.getElementById('audioAlbumTitle').hide();
				}
				this.getElementById('audioArtistTitle').html(this.activePlaylistItem.artist);
				this.getElementById('progressBar').attr('style', '');
			}
			this.getElementById('audioDuration').html(
					xbmc.core.durationToString(this.trackBaseTime) + ' / '
							+ xbmc.core.durationToString(this.trackDurationTime));
			var buttonWidth = this.getElementById('progressBar .progressIndicator').width();
			var progressBarWidth = (this.trackBaseTime / this.trackDurationTime) * 100;
			var progressSliderPosition = Math.ceil((this.getElementById('progressBar').width() / 100)
					* progressBarWidth)
					- buttonWidth;
			if (progressSliderPosition < 0) {
				progressSliderPosition = 0;
			}
			if (progressBarWidth <= 100) {
				this.getElementById('progressBar .elapsedTime').width(progressBarWidth + '%');
				this.getElementById('progressBar .progressIndicator').css('left', progressSliderPosition);
			}
		}

	},
	refreshVideoDataLoop : function() {
		this.videoRefreshTimer = 0;
		this.refreshVideoData();
	},
	refreshVideoData : function() {
		console.log('refreshVideoData : ' + this.playlistid);
		if (this.autoRefreshVideoData && !this.videoRefreshTimer) {
			this.videoRefreshTimer = 1;
			setTimeout($.proxy(this.refreshVideoDataLoop, this), 1500);
		}
		if (this.playing && !this.paused) {
			this.trackBaseTime++;
		}
		if (this.paused) {
			this.showPlayButton();
		} else if (this.playing) {
			this.showPauseButton();
		}
		console.log('activePlaylistItem : ' + this.activePlaylistItem);
		if (this.activePlaylistItem) {
			if (this.activePlaylistItem != this.lastPlaylistItem) {
				this.lastPlaylistItem = this.activePlaylistItem;
				var imgPath = xbmc.core.DEFAULT_VIDEO_COVER;
				if (this.activePlaylistItem.thumbnail) {
					imgPath = 'image/' + encodeURI(this.activePlaylistItem.thumbnail);
				}
				$('#videoCoverArt').html(
						'<img src="' + imgPath + '" alt="' + this.activePlaylistItem.title + ' cover art">');
				$('#videoShowTitle').html(this.activePlaylistItem.showtitle || '&nbsp;');
				var extra = '';
				if (this.activePlaylistItem.season >= 0 && this.activePlaylistItem.episode >= 0) {
					extra = this.activePlaylistItem.season + 'x' + this.activePlaylistItem.episode + ' ';
				}
				$('#videoTitle').html(extra + this.activePlaylistItem.title);
			}
			$('#videoDuration').html(
					xbmc.core.durationToString(this.trackBaseTime) + ' / '
							+ xbmc.core.durationToString(this.trackDurationTime));
			var buttonWidth = $('#progressBar .progressIndicator').width();
			var progressBarWidth = (this.trackBaseTime / this.trackDurationTime) * 100;
			var progressSliderPosition = Math.ceil(($('#progressBar').width() / 100) * progressBarWidth) - buttonWidth;
			if (progressSliderPosition < 0) {
				progressSliderPosition = 0;
			}
			if (progressBarWidth <= 100) {
				$('#progressBar .elapsedTime').width(progressBarWidth + '%');
				$('#progressBar .progressIndicator').css('left', progressSliderPosition);
			}
		}
	},
	stopRefreshTime : function() {
		this.autoRefreshAudioData = false;
		this.autoRefreshVideoData = false;
	},
	comparePlaylistItems : function(item1, item2) {
		if (!item1 || !item2) {
			if (!item1 && !item2) {
				return true;
			}
			return false;
		}
		if (item1.title != item2.title) {
			return false;
		}
		if (item1.album != item2.album) {
			return false;
		}
		if (item1.artist != item2.artist) {
			return false;
		}
		if (item1.duration != item2.duration) {
			return false;
		}
		if (item1.label != item2.label) {
			return false;
		}
		if (item1.season != item2.season) {
			return false;
		}
		if (item1.episode != item2.episode) {
			return false;
		}
		return true;
	},
	updateVideoPlaylist : function() {
		console.log('updateVideoPlaylist : ' + this.playlistid);
		$.ajax({
					context : this,
					url : 'inputExecuteAction.php?id=1&method=Playlist.GetItems&param={"playlistid":' + 2
							+ ',"properties":["title","season","episode","plot","runtime","showtitle","thumbnail"]}',
					succuss : function(data) {
						console.log('updateVideoPlaylist success');
						if (data && data.result && data.result.items && data.result.items.length > 0
								&& data.result.limits.total > 0) {
							console.log('ddddddddddddddddddddddddddddddddddddddd');
							if (this.playlistChanged(data.result.items)) {
								var ul = $('<ul>');
								var activeItem;
								$.each($(data.result.items), $.proxy(function(i, item) {
									var li = $('<li>');
									var extra = '';
									if (item.season >= 0 && item.episode >= 0) {
										extra = item.season + 'x' + item.episode + ' ';
									}
									var code = '<span class="duration">' + xbmc.core.durationToString(item.runtime)
											+ '</span><div class="trackInfo" title="' + extra + item.title
											+ '"><span class="trackTitle">' + extra + item.title + '</span></div>';
									if (i == this.currentItem) {
										activeItem = item;
										activeItem.seq = i;
										li.addClass('activeItem');
									}
									if (i == (this.currentItem + 1)) {
										$('#nextTrack').html(code).show();
									}
									li.bind('click', $.proxy(this.playPlaylistItem, this));
									ul.append(li.attr('seq', i).html(code));
								}, this));
								if (data.result.limits.total > 1) {
									$('#nextText').show();
									if (activeItem && data.result.limits.total == activeItem.seq) {
										$('#nextTrack').html('<div class="trackInfo">Last track in playlist</div>')
												.show();
									}
									$('#nowPlayingPlaylist').html('').append(ul);
								} else {
									$('#nextText').hide();
									$('#nowPlayingPlaylist').hide();
									$('#nextTrack').hide();
								}
								if (!this.comparePlaylistItems(activeItem, this.activePlaylistItem)) {
									this.activePlaylistItem = activeItem;
									if (!this.updateActiveItemDurationRunOnce) {
										this.updateActiveItemDurationRunOnce = true;
										this.updatePlayer();
									}
								} else if (!activeItem) {
									this.stopRefreshTime();
								}
								this.activePlaylist = data.result.items;
								$('#videoDescription').show();
								$('#audioDescription').hide();
								$('#nowPlayingPanel').show();
							}
						} else {
							$
									.ajax({
										context : this,
										url : 'inputExecuteAction.php?id=1&method=Player.GetItem&param={"playerid":'
												+ this.activePlayerId
												+ ',"properties":["title","season","episode","plot","runtime","showtitle","thumbnail","channeltype","channelnumber"]}',
										succuss : function(data) {
											console.log('im here!!');
											if (data && data.result && data.result.item) {
												
												this.activePlaylistItem = data.result.item;
												if (!this.updateActiveItemDurationRunOnce) {
													this.updateActiveItemDurationRunOnce = true;
													this.updatePlayer();
												}
												$('#nextText').hide();
												$('#nowPlayingPlaylist').hide();
												$('#nextTrack').hide();
												$('#videoDescription').show();
												$('#audioDescription').hide();
												$('#nowPlayingPanel').show();
											} else {
												this.activePlaylist = null;
												$('#videoDescription').hide();
												$('#nowPlayingPanel').hide();
											}
										},
										error : function(data) {
											console.log('im here error!!');
											xbmc.core.displayCommunicationError();
											if (this.autoRefreshVideoPlaylist) {
												setTimeout($.proxy(this.updateVideoPlaylist, this), 2000);
											}
										}
									});
						}
						if (this.autoRefreshVideoPlaylist) {
							setTimeout($.proxy(this.updateVideoPlaylist, this), 1000);
						}
					},
					error:function(data,error)
					{
						if (this.autoRefreshVideoPlaylist) {
							setTimeout($.proxy(this.updateVideoPlaylist, this), 1000);
						}
						console.log('Erroooooooooooooor');
						xbmc.core.displayCommunicationError();
					}
				});
	}
};
/*-------------------------------------------------------------URLS Utils
 http://wiki.xbmc.org/index.php?title=Window_IDs
 --------------------------------------------------------------*/
var IntervalRefresh = 1000;
var currentWindow = 1000; // Home
var currentControl = 1000;
// View changed at XBMC
var viewChangedEvent = $.Event("viewChanged");
var notConnectedEvent = $.Event("connectionLoosed");
var GetBackConnectedEvent = $.Event("GetBackConnectedEvent");
var isExectingPingCmd = false;
//setInterval(function() {
//	if (!isExectingPingCmd) {
//		isExectingPingCmd = true;
//		$.getJSON('inputExecuteAction.php?method=JSONRPC.Ping').done(function(data) {
//			isExectingPingCmd = false;
//			var obj = $.parseJSON(JSON.stringify(data));
//			// console.log(obj);
//			if (obj.error) {
//				$('body').trigger(notConnectedEvent);
//			} else if (obj.result != 'pong') {
//				$('body').trigger(notConnectedEvent);
//			} else {
//				$('body').trigger(GetBackConnectedEvent);
//			}
//
//		}).fail(function(data) {
//			isExectingPingCmd = false;
//			$('body').trigger(notConnectedEvent);
//			isNotConnected = true;
//		});
//	}
//}, 2000);

var cid = "";
$("body").on('click', '.playeraction', function() {
	cid = $(this);
	$.getJSON('inputExecuteAction.php?id=1&action=' + cid.attr("id")).done(function(data) {
		// console.log("success " + cid.attr("id"));
	}).fail(function() {
		console.log("error");
	});
}).on('click', '.xbmcSimpleAction', function() {
	$.getJSON('inputExecuteAction.php?id=1&action=' + $(this).attr('data-action')).done(function(data) {
		var obj = $.parseJSON(JSON.stringify(data));
		if (obj.error)
			console.log(obj.error.message);
	}).fail(function(data) {
		var obj = $.parseJSON(JSON.stringify(data.responseText.replace('$daurl', '')));
		console.log(obj.error);
	});

}).on(
		'click',
		'.xbmcAction',
		function() {
			var listchnls = $('#rightsystem ul');
			$.getJSON(
					'inputExecuteAction.php?id=1&method=' + $(this).attr('data-method') + "&param="
							+ $(this).attr('data-params')).done(
					function(data) {
						var obj = $.parseJSON(JSON.stringify(data));
						if (obj.error)
							console.log(obj.error.message);
						else if (obj.result.channelgroupdetails) {
							var html = "";
							var oldclassLi = listchnls.find('a').attr("class");
							$.each(obj.result.channelgroupdetails.channels, function(i, item) {
								html += "<li><a href=\"#\" class=\"" + oldclassLi
										+ "\" data-method=\"Player.Open\" data-params='{\"item\":{\"channelid\":"
										+ item.channelid + "}}'>(" + item.channelid + ") " + item.label + "</a></li>";
							});

							listchnls.html(html);
							$('li.selected').removeClass('selected');
							$('#' + obj.result.channelgroupdetails.channelgroupid).parent('li').addClass('selected');
						}
					}).fail(function(data) {
				var obj = $.parseJSON(JSON.stringify(data.responseText.replace('$daurl', '')));

				console.log('fail!!!!! the error is : ' + obj.error);
			});

		}).on(
		'click',
		'.nestedList',
		function() {
			var nestedlist = $(this).find('ul#nestedLevel1');
			$.getJSON(
					'inputExecuteAction.php?id=1&method=' + $(this).attr('data-method') + "&param="
							+ $(this).attr('data-params')).done(function(data) {
				var obj = $.parseJSON(JSON.stringify(data));
				if (obj.error)
					console.log(obj.error.message);
				else if (obj.result.seasons) {
					var html = "";

					$.each(obj.result.seasons, function(i, item) {
						html += "<li><a href=\"#\">" + item.label + "</a></li>";
					});
					nestedlist.html(html).trigger('create');
				}

			}).fail(function(data) {
				var obj = $.parseJSON(JSON.stringify(data.responseText.replace('$daurl', '')));

				console.log('fail!!!!! the error is : ' + obj.error);
			});

		});
// var mediaLibrary = new MediaLibrary(),
// nowPlayingManager = new NowPlayingManager();
// this = nowPlayingManager;
// xbmc.core.applyDeviceFixes();

