<template>
  <div>
    <ul>
      <li
      v-for="citation in citations">
        <a
          :href="citation.ref"
          target="_blank"
        >
        {{citation.title}}

        </a>
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
  mounted() {
  }

}
</script>

<style scoped>
h3{
  padding-left: 1em;
}
</style>
