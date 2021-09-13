<template>
  <v-dialog v-model='dialog' max-width='500px' :persistent='loading'>
    <v-card :loading='loading'>
      <v-toolbar color='primary' dense>
        <v-icon class='mr-2'>{{ icons.mdiPencil }}</v-icon>
        Edytuj

        <v-spacer></v-spacer>

        <v-btn @click='dialog = false' fab small depressed color='primary'>
          <v-icon >{{ icons.mdiClose }}</v-icon>
        </v-btn>
      </v-toolbar>

      <v-card-text>
        <v-form ref='form'>
          <v-text-field
            :loading='loading'
            v-model='sound.name'
            label='Nazwa dźwięku'
            :rules='[
              v => !!v || "Pole wymagane",
              v => !!v && v.length >= 3 || "Minimum 3 znaki",
              v => !!v && v.length <= 64 || "Maksymalnie 64 znaki"
            ]'
          ></v-text-field>
        </v-form>

        Wybierz nagrodę / nagrody za punkty:
        <v-row>
          <v-col cols='12'>
            <v-checkbox
              v-for='channelReward in channelRewards'
              :key='channelReward.id'
              :label='channelReward.title'
              :color='channelReward.backgroundColor'
              :value='channelReward.id'
              v-model='sound.rewardId'
            ></v-checkbox>
          </v-col>
        </v-row>
      </v-card-text>

      <v-card-actions>
        <v-btn
          @click='update'
          :loading='loading'
          :disabled='loading'
          color='success'
        >
          <v-icon class='mr-2'>{{ icons.mdiCheck }}</v-icon>
          Potwierdź
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiCheck, mdiPencil, mdiClose } from '@mdi/js';
import { wait } from '../../../plugins/wait';

export default {
  data: () => ({
    dialog: false,
    sound: {},
    loading: false,
    icons: { mdiPencil, mdiCheck, mdiClose },
  }),

  computed: {
    channelRewards() {
      return this.$store.twitchApi.channelRewards;
    }
  },

  async mounted() {
    this.loading = true;

    this.$eventbus.$on('update-sound:modal:show', (data) => {
      this.sound = JSON.parse(JSON.stringify(data));
      this.dialog = true;
    });

    await this.$store.twitchApi.getAuthChannelRewards();

    this.loading = false;
  },

  methods: {
    async update() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;
      await this.$store.sounds.update(this.sound);
      await wait();
      this.loading = false;
      this.dialog = false;
    },
  },
};
</script>