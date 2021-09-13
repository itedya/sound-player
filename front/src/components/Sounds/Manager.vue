<template>
  <v-card :loading='loading'>
    <v-toolbar color='primary' dense>
      <v-toolbar-title>Dźwięki</v-toolbar-title>
    </v-toolbar>

    <v-card-text>
      <CreateSound />
      <UpdateSound />
      <DeleteSound />

      <v-data-table
        :items='items'
        :headers='headers'
        :loading='loading'
      >
        <template v-slot:item.actions='{ item }'>
          <v-btn color='orange' class='mx-1' fab small @click='update(item)' :loading='loading'>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn color='error' class='mx-1' fab small @click='remove(item)' :loading='loading'>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color='success'
        @click='$eventbus.$emit("create-sound:modal:show")'
        :loading='loading'
      >
        <v-icon>{{ icons.mdiPlus }}</v-icon>
        Dodaj
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import CreateSound from '../../components/Sounds/Modals/Create';
import UpdateSound from '../../components/Sounds/Modals/Update';
import DeleteSound from '../../components/Sounds/Modals/Delete';
import { mdiPlus } from '@mdi/js';
import { wait } from '../../plugins/wait';

export default {
  components: {
    CreateSound,
    UpdateSound,
    DeleteSound
  },

  data: () => ({
    icons: {
      mdiPlus,
    },
    headers: [
      { text: 'Nazwa dźwięku', value: 'name' },
      { text: 'Akcje', value: 'actions', sortable: false },
    ],
    loading: false,
  }),

  computed: {
    items() {
      return this.$store.sounds.sounds;
    },
  },

  async mounted() {
    this.loading = true;
    await this.$store.sounds.getSounds();
    await wait();
    this.loading = false;
  },

  methods: {
    async update(data) {
      this.loading = true;
      this.$eventbus.$emit('update-sound:modal:show', data);
      this.loading = false;
    },

    async remove(data) {
      this.$eventbus.$emit('delete-sound:modal:show', data);
    },
  },
};
</script>