<template>
    <div>
        <div id="dropdown">
            <el-dropdown>
                <span class="el-dropdown-link">
                    Dropdown List<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>Action 1</el-dropdown-item>
                    <el-dropdown-item>Action 2</el-dropdown-item>
                    <el-dropdown-item>Action 3</el-dropdown-item>
                    <el-dropdown-item disabled>Action 4</el-dropdown-item>
                    <el-dropdown-item divided>Action 5</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    name: 'layerDropdown',
    data(){
      return {

      }
    }
}
</script>

<style scoped>

#dropdown{
    position: absolute;
    height: 10vh;
    width: 10vw;
    padding: 2rem;
    z-index: 200;
}

.el-dropdown-link {
cursor: pointer;
color: #409EFF;
}

.el-icon-arrow-down {
font-size: 12px;
}

</style>