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
    suggestions: [],
    strings: [
      "is Google™ for your personal data.",
      "is your Enterprise Knowledge Management Tool",
      "is your personal Wikipedia.",
      "weaves your data Fabric layer.",
      "your Feature Store search engine.",
    ],
  },
  methods: {
    /* Main function : Trigger search and show results */
    searchChangeHandler() {
      if (this.keyword && this.keyword.length > 2) {
        /* Trigger Search when the keyword lenght is 3 or bigger */
        this.formDirty = true;
        /* Set Loading to true */
        this.loading = true;
        /* Do AJAX Call here and put results as JSON to this.results */
        axios
          .get("https://jsonplaceholder.typicode.com/todos")
          .then((response) => {
            console.log(response.data);
            setTimeout(() => {
              /* Search Results */
              this.results = response.data;
              /* Set Search suggestions */
              this.suggestions = response.data;
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
    /* Reset search and close search box */
    cancelSearchHandler() {
      this.keyword = null;
      this.searching = false;
      this.suggestions = null;
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
    keyword: function (val, oldVal) {
      this.searchChangeHandler();
    },
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
      typeSpeed: 50,
      contentType: "html",
      loop: true,
      backDelay: 1000,
    });
  },
});
