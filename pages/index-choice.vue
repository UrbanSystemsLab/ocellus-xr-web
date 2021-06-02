<template>
    <div>
        <main class="flex-container">
            <appMenu />
            <el-row>
                <h1>Am I affected by climate change?</h1>
            </el-row>
            <el-row>
                <p>Yes! In New York City, we are exposed to multiple climate and weather-related hazards, from heat waves to hurricanes and floods. But some communities are more affected than others. Select either “Heat” or “Flooding” to learn more about how these climate risks affect you.</p>
            </el-row>
            <el-row>
                <el-col :span="12">
                    <NuxtLink to="/heat-definitions">
                    <el-button type="secondary"><h2>Heat</h2></el-button>
                    </NuxtLink>
                </el-col>
                <el-col :span="12">
                    <NuxtLink to="/flood-definitions">
                    <el-button type="secondary"><h2>Flood</h2></el-button>
                    </NuxtLink>
                </el-col>
            </el-row>
        </main>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>

</style>