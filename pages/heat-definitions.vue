<template>
    <div>
        <main class="flex-container">
        <appMenu />
        <el-row>
            <h1>What is heat risk?</h1>
        </el-row>
        <el-row>
            <p>Heat risk is a measure of how likely your health will be impacted by high temperatures or prolonged heat exposure. There are many factors associated with heat risk, including urban and green infrastructure, social vulnerability, and building density. To learn more, explore the concepts below.</p>
        </el-row>
        <el-row>
            <el-collapse v-model="activeNames" @change="handleChange">
                <el-collapse-item title="Urban Heat Island Effect" name="1">
                    <div>Buildings and paved surfaces trap and store heat, making cities hotter than the surrounding countryside, and interact with global and regional climate change to create even hotter neighborhoods.</div>
                </el-collapse-item>
                <el-collapse-item title="Heat Wave" name="2">
                    <div>A heat wave is any time you experience 3 consecutive days over 90°F (32°C) degrees, which are occurring more frequently and kill more people in NYC than any other climate hazard.</div>
                </el-collapse-item>
                <el-collapse-item title="Climate Scenario" name="3">
                    <div>Climate scenarios are developed by scientists to better understand how the world might change in the future, and are an important input for modeling future climate.</div>
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