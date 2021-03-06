jQuery.fn.reset = function() {
	$(this).each(function() {
		this.reset();
	});
};

$(function() {
	"use strict"
	
	$.ajaxSetup({
		timeout : 3000
	});
	var xremote = window.xremote || {};
	xremote.core = {
		page : {
			current : $(":mobile-pagecontainer").pagecontainer("getActivePage"),
			reloadCurrentPage : function() {
				$.mobile.changePage(window.location.href, {
					allowSamePageTransition : true,
					transition : 'none',
					showLoadMsg : false,
					reloadPage : true
				});
			}
		},
		popup : {
			configpopup : $("#hostconfigpopup"),
			listConfigPopup : $('#listconfig')
		},
		nowPlayingManager : null

	};
	if (xremote.context.isConnected) {
		console.log($("div:jqmData(role='sidemenu')").length);
		$("div:jqmData(role='sidemenu')").sidemenu();
		console.log('xremote.context.isConnected fisrt init');
		xremote.core.nowPlayingManager = new NowPlayingManager();
	}

	/**
	 * Gestion_des_configs***********************************************
	 */
	xremote.core.popup.configpopup.enhanceWithin().popup();
	xremote.core.popup.listConfigPopup.enhanceWithin().popup();

	if (xremote.context.isFirstCnx)
		xremote.core.popup.configpopup.popup("open");

	if (!xremote.context.isConnected)
		xremote.core.popup.listConfigPopup.popup("open");

	$("body").on('connectionLoosed', function(e) {
		// console.log('connection Loosed...');
		if (xremote.core.popup.listConfigPopup.closest('.ui-popup-container').hasClass('ui-popup-hidden'))
			xremote.core.popup.listConfigPopup.popup("open");
	}).on('GetBackConnectedEvent', function(e) {
		// console.log('GetBackConnectedEvent...');
		if (xremote.core.popup.listConfigPopup.closest('.ui-popup-container').hasClass('ui-popup-active'))
			xremote.core.popup.listConfigPopup.popup("close");

	}).on('click', 'a[data-rel]', function(e) {
		e.preventDefault();
		// console.log('delete item : ' + $(this).attr('data-rel'));
		$.getJSON($(this).attr('data-rel')).done(function(json) {
			if (json.status == 'ok')
				document.location = 'http://' + window.location.host + window.location.pathname;
			// console.log(json);
		}).fail(function(jqxhr, textStatus, error) {
			var err = textStatus + ", " + error;
			console.log("Request Failed: " + err);
		});
	}).on('click', '#add-conf', function(e) {
		// console.log($("#hostconfigpopup").closest('.ui-page').attr('id'));
		// console.log('Adding conf');
		$('.ui-popup').popup('close');
		// Add config
		xremote.core.popup.configpopup.find('form').reset();
		setTimeout(function() {
			xremote.core.popup.configpopup.popup().popup("open");
		}, 400);
		// $("#hostconfigpopup").first().popup("open");
	}).on('click', ".config_item", function(e) {
		// Pré-edit config
		// console.log("add config : " + $(this).attr('data-val'));
		var val = JSON.parse($(this).attr('data-val'));
		xremote.core.popup.configpopup.find('input').each(function(index) {

			if ($(this).attr('name') == 'host')
				$(this).val(val.host);
			else if ($(this).attr('name') == 'configname')
				$(this).val(val.configname);
			else if ($(this).attr('name') == 'port')
				$(this).val(val.port);
			else if ($(this).attr('name') == 'user')
				$(this).val(val.user);
			else if ($(this).attr('name') == 'password')
				$(this).val(val.password);
			else if ($(this).attr('name') == 'ismodif')
				$(this).val(true);
		});
		xremote.core.popup.configpopup.popup("open");
	}).on('click', ".config_select", function(e) {
		// Modif config
		// console.log($(this).attr('data-val'));
		var val = JSON.parse($(this).attr('data-val'));
		$('#selectedconfig').val(val.configname);
		$('form#listconfigform').submit();
	}).on('submit', 'form', function(e) {
		e.preventDefault();
		var thisform = $(this);
		thisform.validate();

		if (thisform.valid())
			$.ajax({
				url : thisform.attr('action'),
				type : thisform.attr('method'),
				data : thisform.serialize(),
				dataType : 'json',
				success : function(json) {
					if (json.status == 'ok') {
						$.mobile.loading('hide');
						xremote.core.page.reloadCurrentPage();
					}
				},
				beforeSend : function() {
					$.mobile.loading('show');
				},
				complete : function() {
					$.mobile.loading('hide');
				},
				error : function(request, error) {
					alert('Network error has occurred please try again!');
				}
			});

		return false;
	}).on("focus", ".ui-popup-active input, .ui-popup-active textarea", function() {
		$(this).closest('.ui-popup').popup("reposition", {
			y : 0
		/* move it to top */
		});
	}).on("click", "#back2", function() {
		$.mobile.back();
	});
	/**
	 * ********************************************- LocalStorage
	 * -*************************************************
	 */
	// Storage.prototype.setObject = function(key, value) {
	// this.setItem(key, JSON.stringify(value));
	// }
	//
	// Storage.prototype.getObject = function(key) {
	// return JSON.parse(this.getItem(key));
	// }
	//
	// if (localStorage) {
	// // localStorage.setObject("lastconnexion","{ 'one': 1, 'two': 2,
	// // 'three': 3 }");
	// }
	/**
	 * ***********************************************-
	 * swiper-*************************************************
	 */
	$(document).on('mobileinit', function() {

	}).on('stoppedMedia', function(event) {
		$("div:jqmData(role='sidemenu')").sidemenu('close', function(sidemenu) {
			sidemenu.hideButton();
		});
		xremote.core.page.current.find('#nowPlayingPanel').hide();
	}).on('playingMedia', function(event) {
		$("div:jqmData(role='sidemenu')").sidemenu('showButton');
		xremote.core.page.current.find('#nowPlayingPanel').show();
	}).on('pageshow', function(event, pg) {
		xremote.core.page.current = $(":mobile-pagecontainer").pagecontainer("getActivePage");
		// if (xremote.context.isConnected) {
		// console.log('pageshow');
		// //xremote.core.nowPlayingManager.destroy();
		// xremote.core.nowPlayingManager = new
		// NowPlayingManager(xremote.core.nowPlayingManager.pageJqM);
		// }
		$('#carousel').elastislide();
	}).on('pagechange', function(event, obj) {
		$("img.lazy").lazyload({
			effect : "fadeIn"
		});
		// Gestion du l'activeState of navBar
		$('div#mainheader').find('a').not(".ui-state-persist").removeClass($.mobile.activeBtnClass);
		if (event.currentTarget.activeElement)
			$("div#mainheader a[id='" + event.currentTarget.activeElement.id + "']").addClass($.mobile.activeBtnClass);
		else
			$("div#mainheader a[id='page_home']").addClass($.mobile.activeBtnClass);

	}).on('pagecreate', function(event) {
		console.log('pagecreate');
		$(this).on('click', '#add-conf', function(e) {
			// console.log($("#hostconfigpopup").length);
			// Add config
			$("#hostconfigpopup").last().popup("open");
		});

		$('div.ui-page').on("swipeleft", function(e) {
			e.stopImmediatePropagation();
			var idpage = $(this).attr('id');

			parentItem = $("div.ui-navbar a[id='" + idpage + "']").parent();
			if (parentItem.next().length <= 0)
				href = parentItem.parent().children().first().children().attr('href');
			else
				href = parentItem.next().children().attr('href');

			// console.log(href);
			if (href && href.length > 0) {
				$.mobile.changePage(href, {
					changeHash : false
				});
			}
		}).on("swiperight", function(e) {
			e.stopImmediatePropagation();
			var idpage = $(this).attr('id');
			parentItem = $("div.ui-navbar a[id='" + idpage + "']").parent();

			if (parentItem.prev().length <= 0)
				href = parentItem.parent().children().last().children().attr('href');
			else
				href = parentItem.prev().children().attr('href');

			// console.log(href);
			if (href && href.length > 0) {
				$.mobile.changePage(href, {
					changeHash : false
				});
			}
		});
	});
});