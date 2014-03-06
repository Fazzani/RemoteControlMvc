$(function() {
	var configpopup = $("#hostconfigpopup");
	var listConfigPopup = $('#savedconfig');
	//$.mobile.ajaxEnabled = false;
    $.mobile.pushStateEnabled = false;
	/**
	 * Gestion_des_configs***********************************************
	 */
	if (isFirstCnx)
		configpopup.popup("open");

	if (!isConnected)
		listConfigPopup.popup("open");

	$("body").on('connectionLoosed', function(e) {
		console.log('connectionLoosed...');
		listConfigPopup.popup("open");
	}).on('click', 'a[data-rel]', function(e) {
		e.preventDefault();
		console.log('delete item : ' + $(this).attr('data-rel'));
		var val = $.getJSON($(this).attr('data-rel')).done(function(json) {
			if (json.status == 'ok')
				document.location = 'http://' + window.location.host + window.location.pathname;
			//console.log(json);
		}).fail(function(jqxhr, textStatus, error) {
			var err = textStatus + ", " + error;
			console.log("Request Failed: " + err);
		});
	}).on('click', '#add-conf', function(e) {
		//Add config
		configpopup.popup("open");
	}).on('click', "#config-item-name", function(e) {
		//Activate config
	
	}).on('click', ".config_item", function(e) {
		//Pré-edit config
		// console.log("add config : " + $(this).attr('data-val'));
		var val = JSON.parse($(this).attr('data-val'));
		configpopup.find('input').each(function(index) {

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
		$("#hostconfigpopup").popup("open");
	}).on('click', ".config_select", function(e) {
		//Modif config
		console.log($(this).attr('data-val'));
		var val = JSON.parse($(this).attr('data-val'));
		$('#selectedconfig').val(val.configname);
		$('form#listconfigform').submit();
	}).on('submit', 'form', function() {
		$.ajax({
			url : $(this).attr('action'),
			type : $(this).attr('method'),
			data : $(this).serialize(),
			dataType : 'json',
			success : function(json) {
				if (json.status == 'ok')
					document.location = 'http://' + window.location.host + window.location.pathname;
			}
		});
		return false;
	}).on('click', '#submitSettings', function(e) {
		$('#configform').submit();
		return false;
	});

	/**
	 * ********************************************- LocalStorage
	 * -*************************************************
	 */
	Storage.prototype.setObject = function(key, value) {
		this.setItem(key, JSON.stringify(value));
	}

	Storage.prototype.getObject = function(key) {
		return JSON.parse(this.getItem(key));
	}

	if (localStorage) {
		// localStorage.setObject("lastconnexion","{ 'one': 1, 'two': 2,
		// 'three': 3 }");
	}
});
/**
 * ***********************************************-
 * swiper-*************************************************
 */
$(document).on('mobileinit', function () {
	   // settings
	   $.mobile.ignoreContentEnabled = true;
	   $.mobile.defaultPageTransition = "turn";
	}).on('pagecreate', function(event){
		
	  $('div.ui-page').on("swipeleft", function (e) {
		  e.stopImmediatePropagation();
		  var idpage = $(this).attr('id');
		  if(idpage=='home')
			  idpage='homee';
		  href = $("div.ui-navbar a[id='" + idpage + "']").parent().next().children().attr('href');
		  //console.log(href);
		  if (href.length > 0) {
			  $.mobile.changePage(href ,{ transition: "slide", changeHash: false});
		  }
	  });

	  $('div.ui-page').on("swiperight", function (e) {
		  e.stopImmediatePropagation();
		  var idpage = $(this).attr('id');
		  if(idpage=='home')
			  idpage='homee';
		  href = $("div.ui-navbar a[id='" + idpage + "']").parent().prev().children().attr('href');
		  //console.log(href);
		  if (href.length > 0) {
			  $.mobile.changePage(href,{ transition: "slide", changeHash: false});
		  }
	  });
	});