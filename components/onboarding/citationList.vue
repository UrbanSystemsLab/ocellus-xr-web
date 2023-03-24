<template>
  <div>
    <ul>
      <li
      v-for="citation in citations">
        <a v-if="!isVuplex"
          :href="citation.ref"
          target="_blank"
        >
        {{citation.title}}

        </a>
        <el-button v-else @click="jumpToLink(citation.ref)" type="text">{{citation.title}}</el-button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "citationList",
  props: {
    citations: Array
  },
  computed: {
    isVuplex(){
      return (typeof window.vuplex === 'undefined' ? false : true)
    }
  },
  methods: {
    jumpToLink(ref){
      console.log(ref)
      let message = {
        type: 'link',
        data: {
          link: {
            url: ref,
          },
          webview: false
        }
      };
      window?.vuplex?.postMessage(ref);
      console.log('js-dev', 'menu message sent from JS to C#', ref);
    }
  },
  mounted() {
  }

}
</script>

<style scoped>
h3{
  padding-left: 1em;
}
.el-button{
  border: none !important;
}
</style>
