/* JS by Mamo YZ
https://mamoyz.com/ */
var app = new Vue({
  el: "#app",
  data: {
    strings: [
      "is Google™ for your personal data.",
      "is your Enterprise Knowledge Management Tool",
      "is your personal Wikipedia.",
      "weaves your data Fabric layer.",
      "your Feature Store search engine.",
    ],
  },
  methods: {
    submitSignUp() {
      // handle signup
    },
    slideClickHandler(e) {
      this.slideToNext();
    },
    slideWheelHandler(e) {
      if (e.wheelDelta > 0 || e.detail < 0) {
      } else {
        e.preventDefault();
        this.slideToNext();
      }
    },
    slideToNext() {
      $("body,html")
        .stop()
        .animate(
          // Slide to next section
          {
            scrollTop: $(window).innerHeight(),
          },
          1500
        );
    },
  },
  mounted() {
    $(window).scroll(function () {
      $(window).scrollTop() > $(".main").offset().top - 20
        ? $("header").fadeIn(300)
        : $("header").fadeOut(300);
    });
    let typed = new Typed(".typed", {
      strings: this.strings,
      typeSpeed: 50,
      contentType: "html",
      loop: true,
      backDelay: 1000,
    });
  },
});
