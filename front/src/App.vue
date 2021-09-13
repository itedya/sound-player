<template>
  <v-app>
    <div>
      <AppNavbar />
    </div>
    <GlobalErrorModal />
    <router-view />
  </v-app>
</template>

<script>
import AppNavbar from './components/AppNavbar';
import GlobalErrorModal from './components/GlobalModals/Error';

export default {
  components: {
    AppNavbar,
    GlobalErrorModal
  },

  async mounted() {
    await this.$store.auth.getUser()
      .catch(() => false);

    this.$router.start();
  },
};
</script>