jQuery.fn.reset = function() {
    $(this).each(function() {
	this.reset();
    });
};

$(function() {
   
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
	configpopup.find('form').reset();
	setTimeout(function() {
	    configpopup.popup().popup("open");
	}, 400);
	// $("#hostconfigpopup").first().popup("open");
    }).on('click', ".config_item", function(e) {
	// Pré-edit config
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
	// Modif config
	// console.log($(this).attr('data-val'));
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
});
/**
 * ***********************************************-
 * swiper-*************************************************
 */
$(document).on('mobileinit', function() {
    //$.mobile.loader.prototype.options.text = "loading";
    //$.mobile.loader.prototype.options.textVisible = true;
    //$.mobile.loader.prototype.options.theme = "a";
    $.mobile.loader.prototype.options.html = "<span class='ui-corner-all ui-loader' data-defaults='false'><img src='assets/img/loader.gif' /></span>";
    $.mobile.pageLoadErrorMessage = 'Error';
    $.mobile.ignoreContentEnabled = true;
    $.mobile.hashListeningEnabled = true;
    $.mobile.defaultPageTransition = "flow";
    $.mobile.pushStateEnabled = false;
   
    //$( ".ui-loader" ).loader( "option", "defaults", true );
    $.event.special.swipe.scrollSupressionThreshold = 10;
    // More than this horizontal displacement, and we will suppress scrolling.
    $.event.special.swipe.horizontalDistanceThreshold = 30;
    // Swipe horizontal displacement must be more than this.
    $.event.special.swipe.durationThreshold = 500;
    // More time than this, and it isn't a swipe.
    $.event.special.swipe.verticalDistanceThreshold = 75;
    // $.mobile.ajaxEnabled = false;
    // This second step ensures that the insertion of the new toolbar does not
    // affect page height
    // $.mobile.resetActivePageHeight();
   
}).on( "click", ".show-page-loading-msg", function() {$.mobile.loading( 'show');})
.on('pagechange', function(event) {
    // Gestion du l'activeState of navBar
    $('div#mainheader').find('a').not(".ui-state-persist").removeClass($.mobile.activeBtnClass);
    if (event.currentTarget.activeElement)
	$("div#mainheader a[id='" + event.currentTarget.activeElement.id + "']").addClass($.mobile.activeBtnClass);
    else
	$("div#mainheader a[id='page_home']").addClass($.mobile.activeBtnClass);

}).on('pagecreate', function(event) {
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
	if (href.length > 0) {
	    $.mobile.changePage(href, {
		changeHash : false
	    });
	}
    });

    $('div.ui-page').on("swiperight", function(e) {
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