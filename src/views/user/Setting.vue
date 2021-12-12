<template>
    <div class="columns">
        <div class="column ">
            <el-card class="box-card" shadow="never">
                <div slot="header">
                   个人信息
                </div>

            </el-card>
        </div>
        <div class="column is-three-quarters">
            <el-card class="box-card" shadow="never">
                <div slot="header">
                    资料修改
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Setting",
        data(){
            return{
                user: {

                }
            }
        }
    }
</script>

<style scoped>

</style>