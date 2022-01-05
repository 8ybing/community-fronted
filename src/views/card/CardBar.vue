<template>
    <div class="card-bar">
        <section>
            <!--是否登录-->
            <login-welcome></login-welcome>
            <!--日历-->
            <Calendar></Calendar>
            <br>
            <!--今日赠言-->
            <Tip></Tip>
            <br>
            <!--资源推荐-->
            <Promotion></Promotion>

        </section>
    </div>
</template>

<script>
    import LoginWelcome from "./LoginWelcome";
    import Tip from "./Tip";
    import Promotion from "./Promotion";
    import Calendar from "./Calendar";
    export default {
        name: "CardBar",
        components: {Calendar, Promotion, Tip, LoginWelcome},
        data(){
            return{

            }
        }
    }
</script>

<style scoped>
    .card-bar{

    }
</style>