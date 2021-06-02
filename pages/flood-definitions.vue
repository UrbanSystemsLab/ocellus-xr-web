<template>
    <div>
        <main class="flex-container">
        <appMenu />
        <el-row>
            <h1>What is flood risk?</h1>
        </el-row>
        <el-row>
            <p>Flood risk is your vulnerability to danger or health issues from flooding events. There are many factors that go into flood risk, including elevation, proximity to water ways, and green infrastructure. However, not all factors are physical. Some communities are more vulnerable to heat risk than others due to socio-economic variables. Please explore definitions below.</p>
        </el-row>
        <el-row>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="Flood Plain" name="1">
                    <div>An area of low-lying ground adjacent to a river, formed mainly of river sediments and subject to flooding. They have multiple, defined boundaries based on the intensity of storms.</div>
                </el-collapse-item>
                <el-collapse-item title="Storm Surge" name="2">
                    <div></div>
                </el-collapse-item>
                <el-collapse-item title="50/100 Year Storm" name="3">
                    <div></div>
                </el-collapse-item>
                <el-collapse-item title="Social Equity" name="4">
                    <div></div>
                </el-collapse-item>
                <el-collapse-item title="Climate Justice" name="5">
                    <div></div>
                </el-collapse-item>
                <el-collapse-item title="Nature-Based Solutions" name="6">
                    <div></div>
                </el-collapse-item>
            </el-collapse>
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