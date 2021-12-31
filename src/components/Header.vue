<template>
  <div>
    <nav
      class="nav py-5 flex flex-wrap items-center justify-between px-4 bg-gray-700"
    >
      <!-- App Name -->
      <router-link
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exact-active-class="no-active"
      >
        Music
      </router-link>

      <input class="menu-btn hidden" type="checkbox" id="menu-btn" />
      <label
        class="menu-icon block cursor-pointer md:hidden px-2 py-4 relative select-none"
        for="menu-btn"
        style="background-color: red"
      >
        <span class="navicon bg-grey-darkest flex items-center relative"></span>
      </label>

      <ul
        class="menu border-b md:border-none flex justify-end list-reset m-0 w-full md:w-auto"
      >
        <li>
          <router-link class="px-2 text-white" :to="{ name: 'about' }">
            {{ $t("header.about") }}
          </router-link>
        </li>
        <li v-if="!userLoggedIn">
          <a class="px-2 text-white" href="#" @click.prevent="toggleAuthModal">
            {{ $t("header.login_register") }}
          </a>
        </li>
        <template v-else>
          <li>
            <router-link class="px-2 text-white" :to="{ name: 'manage' }">
              {{ $t("header.manage") }}
            </router-link>
          </li>
          <li>
            <a class="px-2 text-white" href="#" @click.prevent="signout">
              {{ $t("header.logout") }}
            </a>
          </li>
        </template>
      </ul>
      <ul class="flex flex-row mt-1 md:ml-auto">
        <li>
          <a class="px-2 text-white" href="#" @click.prevent="changeLocale">
            {{ currentLocale }}
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

export default {
  name: "Header",
  computed: {
    ...mapState(["userLoggedIn"]),
    currentLocale() {
      return this.$i18n.locale === "fa" ? "فارسی" : "English";
    },
  },
  methods: {
    ...mapMutations(["toggleAuthModal"]),
    signout() {
      this.$store.dispatch("signout", {
        router: this.$router,
        route: this.$route,
      });

      // console.log(this.$route);
      if (this.$route.meta.requiresAuth) {
        this.$router.push({ name: "home" });
      }
    },
    changeLocale() {
      this.$i18n.locale = this.$i18n.locale === "fa" ? "en" : "fa";
    },
    // toggleAuthModal() {
    //   this.$store.commit('toggleAuthModal');
    // },
  },
};
</script>

<style>
@media (max-width: 767px) {
  .navicon {
    width: 1.125em;
    height: 0.125em;
  }

  .navicon::before,
  .navicon::after {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: all 0.2s ease-out;
    content: "";
    background: #3d4852;
  }

  .navicon::before {
    top: 5px;
  }

  .navicon::after {
    top: -5px;
  }

  .menu-btn:not(:checked) ~ .menu {
    display: none;
  }

  .menu-btn:checked ~ .menu {
    display: block;
  }

  .menu-btn:checked ~ .menu-icon .navicon {
    background: transparent;
  }

  .menu-btn:checked ~ .menu-icon .navicon::before {
    transform: rotate(-45deg);
  }

  .menu-btn:checked ~ .menu-icon .navicon::after {
    transform: rotate(45deg);
  }

  .menu-btn:checked ~ .menu-icon .navicon::before,
  .menu-btn:checked ~ .menu-icon .navicon::after {
    top: 0;
  }
}
</style>
