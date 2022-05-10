<template>
  <div>
    <main class="home" aria-labelledby="main-title">
      <header class="hero">
        <img
          class="logo"
          :src="$withBase('/logo-icon-white.svg')"
          alt="logo-icon-white"
        />
        <p class="description">Welcome to</p>
        <h1 id="main-title" class="title">Cronos Documentation</h1>
        <p class="action" v-if="data.actionText && data.actionLink">
          <NavLink class="action-button" :item="actionLink" />
        </p>
      </header>


      <div class="introduction">
        <div class="signup-newsletter-text">
          Sign up to our newsletter to get the latest updates and
        </div>
        <div class="introduction-text">
          read the documentation to connect to our Testnet.
        </div>

        <div>
          <NavLink class="subscription-button" :item="subscriptionLink" />
          <NavLink class="readdoc-button" :item="readdocLink" />
        </div>
      </div>


      <div class="get-involved">
        <div class="left">
          <img
            class="logo"
            :src="$withBase('/involve.svg')"
            alt="get-involved"
          />
        </div>
        <div class="right">
          <h1 class="text-header">Get Involved</h1>
          <div class="involve-link">
            <div>
              <img :src="$withBase('/developers.svg')" alt="developers" />
            </div>
            <div>
              <h3>Developers</h3>
              <p>View our latest chain releases and features</p>
              <a href="/releases">
                Download latest release
                <img
                  class="action-arrow"
                  :src="$withBase('/arrow_blue.svg')"
                  alt="arrow"
                />
              </a>
            </div>
          </div>
          <div class="involve-link">
            <div>
              <img :src="$withBase('/validators.svg')" alt="validators" />
            </div>
            <div>
              <h3>Partners</h3>
              <p>Launch your project on the network or join the network as a validator </p>
              <a href="/partners">
                Join us
                <img
                  class="action-arrow"
                  :src="$withBase('/arrow_blue.svg')"
                  alt="arrow"
                />
              </a>
            </div>
          </div>
          <div class="involve-link">
            <div>
              <img :src="$withBase('/community.svg')" alt="community" />
            </div>
            <div>
              <h3>Community</h3>
              <p>
                Connect with our developer community on Discord and stay tuned with our
                Chain development updates
              </p>
              <a href="/community">
                Connect
                <img
                  class="action-arrow"
                  :src="$withBase('/arrow_blue.svg')"
                  alt="arrow"
                />
              </a>
            </div>
          </div>
        </div>
      </div>


      <!-- <Content class="theme-default-content custom" /> -->
    </main>
    <Footer />
  </div>
</template>

<script>
import NavLink from "@theme/components/NavLink.vue";
import Footer from "@theme/components/Footer.vue";

export default {
  components: { NavLink, Footer },

  computed: {
    data() {
      return this.$page.frontmatter;
    },

    actionLink() {
      return {
        link: this.data.actionLink,
        text: this.data.actionText,
      };
    },

    subscriptionLink() {
      return {
        link: this.data.subscriptionLink,
        text: this.data.subscriptionText,
      };
    },

    readdocLink() {
      return {
        link: this.data.readdocLink,
        text: this.data.readdocText,
      };
    },
  },
};
</script>

