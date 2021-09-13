<template>
  <v-dialog v-model='dialog' max-width='500px' :persistent='loading'>
    <v-card :loading='loading'>
      <v-toolbar color='primary' dense>
        Stwórz
      </v-toolbar>

      <v-card-text>
        <v-form ref='form'>
          <v-text-field
            :loading='loading'
            v-model='sound.name'
            :disabled='loading'
            label='Nazwa dźwięku'
            :rules='[
              v => !!v || "Pole wymagane",
              v => !!v && v.length >= 3 || "Minimum 3 znaki",
              v => !!v && v.length <= 64 || "Maksymalnie 64 znaki"
            ]'
          ></v-text-field>
        </v-form>

        <file-pond
          ref='file-pond'
          name='file'
          :server='filePondServerSettings'
          :accepted-file-types='["audio/mp3", "audio/mpeg", "audio/wav"]'
        />
      </v-card-text>

      <v-card-actions>
        <v-btn
          @click='create'
          color='success'
        >
          <v-icon>{{ icons.mdiPlus }}</v-icon>
          Dodaj
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { FilePond, filePondServerSettings } from '../../../plugins/filepond';
import { mdiPlus } from '@mdi/js';

export default {
  components: {
    FilePond,
  },

  data: () => ({
    dialog: false,
    sound: {},
    loading: false,
    filePondServerSettings,
    icons: {
      mdiPlus,
    },
  }),

  mounted() {
    this.$eventbus.$on('create-sound:modal:show', () => {
      this.sound = {};

      const inter = setInterval(() => {
        if (this.$refs['file-pond']) {
          this.$refs['file-pond'].removeFiles();
          clearInterval(inter);
        }
      }, 50);

      this.dialog = true;
    });
  },

  methods: {
    async create() {
      const file = this.$refs['file-pond'].getFile();
      console.log(file);

      if (!this.$refs.form.validate()) return;
      if (file === null) return;
      if (file.serverId === '') return;

      this.loading = true;

      await this.$store.sounds.create({
        ...this.sound,
        file: file.serverId,
      });

      this.dialog = false;
      this.loading = false;
    },
  },
};
</script>