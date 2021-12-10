<template>
    <div id="messaging-test">
        <el-badge id="badge-count" :value="0" class="item">
            <el-button id="btnMsg" size="medium" @click="open2">Placeholder</el-button>
        </el-badge>
    </div>
</template>

<script>
export default {
    name: 'receiveTest',
    methods: {
        open2() {
            this.$notify({
            title: 'Message from Unity',
            message: 'Test Message works'
          });
        }
    },
    mounted() {
    if (window.vuplex) {
        addMessageListener();
      } else {
        window.addEventListener('vuplexready', addMessageListener);
      }

      function addMessageListener() {
        window.vuplex.addEventListener('message', function(event) {
          let json = event.data;
          // > JSON received: { "type": "greeting", "message": "Hello from C#!" }
        //   console.log('JSON received: ' + json);
          this.$notify({
            title: 'Message from Unity',
            message: json
          });
        });
      }
    } 
}
</script>

<style>

#messaging-test {
    height: 10vh;
    width: 55vw;
    padding: 2rem;
}

</style>