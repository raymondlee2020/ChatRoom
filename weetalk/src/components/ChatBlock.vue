<template>
  <div id="chatblock">
    <div id="lobby">
      <div id="lobby-message"></div>
      <form id="lobby-form" @submit="lobbyOnMessage">
        <input type="text" id="lobby-text" />
        <input type="submit" id="lobby-submit" value="Send"/>
      </form>
    </div>
    <div id="listandroom">
      <div id="onlinelist">
        <div class="onlineUser" v-for="user in showList" :key="user.name">
          {{user.name}} &nbsp; online
        </div>
      </div>
      <div id="room"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBlock",
  props: {},
  computed: {
    showList: function() {
      return [{name: 'Raymond'}, {name: 'Charlie'}]
    }
  },
  methods: {
    lobbyOnMessage: function() {
      document.getElementById('lobby-message').innerHTML += document.getElementById('lobby-text').value + '\n';
      document.getElementById('lobby-text').value = '';
    }
  }
};
</script>

<style scoped>
#chatblock {
  width: 100%;
  display: inline-block;
}
#lobby {
  width: 59%;
  height: 92vh;
  float: left;
  margin: 0.25%;
  border-style: solid;
  border-width: 1.5px;
  border-radius: 10px;
  display: inline-block;
}
#lobby-message {
  width: 99%;
  height: 92%;
  margin: 0.75%;
  white-space: pre-line;
  overflow: auto;
}
#lobby-form {
  width: 99%;
  height: 4%;
  margin: 0.5%;
}
#lobby-text {
  width: 92%;
  height: 100%;
  margin: 0.5%;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
}
#lobby-submit {
  width: 6%;
  height: 100%;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
}
#listandroom {
  width: 39%;
  height: 92vh;
  float: left;
  margin: 0.25%;
}
#onlinelist {
  height: 32vh;
  margin-left: 0.25%;
  margin-bottom: 0.75%;
  border-style: solid;
  border-width: 1.5px;
  border-radius: 10px;
}
#room {
  height: 59vh;
  margin-left: 0.25%;
  margin-top: 0.75%;
  border-style: solid;
  border-width: 1.5px;
  border-radius: 10px;
}
.onlineUser {
  width: 98%;
  height: fit-content;
  margin: 1%;
  border-bottom: dotted;
  border-width: 1px; 
}
</style>