(function($) {
    
  'use strict';


  /**
   * =====================================
   * Function for windows height and width      
   * =====================================
   */
  function windowSize( el ) {
    var result = 0;
    if("height" == el)
        result = window.innerHeight ? window.innerHeight : $(window).height();
    if("width" == el)
      result = window.innerWidth ? window.innerWidth : $(window).width();

    return result; 
  }
  /**
   * =======================================
   * Function: Home Section Fullscreen View.
   * =======================================
   */
  var fullscreen_home = function( id ) {

    var mainSection     = $( id ),
        paddingSection  = mainSection.find(".inner-container"),
        windowWidth     = windowSize('width'),
        windowHeight    = windowSize('height')

    if( windowWidth >= 767 && windowHeight >= ( paddingSection.height() + 170*2) ) {

      mainSection.css({
        'height': windowHeight + "px",
        'position': 'relative'
      });

      var top     = Math.max( (windowHeight / 2) - ( paddingSection.height() / 2), 0),
          PTop    = 0, 
          PBottom = 0;

      if(top == Math.round(top)) {
        PTop = PBottom = top;
      }
      else {
        PTop    = Math.round(top)-1;
        PBottom = Math.round(top);
      }

      paddingSection.css('padding-top', PTop + 'px');
      paddingSection.css('padding-bottom', PBottom + 'px');

    }
    else {

      mainSection.css({
        'height': "Initial",
        'position': 'relative'
      });

      paddingSection.css({
        'padding-top': "170px",
        'padding-bottom': "170px"
      });

    }
  }



  /**
   * =====================================
   * Function for windows height and width      
   * =====================================
   */
  function deviceControll() {
    if( windowSize( 'width' ) < 768 ) {
      $('body').removeClass('desktop').removeClass('tablet').addClass('mobile');
    }
    else if( windowSize( 'width' ) < 992 ){
      $('body').removeClass('mobile').removeClass('desktop').addClass('tablet');
    }
    else {
      $('body').removeClass('mobile').removeClass('tablet').addClass('desktop');
    }
  }



  function portfolioAnimationTextHeight() {
    $('.section').each(function() {

      var actionDiv   = $(this),
          actionId    = actionDiv.attr('data-heading'),
          height      = actionDiv.find('.inner-container').height();

      $( actionId ).css({
        'height': height
      })

    });
  }



  $(window).on('load', function() {

    portfolioAnimationTextHeight();
    $('.home-section').addClass('active-animation');

  });



  $(window).on('resize', function() {

    deviceControll();
    portfolioAnimationTextHeight();
    fullscreen_home( '.home-section' );

  });



  $(document).on('ready', function() {


    deviceControll();
    fullscreen_home( '.home-section' );

      /**
       * =============================================
       * Preloader INIT
       * =============================================
       */
      $('body').jpreLoader({
          preMainSection:     '#main-preloader',
          prePerText:         '.preloader-percentage-text',
          preBar:             '.preloader-bar',
      });

      // $( '.main-preloader-inner' ).each(function() {

      //   var width = $('.home-section .heading-outer').width(),
      //       height = $('.home-section .heading-outer').height(),
      //       x = $(".home-section .heading-outer").offset();

      //   $(this).css({
      //     'width': width + "px",
      //     'height': height + "px",
      //     'left': x.left + "px",
      //     'top': x.top + "px"
      //   });

      // });



      /**
     * =======================================
     * Wow Plagin Init
     * =======================================
     */
    var wow = new WOW({
        animateClass: 'active',
        offset:       100
    });
    wow.init();


    /**
     * =======================================
     * Top Fixed Navbar
     * =======================================
     */
    $(document).on('scroll', function() {
      var activeClass = 'navbar-home',
          ActiveID        = '.main-navbar-top',
          scrollPos       = $(this).scrollTop();

      if( scrollPos > ( $('.home-section').height() - 80 ) ) {
        $( ActiveID ).addClass( activeClass );
      } else {
        $( ActiveID ).removeClass( activeClass );
      }
    });



    /**
     * =======================================
     * NAVIGATION SCROLL
     * =======================================
     */
    var TopOffsetId = '.navbar-brand';
    $('#js-navbar-menu').onePageNav({
        currentClass: 'active',
        scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
        scrollSpeed: 1000,
        scrollOffset: Math.abs( $( TopOffsetId ).outerHeight() - 1 )
    });

    $('.btn-scroll a, a.btn-scroll').on('click', function (e) {
      e.preventDefault();

      var target = this.hash,
          scrollOffset = Math.abs( $( TopOffsetId ).outerHeight() ),
          $target = ( $(target).offset() || { "top": NaN }).top;

      $('html, body').stop().animate({
        'scrollTop': $target - scrollOffset
      }, 900, 'swing', function () {
        window.location.hash = target;
      });

    });




    /**
     * =============================================
     * Main Navigarion Button Script
     * =============================================
     */
    $('.nav-trigger').on('click', function() {

      var thisSection = $(this),
          actionId    = $( thisSection.attr('data-target') );

      if( thisSection.hasClass('nav-visible') ) {
        thisSection.removeClass('nav-visible')
        actionId.removeClass('show-nav');

        var setTime = setTimeout(function() {
          actionId.fadeOut();
        }, 500 );

      }else {

        actionId.fadeIn(10);
        thisSection.addClass('nav-visible')
        actionId.addClass('show-nav');
        
      }
    });



    var navigationItemHover = $('#fp-nav').find('li');
    navigationItemHover.on('mouseenter', function() {
      var actionItem = $(this).find('.fp-tooltip');
      actionItem.fadeIn(100);
      $(this).addClass('show-text');
    });
    navigationItemHover.on('mouseleave', function() {
      var actionItem = $(this).find('.fp-tooltip');
      $(this).removeClass('show-text');

      setTimeout(function() {
        actionItem.fadeOut(10);
      }, 600);
    });




    /**
     * =============================================
     * Animated Button HTML Import Script
     * =============================================
     */
    var btnMask = $('.btn-mask, .btn-nav');
    btnMask.each(function() {

      $(this).append('<span class="view-all-link-mask"><span class="view-all-link-mask-text">' + $(this).html() + '</span></span>');

    });




    /**
     * =============================================
     * Services Detail Show 
     * =============================================
     */
    $('.services-full-view').find('.services-details').fadeOut(10);

    var servicesButton = $('.btn-services');
    servicesButton.on('click', function(el) {
      el.preventDefault();

      var actionId        = $(this).attr('href'),
          hideSection     = $(this).closest('.each-services-outer'),
          parentSection   = $(this).closest('.services-section'),
          sectionHeading  = parentSection.find('.section-header');

      hideSection.addClass('active');
      sectionHeading.addClass('active');

      setTimeout(function() {
        hideSection.fadeOut(10);
        sectionHeading.fadeOut(10);
      }, 400 );

      setTimeout(function() {

        $( actionId ).fadeIn(10);
        $( actionId ).addClass('active');

      }, 550 );

    });


    /**
     * =============================================
     * Services Detail Back 3
     * =============================================
     */
    var servicesBackButton = $('.btn-services-back');
    servicesBackButton.on('click', function(el) {
      el.preventDefault();

      var actionId        = $('.each-services-outer'),
          hideSection     = $(this).closest('.services-details'),
          parentSection   = $(this).closest('.services-section'),
          sectionHeading  = parentSection.find('.section-header');

      hideSection.removeClass('active');

      setTimeout(function() {
        hideSection.fadeOut(10);
      }, 400 );

      setTimeout(function() {

        $( actionId ).fadeIn(10);
        $( actionId ).removeClass('active');

        sectionHeading.fadeIn(10);
        sectionHeading.removeClass('active');

      }, 550 );

    });


    /**
     * ===============================================
     * Project Slider and Project Detail Initial style
     * ===============================================
     */
    $('.section-item').each(function() {

      $( this ).find('.slider').fadeOut(10);
      $( this ).find('.project-detail').fadeOut(10);

    });



    /**
     * =============================================
     * Project Slider and Project Detail Show Button
     * =============================================
     */
    var sliderButton      = $('.btn-slider, .btn-project-detail');
    sliderButton.on('click', function(el) {
      el.preventDefault();

      var mainSectionId   = $( $(this).closest('.porifolio-section') ),
          dataElement     = $(this).attr('data-element'),
          dataHeading     = '.each-portfolio-heading',
          sliderId        = mainSectionId.find('.slider'),
          projectDetailId = mainSectionId.find('.project-detail'),
          imageId         = mainSectionId.find('.image');

      mainSectionId.find( dataHeading ).addClass('no-heading');

      setTimeout(function() {

        if( dataElement === 'slider' ){
          sliderId.fadeIn(100);
          sliderId.closest('.slider-outer').css( 'z-index', 111 );
          sliderId.addClass('active-section');
        }else if( dataElement === 'project-detail' ){
          projectDetailId.fadeIn(100);
          projectDetailId.closest('.project-detail-outer').css( 'z-index', 111 );
          projectDetailId.addClass('active-section');
        }

      }, 600 );

      imageId.fadeOut(600);
    });



    /**
     * =============================================
     * Project Slider and Project Detail Back Button
     * =============================================
     */
    var sliderBackButton = $('.btn-slider-back, btn-project-detail-back');
    sliderBackButton.on('click', function(el) {
      el.preventDefault();

      var mainSectionId   = $( $(this).closest('.porifolio-section') ),
          dataHeading     = '.each-portfolio-heading',
          sliderId        = mainSectionId.find('.slider'),
          projectDetailId = mainSectionId.find('.project-detail'),
          imageId         = mainSectionId.find('.image');

      sliderId.removeClass('active-section');
      projectDetailId.removeClass('active-section');
      
      setTimeout(function() {
        imageId.fadeIn(600);
        sliderId.fadeOut(100);
        projectDetailId.fadeOut(100);
        mainSectionId.find( dataHeading ).removeClass('no-heading');
        sliderId.closest('.slider-outer').css( 'z-index', -111 );
        projectDetailId.closest('.project-detail-outer').css( 'z-index', -111 );
      }, 200 );

      
    });




    /**
     * =======================================
     * Portfolio Wrapper Slider
     * =======================================
     */
    var portfolioWrapper = $(".portfolio-wrapper"); // client's message
    portfolioWrapper.owlCarousel({
      singleItem :        true,
      slideSpeed :        500,
      paginationSpeed :   500,
      autoHeight :        false,
      navigation:         false,
      pagination:         true,
      // afterAction : syncPosition,
      // autoHeight : true,
      afterAction: function(el){
        //remove class active
        this
        .$owlItems
        .removeClass('active');

        //add class active
        this
        .$owlItems //owl internal $ object containing items
        .eq(this.currentItem)
        .addClass('active');
     }
    });




    /**
     * =======================================
     * Image Slider
     * =======================================
     */
    var imageSlider = $(".project-slider"); // client's message
    imageSlider.owlCarousel({
      singleItem :        true,
      slideSpeed :        500,
      paginationSpeed :   500,
      autoHeight :        false,
      navigation:         true,
      pagination:         true,
      transitionStyle:    "fade"
    });


    /**
     * =======================================
     * testimonial SYNC WITH CLIENTS
     * =======================================
     */
    var testimonialSlider = $(".testimonial-wrapper"); // client's message
    testimonialSlider.owlCarousel({
      singleItem :        true,
      autoPlay :          3000,
      slideSpeed :        500,
      paginationSpeed :   500,
      autoHeight :        false,
      navigation:         false,
      pagination:         true,
      // transitionStyle:    "fade"
    });

  });


} (jQuery) );


