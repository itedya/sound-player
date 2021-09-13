<template>
  <v-dialog v-model='dialog' max-width='500px' :persistent='loading'>
    <v-card :loading='loading'>
      <v-toolbar color='error' dense>
        Na pewno?
      </v-toolbar>

      <v-card-text class='mt-2'>
        Czy na pewno chcesz to usunąć?
      </v-card-text>

      <v-card-actions>
        <v-btn
          @click='remove'
          :loading='loading'
          :disabled='loading'
          color='error'
        >Tak</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mdiTrashCan } from '@mdi/js';
import { wait } from '../../../plugins/wait';

export default {
  data: () => ({
    dialog: false,
    sound: {},
    loading: false,
    icons: {
      mdiTrashCan
    },
  }),

  mounted() {
    this.$eventbus.$on('delete-sound:modal:show', (data) => {
      this.sound = data;
      this.dialog = true;
    });
  },

  methods: {
    async remove() {
      this.loading = true;
      await this.$store.sounds.delete(this.sound.id);
      await wait();
      this.loading = false;
      this.dialog = false;
    },
  },
};
</script>