<template>
    <el-calendar>
        <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->
        <template
                slot="dateCell"
                slot-scope="{date, data}">
            <p :class="data.isSelected ? 'is-selected' : ''">
                {{ data.day.split('-').slice(2).join('-') }} {{ data.isSelected ? '✔️' : ''}}
            </p>
        </template>
    </el-calendar>
</template>

<script>
    export default {
        name: "Calendar",
        data(){
            return{

            }
        },
    }
</script>

<style>
    .is-selected {
        color: #1989FA;
    }
    .el-calendar-table .el-calendar-day{
        height: 47px;
    }
</style>