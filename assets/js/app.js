/* JS by Mamo YZ
https://mamoyz.com/ */
var app = new Vue({
  el: "#app",
  data: {
    currentItem: 0,
    keyword: null,
    results: null,
    formDirty: false,
    searching: false,
    loading: false,
    typedConfig: {
      typeSpeed: 80,
      backSpeed: 30,
      contentType: "html",
    },
    // suggestions: [],
    strings: [
      "is Google™ for your personal data.",
      "is your Enterprise Knowledge Management Tool",
      "is your personal Wikipedia.",
      "weaves your data Fabric layer.",
      "your Feature Store search engine.",
    ],
    rowOneHeading: ["Your Data is scattered &amp; not easily accessible"],
    rowTwoHeading: ["Take knowledge to<br />the next level"],
    rowThreeHeading: ["The HyperGraph Platform"],
    dummyResponse: [
      {
        title: "Bla bla bla 1",
        url: "https://google.com/1",
      },
      {
        title: "Bla bla bla 2",
        url: "https://google.com/2",
      },
      {
        title: "Bla bla bla 3",
        url: "https://google.com/3",
      },
      {
        title: "Bla bla bla 4",
        url: "https://google.com/4",
      },
      {
        title: "Bla bla bla 5",
        url: "https://google.com/5",
      },
    ],
  },
  methods: {
    /* Main function : Trigger search and show results */
    searchChangeHandler() {
      console.log("search function triggered!");
      if (this.keyword && this.keyword.length > 2) {
        /* Trigger Search when the keyword lenght is 3 or bigger */
        this.formDirty = true;
        /* Set Loading to true */
        this.loading = true;
        /* Do AJAX Call here and put results as JSON to this.results */
        axios
          .get("https://jsonplaceholder.typicode.com/todos")
          .then((response) => {
            // console.log(response.data);
            setTimeout(() => {
              /* Search Results */
              this.results = this.dummyResponse;
              /* Set Search suggestions */
              // this.suggestions = response.data;
              /* Set Loading back to false again */
              this.loading = false;

              /* Set selected item back to first one again */
              this.currentItem = 0;
            }, 1000);
          });
      } else {
        this.formDirty = false;
      }
    },
    /* Modify URL */
    modifiedUrl(url) {
      return url + "this-is-modified";
    },
    /* Reset search and close search box */
    cancelSearchHandler() {
      this.keyword = null;
      this.searching = false;
      // this.suggestions = null;
      this.results = null;
      this.currentItem = 0;
    },
    // handle signup
    submitSignUp() {
      // handle signup
    },
    slideClickHandler(e) {
      this.slideToSection(1);
    },
    slideWheelHandler(e) {
      if (e.wheelDelta > 0 || e.detail < 0) {
      } else {
        e.preventDefault();
        this.slideToSection(1);
      }
    },
    slideToSection(index) {
      $("body,html")
        .stop()
        .animate(
          // Slide to next section
          {
            scrollTop: $("section").eq(index).offset().top,
          },
          1500
        );
    },
    /* Highligh search results on "Keyboard UP" and "Keyboard DOWN" presser */
    nextItem(e) {
      if (this.searching) {
        e.preventDefault();
        if (e.keyCode == 38) {
          if (this.currentItem == 0) return false;
          this.currentItem--;
        } else if (e.keyCode == 40) {
          if (this.currentItem == this.results.length - 1) return false;
          this.currentItem++;
        }
      }
    },
    setCurrentItem(index) {
      this.currentItem = index;
    },
  },
  /* Watch changes on search input  */

  watch: {
    keyword: _.debounce(function (newVal, oldVal) {
      this.searchChangeHandler();
    }, 500),
  },
  mounted() {
    document.addEventListener("keyup", this.nextItem);

    $(window).scroll(function () {
      $(window).scrollTop() > $(".main").offset().top - 20
        ? $("header, .search-box").fadeIn(300)
        : $("header, .search-box").fadeOut(300);
    });

    let typed = new Typed(".typed", {
      strings: this.strings,
      loop: true,
      backDelay: 1000,

      ...this.typedConfig,
    });
    let rowOneTyped = new Typed("#row1heading", {
      strings: this.rowOneHeading,
      loop: true,
      showCursor: false,
      backDelay: 5000,

      ...this.typedConfig,
    });
    let rowTwoTyped = new Typed("#row2heading", {
      strings: this.rowTwoHeading,
      loop: true,
      showCursor: false,
      backDelay: 5000,

      ...this.typedConfig,
    });
    let rowThreeTyped = new Typed("#row3heading", {
      strings: this.rowThreeHeading,
      loop: true,
      showCursor: false,
      backDelay: 5000,

      ...this.typedConfig,
    });
    particlesJS("particles-js", {
      particles: {
        number: {
          value: 125,
          density: {
            enable: false,
            value_area: 800,
          },
        },
        color: {
          value: "#000000",
        },
        shape: {
          type: "circle",
          stroke: {
            width: 0,
            color: "#000000",
          },
          polygon: {
            nb_sides: 5,
          },
          image: {
            src: "img/github.svg",
            width: 100,
            height: 100,
          },
        },
        opacity: {
          value: 0.5,
          random: false,
          anim: {
            enable: false,
            speed: 1,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: false,
            speed: 40,
            size_min: 0.1,
            sync: false,
          },
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#000000",
          opacity: 0.4,
          width: 1,
        },
        move: {
          enable: true,
          speed: 6,
          direction: "none",
          random: false,
          straight: false,
          out_mode: "out",
          bounce: false,
          attract: {
            enable: false,
            rotateX: 600,
            rotateY: 1200,
          },
        },
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: {
            enable: false,
            mode: "repulse",
          },
          onclick: {
            enable: true,
            mode: "push",
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 400,
            line_linked: {
              opacity: 1,
            },
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3,
          },
          repulse: {
            distance: 200,
            duration: 0.4,
          },
          push: {
            particles_nb: 4,
          },
          remove: {
            particles_nb: 2,
          },
        },
      },
      retina_detect: true,
    });
  },
});
