$(function() {
	$.mobile.ignoreContentEnabled = true;
	$.mobile.defaultPageTransition = "flow";
	$.mobile.pushStateEnabled = false;
	//$.mobile.ajaxEnabled = false;
    // This second step ensures that the insertion of the new toolbar does not  affect page height
    //$.mobile.resetActivePageHeight();
	/**
	 * Gestion_des_configs***********************************************
	 */
    var configpopup = $("#hostconfigpopup");
	var listConfigPopup = $('#listconfig');
	configpopup.enhanceWithin().popup();
	listConfigPopup.enhanceWithin().popup();
	
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
		//console.log($("#hostconfigpopup").closest('.ui-page').attr('id'));
		//Add config
		$("#hostconfigpopup").first().popup("open");
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
	   
	}).on('pagechange', function(event){
		//Gestion du l'active State of navBar
		$('div#mainheader').filter('a').not(".ui-state-persist" ).removeClass( $.mobile.activeBtnClass );
		if(event.currentTarget.activeElement)
			$("div#mainheader a[id='" + event.currentTarget.activeElement.id + "']").addClass( $.mobile.activeBtnClass );
		else
			$("div#mainheader a[id='page_home']").addClass( $.mobile.activeBtnClass );
		
	})
	.on('pagecreate', function(event){
		$(this).on('click', '#add-conf', function(e) {
			console.log($("#hostconfigpopup").length);
			//Add config
			$("#hostconfigpopup").last().popup("open");
		});
		
	
	  $('div.ui-page').on("swipeleft", function (e) {
		  e.stopImmediatePropagation();
		  var idpage = $(this).attr('id');
		  
		  href = $("div.ui-navbar a[id='" + idpage + "']").parent().next().children().attr('href');
		  //console.log(href);
		  if (href.length > 0) {
			  $.mobile.changePage(href ,{ changeHash: false});
		  }
	  });

	  $('div.ui-page').on("swiperight", function (e) {
		  e.stopImmediatePropagation();
		  var idpage = $(this).attr('id');
		  href = $("div.ui-navbar a[id='" + idpage + "']").parent().prev().children().attr('href');
		  //console.log(href);
		  if (href.length > 0) {
			  $.mobile.changePage(href,{ changeHash: false});
		  }
	  });
	  
	});