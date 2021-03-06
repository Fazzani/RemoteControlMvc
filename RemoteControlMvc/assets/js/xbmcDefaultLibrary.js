

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
					var total_seconds = duration || 0, seconds = total_seconds % 60, minutes = Math
							.floor(total_seconds / 60) % 60, hours = Math.floor(total_seconds / 3600), result = ((hours > 0 && ((hours < 10 ? '0'
							: '')
							+ hours + ':')) || '');
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

		var that = null;
		var NowPlayingManager = function() {
			this.init();
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
			init : function() {
				that = this;
				this.lastActivePlayerId = -1;
				this.getElementById('pbPause').hide(); /* Assume we are not playing something */
				that.bindPlaybackControls();
				that.updateState();
				this.getElementById('nextTrack').bind('click', $.proxy(that.showPlaylist, that));
				this.getElementById('nowPlayingPlaylist').bind('click', function(){
				    return false;
				});
				$(window).bind('click', $.proxy(that.hidePlaylist, that));
			},
			destroy : function(){
				$(that).off();
			},
			getElementById : function(id){
				return $("#"+id);
			},
			updateState : function() {
				$.getJSON('inputExecuteAction.php?id=1&method=Player.GetActivePlayers', function(data) {
					if (data && data.result && data.result.length > 0) {
						if (data.result[0].playerid != this.activePlayerId) {
							that.activePlayerId = data.result[0].playerid;
							that.activePlayer = data.result[0].type;
							if (that.activePlayer == "audio") {
								that.stopVideoPlaylistUpdate();
								that.displayAudioNowPlaying();
							} else if (that.activePlayer == "video") {
								that.stopAudioPlaylistUpdate();
								that.displayVideoNowPlaying();
							} else {
								that.stopVideoPlaylistUpdate();
								that.stopAudioPlaylistUpdate();
								that.activePlayer = "";
								that.activePlayerId = -1;
							}
							that.stopRefreshTime();
							that.updatePlayer();
						}
					} else if (!data || !data.result || data.result.length <= 0) {
						that.stopVideoPlaylistUpdate();
						that.stopAudioPlaylistUpdate();
						that.activePlayer = "";
						that.activePlayerId = -1;

					}
					if (that.activePlayerId >= 0 && that.lastActivePlayerId != that.activePlayerId) {
						//console.log('trigger playingMedia');
						that.lastActivePlayerId = that.activePlayerId;
						$(document).trigger('playingMedia');
					} else {
						if (that.lastActivePlayerId != that.activePlayerId) {
							//console.log('trigger stoppedMedia');
							that.lastActivePlayerId = that.activePlayerId;
							that.stopRefreshTime();
							$(document).trigger('stoppedMedia');
						}
					}
					setTimeout($.proxy(that.updateState, that), 1000);

				});
			},
			updatePlayer : function() {
				// console.log('updatePlayer');
				$.getJSON('inputExecuteAction.php?id=1&method=Player.GetProperties&param={"playerid":'
						+ that.activePlayerId + ',"properties":["playlistid","speed","position","totaltime","time"]}',
						function(data) {
							if (data && data.result) {
								that.playlistid = data.result.playlistid;
								that.playing = data.result.speed != 0;
								that.paused = data.result.speed == 0;
								that.currentItem = data.result.position;
								that.trackBaseTime = xbmc.core.timeToDuration(data.result.time);
								that.trackDurationTime = xbmc.core.timeToDuration(data.result.totaltime);
								if (!that.autoRefreshAudioData && !that.autoRefreshVideoData && that.playing) {
									if (that.activePlayer == 'audio') {
										that.autoRefreshAudioData = true;
										that.refreshAudioData();
									} else if (that.activePlayer == 'video') {
										that.autoRefreshVideoData = true;
										that.refreshVideoData();
									}
								}
							}
							if ((that.autoRefreshAudioData || that.autoRefreshVideoData) && !that.activeItemTimer) {
								that.activeItemTimer = 1;
								// setTimeout(jQuery.proxy(that.updateActiveItemDurationLoop,
								// that), 1000);
							}

						});
			},
			bindPlaybackControls : function() {
				that.getElementById('pbNext').bind('click', $.proxy(that.nextTrack, that));
				that.getElementById('pbPrev').bind('click', $.proxy(that.prevTrack, that));
				that.getElementById('pbStop').bind('click', $.proxy(that.stopTrack, that));
				that.getElementById('pbPlay').bind('click', $.proxy(that.playPauseTrack, that));
				that.getElementById('pbPause').bind('click', $.proxy(that.playPauseTrack, that));
			},
			showPlaylist : function() {
				that.getElementById('nextText').html('Playlist: ');
				that.getElementById('nowPlayingPlaylist').show();
				return false;
			},
			hidePlaylist : function() {
				that.getElementById('nextText').html('Next: ');
				that.getElementById('nowPlayingPlaylist').hide();
				return false;
			},
			nextTrack : function() {
				if (that.activePlayer) {
					$.getJSON('inputExecuteAction.php?id=1&method=Player.GoTo&param={"playerid":' + that.activePlayerId
							+ ',"to":"next"}', function(data) {
					});
				}
			},
			prevTrack : function() {
				if (that.activePlayer) {
					$.getJSON('inputExecuteAction.php?id=1&method=Player.GoTo&param={"playerid":' + that.activePlayerId
							+ ',"to":"previous"}', function(data) {
					});
				}
			},
			stopTrack : function() {
				if (that.activePlayer) {
					$.getJSON('inputExecuteAction.php?id=1&method=Player.Stop&param={"playerid":' + that.activePlayerId
							+ '}', function(data) {
					});
				}
			},
			playPauseTrack : function() {
				if (that.activePlayer) {
					var method = ((that.playing || that.paused) ? 'Player.PlayPause' : 'Playlist.Play');
					$.getJSON('inputExecuteAction.php?id=1&method=' + method + '&param={"playerid":'
							+ that.activePlayerId + '}', function(data) {
					});
				}
			},
			showPauseButton : function() {
				that.getElementById('pbPause').show();
				that.getElementById('pbPlay').hide();
			},
			showPlayButton : function() {
				that.getElementById('pbPause').hide();
				that.getElementById('pbPlay').show();
			},
			displayAudioNowPlaying : function() {
				if (!that.autoRefreshAudioPlaylist) {
					that.autoRefreshAudioPlaylist = true;
					that.updateAudioPlaylist();
				}
			},
			displayVideoNowPlaying : function() {
				if (!that.autoRefreshVideoPlaoylist) {
					that.autoRefreshVideoPlaylist = true;
					that.updateVideoPlaylist();
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
				if (that.activePlaylist && !newPlaylist || !that.activePlaylist && newPlaylist) {
					return true;
				}
				if (!that.activePlaylist && !newPlaylist) {
					return false;
				}
				if (that.activePlaylist.length != newPlaylist.length) {
					return true;
				}
				for (var i = 0; i < newPlaylist.length; i++) {
					if (!this.comparePlaylistItems(that.activePlaylist[i], newPlaylist[i])) {
						return true;
					}
				}
				return false;
			},
			updateAudioPlaylist : function() {
				$.getJSON('inputExecuteAction.php?id=1&method=Playlist.GetItems&param={"playlistid":'
					+ that.playlistid
					+ ',"properties":["title","season","episode","plot","runtime","showtitle","thumbnail"]}',
						function(data) {
							if (data && data.result && data.result.items && data.result.items.length > 0
								&& data.result.limits.total > 0) {
							    if (!that.activePlaylistItem
											|| that.playlistChanged(data.result.items)
											|| (that.activePlaylistItem && (that.activePlaylistItem.seq != that.currentItem))) {
											var ul = $('<ul>');
											var activeItem;
											$.each($(data.result.items), jQuery.proxy(function(i, item) {
												var li = $('<li>');
												var code = '<span class="duration">'
														+ xbmc.core.durationToString(item.duration)
														+ '</span><div class="trackInfo" title="' + item.title + ' - '
														+ item.artist + '"><span class="trackTitle">' + item.title
														+ '</span> - <span class="trackArtist">' + item.artist
														+ '</span></div>';
												if (i == that.currentItem) {
													activeItem = item;
													activeItem.seq = i;
													li.addClass('activeItem');
												}
												if (i == (that.currentItem + 1)) {
													that.getElementById('nextTrack').html(code).show();
												}
												li.bind('click', jQuery.proxy(that.playPlaylistItem, that));
												ul.append(li.attr('seq', i).html(code));
											}, that));
											if (data.result.limits.total > 1) {
												if (activeItem && data.result.limits.total - 1 == activeItem.seq) {
													that.getElementById('nextTrack').html(
															'<div class="trackInfo">Last track in playlist</div>')
															.show();
												}
												that.getElementById('nextText').show();
												that.getElementById('nowPlayingPlaylist').html('').append(ul);
											} else {
												that.getElementById('nextText').hide();
												that.getElementById('nowPlayingPlaylist').hide();
												that.getElementById('nextTrack').hide();
											}
											if (!that.comparePlaylistItems(activeItem, that.activePlaylistItem)) {
												that.activePlaylistItem = activeItem;
												if (!that.updateActiveItemDurationRunOnce) {
													that.updateActiveItemDurationRunOnce = true;
													that.updatePlayer();
												}
											} else if (!activeItem) {
												that.stopRefreshTime();
											}
											that.activePlaylist = data.result.items;
											that.getElementById('videoDescription').hide();
											that.getElementById('audioDescription').show();
											that.getElementById('nowPlayingPanel').show();
										}
									} else {
										that.activePlaylist = null;
										that.getElementById('audioDescription').hide();
										that.getElementById('nowPlayingPanel').hide();
									}
									if (that.autoRefreshAudioPlaylist) {
									    that.timeoutId.push(setTimeout(jQuery.proxy(that.updateAudioPlaylist, that), 1000));
									}
								});
			},
			stopAudioPlaylistUpdate : function() {
				that.autoRefreshAudioPlaylist = false;
				that.updateActiveItemDurationRunOnce = false;
			},
			stopVideoPlaylistUpdate : function() {
				that.autoRefreshVideoPlaylist = false;
				that.updateActiveItemDurationRunOnce = false;
			},
			updateActiveItemDurationLoop : function() {
				that.activeItemTimer = 0;
				// console.log('updatePlayer');
				that.updatePlayer();
			},
			refreshAudioDataLoop : function() {
				that.audioRefreshTimer = 0;
				that.refreshAudioData();
			},
			refreshAudioData : function() {
//				if (that.autoRefreshAudioData && !that.audioRefreshTimer) {
//					that.audioRefreshTimer = 1;
//					that.timeoutId.push(setTimeout(jQuery.proxy(that.refreshAudioDataLoop, that), 1000));
//				}
				if (that.playing && !that.paused) {
					that.trackBaseTime++;
				}
				if (that.paused) {
					that.showPlayButton();
				} else if (that.playing) {
					that.showPauseButton();
				}
				if (that.activePlaylistItem) {
					if (that.activePlaylistItem != that.lastPlaylistItem) {
						that.lastPlaylistItem = that.activePlaylistItem;
						var imgPath = xbmc.core.DEFAULT_ALBUM_COVER;
						if (that.activePlaylistItem.thumbnail) {
							imgPath = rurl + 'image/' + encodeURI(that.activePlaylistItem.thumbnail);
						}
						that.getElementById('audioCoverArt').html(
								'<img src="' + imgPath + '" alt="' + that.activePlaylistItem.album + ' cover art">');
						that.getElementById('audioTrackTitle').html(
								'<span title="' + that.activePlaylistItem.title + '">' + that.activePlaylistItem.title
										+ '</span>');
						if (that.activePlaylistItem.album) {
							that.getElementById('audioAlbumTitle').html(
									'<span title="' + that.activePlaylistItem.album + '">'
											+ that.activePlaylistItem.album + '</span>').show();
						} else {
							that.getElementById('audioAlbumTitle').hide();
						}
						that.getElementById('audioArtistTitle').html(that.activePlaylistItem.artist);
						that.getElementById('progressBar').attr('style', '');
					}
					that.getElementById('audioDuration').html(
							xbmc.core.durationToString(that.trackBaseTime) + ' / '
									+ xbmc.core.durationToString(that.trackDurationTime));
					var buttonWidth = that.getElementById('progressBar .progressIndicator').width();
					var progressBarWidth = (that.trackBaseTime / that.trackDurationTime) * 100;
					var progressSliderPosition = Math.ceil((that.getElementById('progressBar').width() / 100) * progressBarWidth)
							- buttonWidth;
					if (progressSliderPosition < 0) {
						progressSliderPosition = 0;
					}
					if (progressBarWidth <= 100) {
						that.getElementById('progressBar .elapsedTime').width(progressBarWidth + '%');
						that.getElementById('progressBar .progressIndicator').css('left', progressSliderPosition);
					}
				}
			},
			refreshVideoDataLoop : function() {
				that.videoRefreshTimer = 0;
				that.refreshVideoData();
			},
			refreshVideoData : function() {
//				if (that.autoRefreshVideoData && !that.videoRefreshTimer) {
//					that.videoRefreshTimer = 1;
//					that.timeoutId.push(setTimeout(jQuery.proxy(that.refreshVideoDataLoop, that), 5000));
//				}
				if (that.playing && !that.paused) {
					that.trackBaseTime++;
				}
				if (that.paused) {
					that.showPlayButton();
				} else if (that.playing) {
					that.showPauseButton();
				}
				if (that.activePlaylistItem) {
					if (JSON.stringify(that.activePlaylistItem) != JSON.stringify(that.lastPlaylistItem)) {
						that.ischannel = that.activePlaylistItem.type == 'channel';
						that.lastPlaylistItem = that.activePlaylistItem;
						var imgPath = xbmc.core.DEFAULT_VIDEO_COVER;
						if (that.activePlaylistItem.thumbnail) {
							if (that.ischannel)
								imgPath = 'assets/img/tv.png';
							else
								imgPath = xremote.context.rurl + 'image/' + encodeURI(that.activePlaylistItem.thumbnail);
						}
						that.getElementById('videoCoverArt').html(
								'<img src="' + imgPath + '" alt="' + that.activePlaylistItem.title + ' cover art">');
						that.getElementById('videoShowTitle').html(that.activePlaylistItem.showtitle || '&nbsp;');
						var extra = '';
						if (that.activePlaylistItem.season >= 0 && that.activePlaylistItem.episode >= 0) {
							extra = that.activePlaylistItem.season + 'x' + that.activePlaylistItem.episode + ' ';
						}
						if (that.ischannel)
							$that.getElementById('videoTitle').html(
									extra + '<span class="channelnumber">' + that.activePlaylistItem.channelnumber
											+ '- </span>' + that.activePlaylistItem.label);
						else
							that.getElementById('videoTitle').html(extra + that.activePlaylistItem.title);
					}
					if (!that.ischannel) {
						that.getElementById('videoDuration').html(
								xbmc.core.durationToString(that.trackBaseTime) + ' / '
										+ xbmc.core.durationToString(that.trackDurationTime));
						var buttonWidth = that.getElementById('progressBar .progressIndicator').width();
						var progressBarWidth = (that.trackBaseTime / that.trackDurationTime) * 100;
						var progressSliderPosition = Math.ceil((that.getElementById('progressBar').width() / 100) * progressBarWidth)
								- buttonWidth;
						if (progressSliderPosition < 0) {
							progressSliderPosition = 0;
						}
						if (progressBarWidth <= 100) {
							that.getElementById('progressBar .elapsedTime').width(progressBarWidth + '%');
							that.getElementById('progressBar .progressIndicator').css('left', progressSliderPosition);
						}
					}
				}
			},
			stopRefreshTime : function() {
				that.autoRefreshAudioData = false;
				that.autoRefreshVideoData = false;
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
				// console.log('updateVideoPlaylist');
				$.getJSON('inputExecuteAction.php?id=1&method=Playlist.GetItems&param={"playlistid":2'
										+ ''
										+ ',"properties":["title","season","episode","plot","runtime","showtitle","thumbnail"]}',
								function(data) {
									if (data && data.result && data.result.items && data.result.items.length > 0
											&& data.result.limits.total > 0) {
										if (that.playlistChanged(data.result.items)) {
											var ul = $('<ul>');
											var activeItem;
											$.each($(data.result.items), jQuery.proxy(function(i, item) {
												var li = $('<li>');
												var extra = '';
												if (item.season >= 0 && item.episode >= 0) {
													extra = item.season + 'x' + item.episode + ' ';
												}
												var code = '<span class="duration">'
														+ xbmc.core.durationToString(item.runtime)
														+ '</span><div class="trackInfo" title="' + extra + item.title
														+ '"><span class="trackTitle">' + extra + item.title
														+ '</span></div>';
												if (i == that.currentItem) {
													activeItem = item;
													activeItem.seq = i;
													li.addClass('activeItem');
												}
												if (i == (that.currentItem + 1)) {
													that.getElementById('nextTrack').html(code).show();
												}
												li.bind('click', jQuery.proxy(that.playPlaylistItem, that));
												ul.append(li.attr('seq', i).html(code));
											}, that));
											if (data.result.limits.total > 1) {
												this.getElementById('nextText').show();
												if (activeItem && data.result.limits.total == activeItem.seq) {
													this.getElementById('nextTrack').html(
															'<div class="trackInfo">Last track in playlist</div>')
															.show();
												}
												that.getElementById('nowPlayingPlaylist').html('').append(ul);
											} else {
												that.getElementById('nextText').hide();
												that.getElementById('nowPlayingPlaylist').hide();
												that.getElementById('nextTrack').hide();
											}
											if (!that.comparePlaylistItems(activeItem, that.activePlaylistItem)) {
												that.activePlaylistItem = activeItem;
												if (!that.updateActiveItemDurationRunOnce) {
													that.updateActiveItemDurationRunOnce = true;
													that.updatePlayer();
												}
											} else if (!activeItem) {
												that.stopRefreshTime();
											}
											that.activePlaylist = data.result.items;
											that.getElementById('videoDescription').show();
											that.getElementById('audioDescription').hide();
											that.getElementById('nowPlayingPanel').show();
										}
									} else {
										$.getJSON('inputExecuteAction.php?id=1&method=Player.GetItem&param={"playerid":'
																+ that.activePlayerId
																+ ',"properties":["title","season","episode","plot","runtime","showtitle","thumbnail","channeltype","channelnumber"]}',
														function(data) {

															if (data && data.result && data.result.item) {
																that.activePlaylistItem = data.result.item;
																if (!that.updateActiveItemDurationRunOnce) {
																	that.updateActiveItemDurationRunOnce = true;
																	that.updatePlayer();
																}
																that.getElementById('nextText').hide();
																that.getElementById('nowPlayingPlaylist').hide();
																that.getElementById('nextTrack').hide();
																that.getElementById('videoDescription').show();
																that.getElementById('audioDescription').hide();
																that.getElementById('nowPlayingPanel').show();
															} else {
																that.activePlaylist = null;
																that.getElementById('videoDescription').hide();
																that.getElementById('nowPlayingPanel').hide();
															}

														});
									}
									if (that.autoRefreshVideoPlaylist) {
										// setTimeout(jQuery.proxy(that.updateVideoPlaylist,
										// that), 1000);
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
		var viewChangedEvent = jQuery.Event("viewChanged");
		var notConnectedEvent = jQuery.Event("connectionLoosed");
		var GetBackConnectedEvent = jQuery.Event("GetBackConnectedEvent");
		var isExectingPingCmd = false;
		setInterval(function() {
			if (!isExectingPingCmd) {
				isExectingPingCmd = true;
				$.getJSON('inputExecuteAction.php?method=JSONRPC.Ping').done(function(data) {
					isExectingPingCmd = false;
					var obj = $.parseJSON(JSON.stringify(data));
					// console.log(obj);
					if (obj.error) {
						$('body').trigger(notConnectedEvent);
					} else if (obj.result != 'pong') {
						$('body').trigger(notConnectedEvent);
					} else {
						$('body').trigger(GetBackConnectedEvent);
					}

				}).fail(function(data) {
					isExectingPingCmd = false;
					$('body').trigger(notConnectedEvent);
					isNotConnected = true;
				});
			}
		}, 2000);

		var cid = "";
		$("body").on('click', '.playeraction', function() {
					cid = $(this);
					$.getJSON('inputExecuteAction.php?id=1&action=' + cid.attr("id")).done(function(data) {
						// console.log("success " + cid.attr("id"));
					}).fail(function() {
						console.log("error");
					});
				})
				.on('click', '.xbmcSimpleAction', function() {
					$.getJSON('inputExecuteAction.php?id=1&action=' + $(this).attr('data-action')).done(function(data) {
						var obj = $.parseJSON(JSON.stringify(data));
						if (obj.error)
							console.log(obj.error.message);
					}).fail(function(data) {
						var obj = $.parseJSON(JSON.stringify(data.responseText.replace('$daurl', '')));
						console.log(obj.error);
					});
				})
				.on('click','.xbmcAction',function() {
							var listchnls = $('#rightsystem ul');
							$.getJSON('inputExecuteAction.php?id=1&method=' + $(this).attr('data-method')
													+ "&param=" + $(this).attr('data-params')).done(
											function(data) {
												var obj = $.parseJSON(JSON.stringify(data));
												if (obj.error)
													console.log(obj.error.message);
												else if (obj.result.channelgroupdetails) {
													var html = "";
													var oldclassLi = listchnls.find('a').attr("class");
													$.each(obj.result.channelgroupdetails.channels,
																	function(i, item) {
																		html += "<li><a href=\"#\" class=\""
																				+ oldclassLi
																				+ "\" data-method=\"Player.Open\" data-params='{\"item\":{\"channelid\":"
																				+ item.channelid + "}}'>("
																				+ item.channelid + ") " + item.label
																				+ "</a></li>";
																	});

													listchnls.html(html);
													$('li.selected').removeClass('selected');
													$('#' + obj.result.channelgroupdetails.channelgroupid).parent('li')
															.addClass('selected');
												}
											}).fail(function(data) {
										var obj = $.parseJSON(JSON.stringify(data.responseText.replace('$daurl', '')));

										console.log('fail!!!!! the error is : ' + obj.error);
									});

						}).on('click','.nestedList',function() {
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

