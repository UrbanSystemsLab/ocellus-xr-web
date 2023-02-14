<template>
  <div>
    <el-alert title="You are offline, please connect." type="warning" show-icon center v-if="$nuxt.isOffline"></el-alert>
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family: "IBM Plex Sans", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

html {
  overflow-y: auto;
}

body {
  margin: 0;
  line-height: 1.5em;
  background-color: rgba(0, 0);
  max-height: 100%;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}

main {
  /* display: grid;
  grid-template-columns: 6fr 4fr; */
}


.el-carousel__arrow {
    background-color: white;
    color: black;
}

@media (max-width: 800px){
  .flex-container {
    display: flex;
    flex-direction: column;
  }
}

@media (min-width: 801px) {
  .flex-container {
    flex-direction: row;
  }
}

h1,h2,h3,h4,h5,h6,p,a {
  -ms-word-break: break-all;
  -ms-word-wrap: break-all;
  -webkit-word-break: break-word;
  -webkit-word-wrap: break-word;
  word-break: break-word;
  word-wrap: break-word;
  -webkit-hyphens: auto;
  -moz-hyphens: auto;
  hyphens: auto;
}

h1 {
  font-weight: "Bold";
  font-size: 28pt;
  line-height: 30pt;

}

h2 {
  font-weight: "Medium";
  font-size: 20pt;
  line-height: 24pt;
}

p {
  font-weight: "Light";
  font-size: 14pt;
  line-height: 18pt;
}

.el-image img {
  width: 100%;
  max-height: 50vh;
  height: auto;
  object-fit: contain;
}

.el-row {
  margin-bottom: 20px;
  text-align: left;
}

.el-row:last-child {
  margin-bottom: 0px;
}

*, *:before, *:after {
  box-sizing: border-box;
  margin: 0;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}
.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}
.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}
</style>
