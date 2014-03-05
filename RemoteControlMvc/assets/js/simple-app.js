$(function() {
	var configpopup = $("#hostconfigpopup");
	var listConfigPopup = $('#savedconfig');
	//$.mobile.ajaxEnabled = false;
    //$.mobile.pushStateEnabled = false;
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

	/**
	 * ***********************************************-
	 * swiper-*************************************************
	 */
//
//	// Init Navigation
//	var nav = $('.swiper-nav').swiper({
//		slidesPerView : 'auto',
//		freeMode : true,
//		freeModeFluid : true,
//		onSlideClick : function(nav) {
//			pages.swipeTo(nav.clickedSlideIndex)
//		}
//	})
//
//	// Function to Fix Pages Height
//	function fixPagesHeight() {
//		$('.swiper-pages').css({
//			height : $(window).height() - nav.height
//		})
//	}
//	$(window).on('resize', function() {
//		fixPagesHeight()
//	});
//
//	fixPagesHeight()
//
//	// Init Pages
//	var pages = $('.swiper-pages').swiper({
//		simulateTouch : false,
//		onSlideChangeEnd : function() {
//			$('input').blur();
//			$('.swiper-nav .swiper-slide').removeClass('selected');
//			$('.swiper-nav .swiper-slide').eq([ pages.activeIndex ]).addClass('selected');
//		},
//		hashNav : true
//	})
//
//	// Scroll Containers
//	$('.scroll-container').each(function() {
//		$(this).swiper({
//			mode : 'vertical',
//			simulateTouch : false,
//			scrollContainer : true,
//			mousewheelControl : true,
//			hashNav : true,
//			scrollbar : {
//				container : $(this).find('.swiper-scrollbar')[0]
//			}
//		})
//	})
//
//	// Gallery
//	var swiperGallery = $('.swiper-gallery').swiper({
//		mode : 'vertical',
//		slidesPerView : 'auto',
//		freeMode : true,
//		freeModeFluid : true,
//		scrollbar : {
//			container : $('.swiper-gallery .swiper-scrollbar')[0]
//		}
//	})
//	swiperGallery.reInit();
//
//	var swiperGallerymovies = $('.swiper-gallery-movies').swiper({
//		mode : 'vertical',
//		slidesPerView : 'auto',
//		freeMode : true,
//		freeModeFluid : true,
//		scrollbar : {
//			container : $('.swiper-gallery-movies .swiper-scrollbar')[0]
//		}
//	})
//	swiperGallerymovies.reInit();
});