<style lang="stylus">
.home {
  padding $navbarHeight+2rem 2rem 0;
  max-width $MQWide;
  margin 0px auto;
  display block;

  .action-arrow {
    margin-left .6rem
    transform translateY(-1px)
  }
  .hero {
    text-align center;
    position relative;
    border-radius 8px;
    padding 3rem 2rem;

    color white;
    background url(../../public/hero-bg.svg);
    background-size cover;

    .logo {
      width: 70px;
    }

    h1 {
      font-size 2.4rem;
      margin 1rem auto 0;
      font-weight 500;
    }

    .description {
      font-size 2.4rem;
      line-height 1.3;
      margin 1rem auto 0;
      font-weight 300;
      max-width: 800px;
    }

    .action-button {
      display inline-block;
      font-size 1rem;
      color #fff;
      background-color $accentColor;
      padding 0.6rem 2.2rem;
      border-radius 4px;
      transition background-color 0.1s ease;
      box-sizing border-box;
      border-bottom 1px solid darken($accentColor, 10%);
      margin-top 1rem;

      &:hover {
        background-color lighten($accentColor, 10%);
      }
    }
  }

  .subscription-button {
    display inline-block;
    font-size 1rem;
    color #fff;
    background-color $accentColor;
    padding 0.6rem 2.2rem;
    border-radius 4px;
    transition background-color 0.1s ease;
    box-sizing border-box;
    line-height: 1.7;
    margin: 1rem 1rem;

    svg {
      color #fff
    }

    &:hover {
      background-color lighten($accentColor, 10%);
    }
  }

  .readdoc-button {
    display inline-block;
    font-size 1rem;
    color $accentColor;
    background-color #f7f9fa;
    padding 0.6rem 2.2rem;
    border-radius 4px;
    transition background-color 0.1s ease;
    box-sizing border-box;
    line-height: 1.7;

    svg {
      color #fff
    }

    &:hover {
      color #fff
      background-color lighten($accentColor, 10%);
    }
  }

  .text-header {
    margin-top 5rem
    font-weight 500
    text-align center
  }
  .cards {
    padding 1.2rem 1.5rem;
    margin-top 1.5rem;
    display flex;
    flex-wrap wrap;
    align-items flex-start;
    align-content stretch;
    justify-content space-between;
  }

  .card {
    flex-grow 1;
    flex-basis 23%;
    max-width 23%;
    background-color white;
    border-radius 8px;
    box-shadow 0 4px 10px 3px rgba(0, 0, 0, 0.05);

    .up {
      padding 1.5rem 1.5rem 0;
      border-bottom 1px solid #eee;
      h2 {
        font-size 1.2rem;
        font-weight 600;
        border none;
        padding-bottom 0;
        color $textColor;
      }
      p {
        color $textColor;
      }
    }
    .down {
      padding 0 1.5rem;
    }
  }

  .introduction {
    border-radius 4px
    margin 80px auto
    padding 34px
    text-align center
    font-size 1.5em

    .signup-newsletter-text {
      margin-top 20px
      line-height 40px
    }

    .introduction-text {
      margin-bottom 20px
      line-height 40px
    }
  }

  .get-involved {
    display flex
    margin 6rem 3rem
    justify-content space-between

    .left {
      padding 5rem
      img {
        max-width 100%
      }
    }
    .right {
      flex-basis 40%
      padding 1rem
      .text-header {
        text-align left
        margin-top 0
      }
    }
    .involve-link {
      display flex
      margin-bottom 2rem
      img {
        margin-right 1.5rem
      }
      h3 {
        margin 0
      }
    }
  }
}

@media (max-width $MQMobile) {
  .home {
    .card {
      max-width 48%;
      flex-grow 1;
      flex-basis 48%;
      margin-bottom 1.5rem;
    }
    .get-involved {
      margin 2rem 1rem
      flex-direction column
      .left {
        padding 0
        margin-bottom 3rem
        text-align center
      }
    }
  }
}

@media (max-width $MQMobileNarrow) {
  .home {
    padding-left 1.5rem;
    padding-right 1.5rem;

    .hero {
      padding 1rem;

      img {
        max-height 210px;
        margin 2rem auto 1.2rem;
      }

      h1 {
        font-size 2rem;
      }

      h1, .description, .action {
        margin 1.2rem auto;
      }

      .description {
        font-size 1.2rem;
      }

      .action-button {
        font-size 1rem;
        padding 0.6rem 1.2rem;
      }

      .subscription-button {
        font-size 1rem;
        padding 0.6rem 1.2rem;
      }

      .readdoc-button {
        font-size 1rem;
        padding 0.6rem 1.2rem;
      }
    }

    .card {
      max-width 100%;
      flex-basis 100%;
      margin-bottom 1.5rem;
    }
  }
}
</style>
