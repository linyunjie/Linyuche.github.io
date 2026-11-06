(function ($) {
  "use strict";

  var mobileNavOffset = 64;

  function getScrollOffset() {
    return window.matchMedia("(min-width: 992px)").matches ? 8 : mobileNavOffset;
  }

  function scrollToTarget($target) {
    if (!$target.length) {
      return;
    }

    var top = Math.max(0, Math.round($target.offset().top - getScrollOffset()));
    $("html, body").stop(true).animate({ scrollTop: top }, 400);
  }

  function bindScrollspy() {
    var $body = $("body");
    var existing = $body.data("bs.scrollspy");
    if (existing) {
      $body.removeData("bs.scrollspy");
      $(window).off(".bs.scrollspy");
      $body.off(".bs.scrollspy");
    }

    $body.scrollspy({
      target: "#sideNav",
      offset: getScrollOffset() + 20
    });
  }

  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').on("click", function (event) {
    if (
      location.pathname.replace(/^\//, "") !== this.pathname.replace(/^\//, "") ||
      location.hostname !== this.hostname
    ) {
      return;
    }

    var hash = this.hash;
    var $target = $(hash);
    $target = $target.length ? $target : $("[name=" + hash.slice(1) + "]");

    if (!$target.length) {
      return;
    }

    event.preventDefault();
    scrollToTarget($target);

    if (history.pushState) {
      history.pushState(null, "", hash);
    }

    $(".navbar-collapse").collapse("hide");
  });

  bindScrollspy();

  var resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(bindScrollspy, 150);
  });

  if (window.location.hash) {
    var $initial = $(window.location.hash);
    if ($initial.length) {
      setTimeout(function () {
        scrollToTarget($initial);
      }, 80);
    }
  }
})(jQuery);
