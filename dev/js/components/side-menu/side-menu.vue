<template>
    <div class="main-sidebar col-top page-sidebar">
        <menu-list :items="item"></menu-list>
    </div>
</template>
<script>
    import menuList from "./tree-list.vue";
    export default {
        data() {
            return{
                item: [
                    {
                        "text": "组件列表",
                        "active": false,
                        "expand": false,
                        "children": [
                            {"text":"模糊查询","icon":"&#xe621;","link":"fuzzy-search","active":false}
                        ]
                    }
                ]
            }
        },
        components:{
            menuList
        }
    };
</script>
<style>
    .nav-collapse.collapse {
        height: auto;
        overflow: visible;
    }
    .page-sidebar {
        background-color: #253238;
        width: 260px;
        min-height: 1000px;
    }
    .delete-border-space{
        border-spacing: -20px;
    }
</style>