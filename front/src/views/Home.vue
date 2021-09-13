<template>
  <v-container class='fill-height'>
    <v-row justify='center' align='center'>
      <v-col cols='12'>
        <h1 class='display-1 text-center'>SoundPlayer for Channel Points</h1>
        <p class='text-center'>Puszczanie dźwięków na streamie za punkty kanału</p>
      </v-col>
      <v-btn color='purple' :loading='loading' @click='attemptAuth'>
        <v-icon left>{{ icons.mdiTwitch }}</v-icon>
        Zaloguj / Zarejestruj się
      </v-btn>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
import { mdiTwitch } from '@mdi/js';

export default {
  data: () => ({
    icons: {
      mdiTwitch,
    },
    loading: false,
  }),

  methods: {
    async attemptAuth() {
      this.loading = true;
      await this.$store.auth.attemptAuth()

      this.loading = false;
    },
  },
};
</script>
