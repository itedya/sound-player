<template>
  <v-container>
    <v-row align='center' justify='center'>
      <v-col md='8'>
        <v-progress-linear
          indeterminate
          color="primary"
          height='30px'
          class='rounded'
        >
          Wylogowywanie...
        </v-progress-linear>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    setTimeout(() => {
      this.$store.auth.token = null;
      this.$store.auth.state.user = false;
      this.$router.push('/');
    }, 1500);
  }
}
</script>