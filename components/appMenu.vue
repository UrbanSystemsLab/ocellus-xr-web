<!--
  Off-canvas menu content
-->

<template>
    <div id="menu-div">
        <el-row>
            <el-button class="open-left-nav" type="secondary" icon="el-icon-menu" circle v-on:click="toggleNav($event)"></el-button>
            <!-- <div ref="bmBurgerButton" class="bm-burger-button">
                <span class="bm-burger-bars line-style" :style="{top:20 * (index * 2) + '%'}" v-for="(x, index) in 3" :key="index"></span>
            </div> -->
            <!-- <OffCanvas class="sidebar-container flexbox-parent" id="sidebarLeft" v-model="showSidebar" sidebarId="sidebarLeft" :width="350" :duration=".3" effect="ease-in-out" @sidebarWasClosed="showSidebar=$event" :hideOnEsc="false" :hideOnClickOutside="false" /> -->
        </el-row>
    </div>
</template>

<script>
export default {
    name: 'appMenu',
    data(){
      return {
          showMenu: false
      }
    },
    methods: {
        toggleNav(e){
        e.preventDefault()
        this.showSidebar = !this.showSidebar
        },
    }
}
</script>

<style scoped>

#menu-div {
    height: 4vh;
    /* position: absolute; */
    width: 100vw;
    padding: 2rem;
    z-index: 200;
}

.open-left-nav {
  position: fixed;
  top: 1em;
  left: 1em;
}

.bm-burger-button {
    position: absolute;
    width: 24px;
    height: 20px;
    left: 24px;
    top: 24px;
    cursor: pointer;
}

.bm-burger-bars {
    background-color: #373a47;
}
.line-style {
    position: absolute;
    height: 20%;
    left: 0;
    right: 0;
}

</style>