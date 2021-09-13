<template>
  <v-app-bar
    dense
    flat
  >
    <v-spacer v-if='$vuetify.breakpoint.mdAndUp'></v-spacer>

    <v-app-bar-nav-icon v-if='$vuetify.breakpoint.smAndDown'></v-app-bar-nav-icon>

    <v-app-bar-title>SoundPlayer for Channel Points</v-app-bar-title>

    <v-spacer></v-spacer>

    <v-btn
      v-for='routeToRender in routesToRender'
      :key='routeToRender.path'
      @click='redirect(routeToRender.path)'
      :color='$route.path === routeToRender.path ? "primary" : ""'
      v-if='$vuetify.breakpoint.mdAndUp'
      tile
      >
      {{ routeToRender.name }}
    </v-btn>

    <v-spacer v-if='$vuetify.breakpoint.mdAndUp'></v-spacer>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    routesToRender() {
      const authenticated = !!this.$store.auth.state.user;

      return this.$router.options.routes.filter(ele => {
        if (ele.meta.loggedIn && ele.meta.loggedIn !== authenticated) {
          return false;
        } else if (!ele.meta.loggedIn && ele.meta.loggedIn !== authenticated) {
          return false;
        } else {
          return true;
        }
      });
    }
  },

  methods: {
    redirect(path) {
      if (path !== this.$route.path) this.$router.push(path);
    }
  }
};
</script>