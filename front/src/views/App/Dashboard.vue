<template>
  <v-container>
    <v-row justify='center' align='center'>
      <v-col md='6' xl='4'>
        <SoundsManager />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import SoundsManager from '../../components/Sounds/Manager.vue';

export default {
  components: {
    SoundsManager,
  }
}
</script>