<template>
  <div id="app">
    <greet-bar></greet-bar>
    <router-view />
  </div>
</template>

<script>
import GreetBar from "@/components/GreetBar.vue";

export default {
  name: "app",
  components: {
    GreetBar
  },
  sockets: {
    message1: function(value) {
      //alert(value);
    },
    connect: function() {
      console.log('Connect Success');
    },
    changeStatus: function() {
      this.$store.commit('connect');
      console.log('Connect Success');
    },
    disconnect: function() {
      console.log('test');
    }
  }
};
</script>

<style>
#app {
}
</style>