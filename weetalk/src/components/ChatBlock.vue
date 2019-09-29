<template>
  <div id="chatblock">
    <div id="lobby">
      <div id="lobby-message">{{lobbyMessage}}</div>
      <div id="lobby-form">
        <input type="text" id="lobby-text" v-model="lobbyText" @keyup.13="lobbyOnMessage" />
        <input type="submit" id="lobby-submit" value="Send" @click="lobbyOnMessage" />
      </div>
    </div>
    <div id="listandroom">
      <div id="onlinelist">
        <div class="onlineUser" v-for="user in userList" :key="user.name">
          {{user.name}} &nbsp; online
          <button id="chat-button" @click="inviteChat(user.name)">Chat</button>
        </div>
      </div>
      <div id="room">
        <div id="room-message">{{roomMessage}}</div>
        <div id="room-form">
          <input type="text" id="room-text" v-model="roomText" @keyup.13="roomOnMessage" />
          <input type="submit" id="room-submit" value="Send" @click="roomOnMessage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ChatBlock",
  data() {
    return {
      lobbyText: "",
      lobbyMessage: "",
      userList: [],
      waitMessage: "",
      roomText: "",
      roomMessage: ""
    };
  },
  methods: {
    lobbyOnMessage: function() {
      let message = this.$store.state.userName + ": " + this.lobbyText + "\n";
      this.$socket.emit("lobbyOnMessage", message);
      this.lobbyMessage += message;
      this.lobbyText = "";
    },
    inviteChat: function(name) {
      this.roomMessage = "Waiting " + name + " ...";
      this.$socket.emit("inviteChat", name);
    },
    roomOnMessage: function() {
      let message = this.$store.state.userName + ": " + this.roomText + "\n";
      this.$socket.emit("roomOnMessage", message);
      this.roomMessage += message;
      this.roomText = "";
    }
  },
  sockets: {
    userLogin: function(value) {
      this.lobbyMessage += value + " join the lobby.\n";
    },
    refreshUserList: function(value) {
      this.userList = value;
    },
    inviteChat: function(value) {
      let c = confirm("You are invited to chat with " + value);
      if (c == true) {
        this.$socket.emit("accept", value);
        this.roomMessage = "You join the room.\n";
      } else {
        this.$socket.emit("reject", value);
      }
    },
    inviteSuccess: function() {
      alert("Invite Successfully！");
      this.roomMessage = "You join the room.\n";
    },
    inviteFail: function() {
      alert("Invite Failure ...");
      this.roomMessage = "";
    },
    lobbyOnMessage: function(value) {
      this.lobbyMessage += value;
    },
    roomOnMessage: function(value) {
      this.roomMessage += value;
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
  margin: 0.8%;
  white-space: pre-line;
  overflow: auto;
  font-size: 16px;
  line-height: 24px;
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
  line-height: 24px;
}
#chat-button {
  float: right;
  margin-right: 10px;
}
#room {
  height: 59vh;
  margin-left: 0.25%;
  margin-top: 0.75%;
  border-style: solid;
  border-width: 1.5px;
  border-radius: 10px;
}
#room-message {
  width: 99%;
  height: 89%;
  margin: 0.8%;
  white-space: pre-line;
  overflow: auto;
  font-size: 16px;
  line-height: 24px;
}
#room-form {
  width: 99%;
  height: 6%;
  margin: 0.5%;
}
#room-text {
  width: 90%;
  height: 100%;
  margin: 0.5%;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
}
#room-submit {
  width: 8%;
  height: 100%;
  border-style: solid;
  border-width: 1px;
  border-radius: 4px;
}
.onlineUser {
  width: 98%;
  height: fit-content;
  margin: 1%;
  border-bottom: dotted;
  border-width: 1px;
}
</style>