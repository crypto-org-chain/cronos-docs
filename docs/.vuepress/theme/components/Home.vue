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
        <h1 v-if="data.heroText !== null" id="main-title">
          Crypto.org Chain Documentation
        </h1>
        <p class="action" v-if="data.actionText && data.actionLink">
          <NavLink class="action-button" :item="actionLink" />
        </p>
      </header>

      <div class="features">
        <h3>Features</h3>
        <div class="row">
          <div class="column">
            <div class="icon">
              <img :src="$withBase('/secure.svg')" alt="secure" />
            </div>
            <div class="title">EVM Compatible</div>
            <p>
              Built on Ethermint that supports any smart contracts, DAOs or Dapps deployed on Ethereum.
            </p>
          </div>
          <div class="column">
            <div class="icon">
              <img :src="$withBase('/instant.svg')" alt="instant" />
            </div>
            <div class="title">Scalable</div>
            <p>
              Cronos can process more transactions per minute than Etherum, which makes it faster, cheaper and greener to execute smart contracts.
            </p>
          </div>
          <div class="column">
            <div class="icon">
              <img :src="$withBase('/permissionless.svg')" alt="permissionless" />
            </div>
            <div class="title">Interoperable</div>
            <p>
              IBC protocol that allows blockchains to connect, interoperate and transfer value, interchange assets and services.
            </p>
          </div>
          <div class="column">
            <div class="icon">
              <img :src="$withBase('/sustainable.svg')" />
            </div>
            <div class="title">Proof of authority (POA)</div>
            <p>
              A more streamlined and scalable consensus protocol while still maintaining security with a range of validators that are run by many different parties.
            </p>
          </div>
          <div class="column">
            <div class="icon">
              <img :src="$withBase('/open-ecosystem.svg')" alt="Open Source" />
            </div>
            <div class="title">Open Source</div>
            <p>
              We welcome our community to work together with us and strengthen the CRONOS chain.
            </p>
          </div>

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
                Get involved
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
              <p>Join the others and be part of our Chain project</p>
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
                Connect with our developer community and stay tuned with our
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


      <div class="signup-newsletter">
        <div class="signup-newsletter-text">
          Crypto.org Cronos Chain is releasing soon.
          <br/>
          Sign up to our newsletter to get the latest updates!
        </div>

        <div>
          <NavLink class="subscription-button" :item="subscriptionLink" />
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

    logo {
      max-width 100%;
      z-index 1;
      display block;
    }

    h1 {
      font-size 2.4rem;
      margin 0 0 2rem;
      font-weight 500;
    }

    .description {
      font-size 2.4rem;
      line-height 1.3;
      margin 1rem 0 0;
      font-weight 300;
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
    border-bottom 1px solid darken($accentColor, 10%);

    svg {
      color #fff
    }

    &:hover {
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

  .features {

    margin-bottom: 28px

    h3 {
      margin-top 160px
      font-weight 600
      font-size 40px
      text-align center
    }
    .row {
      display flex
      flex-wrap wrap
      padding 48px
      justify-content center

      .column {
        flex-basis 28%
        padding 32px 20px
        color #0b1426

        .title {
          margin 16px 0
          font-weight 500
          font-size 20px
        }
      }
    }

    // responsive
    @media (max-width $MQMobileNarrow) {
      .row {
        .column {
          flex-basis 50%
        }
      }
    }

    @media (max-width $MQMobileNarrow) {

      h3 {
        font-size 22px
      }
      .row {
        padding 16px

        .column {
          flex-basis 100%
          padding 32px 32px 32px 0
          text-align left
        }
      }
    }
  }

  .signup-newsletter {
    border-radius 4px
    margin 20px auto
    padding 34px
    text-align center
    margin-bottom 80px
    font-size 1.5em

    .signup-newsletter-text {
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
    }

    .card {
      max-width 100%;
      flex-basis 100%;
      margin-bottom 1.5rem;
    }
  }
}
</style>
