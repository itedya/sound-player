<template>
  <v-dialog v-model='dialog' max-width='500'>
    <v-card>
      <v-toolbar color='error' dense>
        <v-toolbar-title>Wystąpił błąd</v-toolbar-title>
      </v-toolbar>

      <v-card-text class='pt-2'>
        {{ text }}
      </v-card-text>

      <v-card-actions>
        <v-btn color='error' @click='dialog = false'>OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    text: "",
    dialog: false
  }),

  mounted() {
    this.$eventbus.$on('global-error:modal:show', (text) => {
      this.text = text;
      this.dialog = true;
    })
  }
}
</script>