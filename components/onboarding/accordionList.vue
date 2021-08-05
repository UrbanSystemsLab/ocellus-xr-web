<template>
    <div>
    <el-collapse v-model="activeNames" @change="handleChange">
            <el-collapse-item title="This" name="">
                <div>This</div>
            </el-collapse-item>
            <el-collapse-item title="That" name="">
                <div>That</div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>