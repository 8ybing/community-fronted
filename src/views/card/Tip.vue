<template>
    <div>
        <el-card class="box-card" shadow="never">
            <div slot="header">
                <span>🎈 每日一句</span>
            </div>
            <div v-cloak>
                <div class="has-text-left block" v-text="tip.content">

                </div>
                <div v-cloak class="has-text-right mt-3 block" v-text="'—' + tip.from">

                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    import {getTipsApi, getTodayTip} from "../../api/tip";

    export default {
        name: 'Tip',
        data(){
            return{
                tip: {
                    content: '',
                    time: ''
                }
            }
        },
        mounted() {
            // this.fetchTodayTip()
            this.fetchTipsApi()
        },
        methods: {
            // async fetchTodayTip(){
            //     getTodayTip().then((value) => {
            //         const {data} = value
            //         this.tip = data
            //     })
            // },
            async fetchTipsApi(){
                getTipsApi().then( response => {
                    const {data} = response
                    // console.log(data)
                    this.tip.content = data.content
                    this.tip.from = data.from
                })
            }
        }
    }
</script>

<style scoped>
    [v-cloak]{
        display: none;
    }
</style>