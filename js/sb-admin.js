(function($) {
  "use strict"; // Start of use strict

  // Box toggles will change content
  function changeContent(){
    //get the checkbox
    var checkBox = document.getElementByID("myCheck");

    //this is for if you want to grab "all" or "mine"
    var x = document.getElementByID("all-content");
    var y = document.getElementByID("mine-content");

    //the default toggle setting is set to "all", so if they set it to "mine", show "mine-content" and hide "all-content"
    if(checkBox.checked === true){
      y.style.display === "block";
      x.style.display === "none";

    //else show "all-content" and hide "mine-content"
    } else {
      x.style.display === "block";
      y.style.display === "none";
    }
  }

  // Toggle the side navigation
  $("#sidebarToggle").on('click', function(e) {
    e.preventDefault();
    $("body").toggleClass("sidebar-toggled");
    $(".sidebar").toggleClass("toggled");
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .sidebar').on('mousewheel DOMMouseScroll wheel', function(e) {
    if ($(window).width() > 768) {
      var e0 = e.originalEvent,
        delta = e0.wheelDelta || -e0.detail;
      this.scrollTop += (delta < 0 ? 1 : -1) * 30;
      e.preventDefault();
    }
  });

  // Scroll to top button appear
  $(document).on('scroll', function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

})(jQuery); // End of use strict
