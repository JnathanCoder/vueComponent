<template>
    <ul :class="{'sub-menu':(level==1) ,'page-sidebar-menu':!(level==1) }" >
        <li v-for="(index,item) in items" :class="{'active':item.active}">
            <a  v-link="{name:item[link]}">
                <i class="icon" v-html="item.icon"></i>
                <span class="title">{{item[text]}}</span>
            </a>
            <tree-list :items="item[children]" v-if="item[children]" v-show="item.expand" level="1" transition="bounce"></tree-list>
        </li>
    </ul>
</template>
<script>
    import Vue from 'vue';
    export default{
        name:'treeList',
        ready(){
            var self = this;
            var getRoutename = this.$route.name;
            self.items.forEach(n => {//切换路由时记住之前展开项
                    n.expand = true;
                    // n.active = true;
                n.children && n.children.map(m=>{
                    if(m.link == getRoutename){
                        m.active = true;
                        n.active = true;
                    }
                })
            })
        },
        data(){
            return {
                transitionName: 'fade'
            }
        },
        props:{
            items:{
                type:Array,
                default:function(){
                    return [];
                },
                twoway:true
            },
            text:{
                type:String,
                default:function(){
                    return "text";
                }
            },
            children:{
                type:String,
                default:function(){
                    return "children";
                }
            },
            link:{
                type:String,
                default:function(){
                    return "link";
                }
            },
            expanded:{
                type:String,
                default:function(){
                    return "expanded";
                }
            },
            level:{
                coerce:function(val){
                    return parseInt(val);
                },
                default:function(){
                    
                }
            }
        },
        methods:{
            toggle:function(index,item){
                var self = this;
                var isOpen = item.expand;
                if( item[self.children] && item[self.children].length>0 && !isOpen){
                    _.map(self.items,function(n){//切换路由时记住之前展开项
                        n.expand = false;
                    });
                    item.expand = true;
                }else{
                    item.expand = false;
                }
                localStorage.removeItem("activityId");
            }
        }
    };
</script>


<style>
    ul.page-sidebar-menu {
        background-color: #253238;
        list-style: none;
        margin: 0;
        padding: 0;
    }
    ul.page-sidebar-menu > li {
        display: block;
        margin: 0;
        padding: 0;
        border: 0px;
    }
    .bread-icon-style i{
        margin-right: 15px;
    }
    ul.page-sidebar-menu > li > a {
        color: #777777 !important;
    }
    ul.page-sidebar-menu > li > a {
        cursor: unset;
        display: block;
        position: relative;
        margin: 0;
        border: 0px;
        text-decoration: none;
        font-size: 13px;
        font-weight: 300;
    }
    ul.page-sidebar-menu > li a i {
        color: #fff;
    }
    ul.page-sidebar-menu > li > a i {
        font-size: 16px;
        text-shadow: none;
    }
    li [class^="fa-"], li [class*=" fa-"] {
        display: inline-block;
        width: 1.25em;
        text-align: center;
        font-size: 13px;   
    }
    ul.page-sidebar-menu > li > a .arrow:before, ul.page-sidebar-menu > li > a .arrow.open:before {
        color: #fff;
    }
    .page-sidebar ul > li > a > .arrow:before {
        float: right;
        margin-top: 1px;
        margin-right: 5px;
        display: inline;
        font-size: 16px;
        font-family: FontAwesome;
        height: auto;
        content: "\f104";
        font-weight: 300;
        text-shadow: none;
    }
    ul.page-sidebar-menu > li.active > a .arrow:before, ul.page-sidebar-menu > li.active > a .arrow.open:before {
        color: #253238 !important;
    }
    ul.page-sidebar-menu > li > a > .arrow.open:before {
        color: #fff !important;
    }
    ul.page-sidebar-menu > li > a .arrow:before, ul.page-sidebar-menu > li > a .arrow.open:before {
        color: #fff !important;
    }
    ul.page-sidebar-menu > li > a > .arrow.open:before {
        float: right;
        margin-top: 1px;
        margin-right: 3px;
        display: inline;
        font-family: FontAwesome;
        height: auto;
        font-size: 16px;
        content: "\f107";
        font-weight: 300;
        text-shadow: none;
    }
    a:hover{
        text-decoration:none;
    }
    ul.page-sidebar-menu > li > ul.sub-menu {
        list-style: none;
        clear: both;
        padding:0px;
    }
    ul.page-sidebar-menu > li > ul.sub-menu > li {
        background: none;
        margin: 0px;
        padding: 0px;
        margin-top: 1px !important;
    }
    ul.page-sidebar-menu > li > ul.sub-menu > li:first-child > a {
        border-top: 0px !important;
    }
    ul.page-sidebar-menu li > ul.sub-menu > li > a {
        color: #bdbdbd;
    }

    ul.page-sidebar-menu > li > ul.sub-menu > li > a {
        display: block;
        margin: 0px 0px 0px 0px;
        text-decoration: none;
        font-size: 13px;
        font-weight: 300;
        background: none;
    }
    ul.page-sidebar-menu > li > ul.sub-menu > li a i {
        padding-right: 16px;
    }

    ul.page-sidebar-menu > li > ul.sub-menu > li > a:hover {
        background: #575757;
    }
    ul.page-sidebar-menu{padding-top:4px;}
    ul.page-sidebar-menu > li > ul.sub-menu > li.active > a, ul.page-sidebar-menu > li > ul.sub-menu > li > a:hover {
        color: #fff !important;

        background: #2196f3 !important;
    }
    ul.page-sidebar-menu > li.active > a {
        background: #253238 !important;
        color: #ffffff;
    }
    ul.page-sidebar-menu > li.active > a {

        border: none;
        text-shadow: none;
    }
    ul.page-sidebar-menu > li.active > a .selected {
        display: block;
        width: 8px;
        height: 44px;
        background-image: url(/img/sidebar-menu-arrow.png);
        float: right;
        position: absolute;
        right: 0px;
        top: 8px;
    }
    ul.page-sidebar-menu > li.active > a i {
        color: #ffffff;
    }
    ul.page-sidebar-menu > li a i {
        color: #fff;
    }
    ul.page-sidebar-menu > li > a i {
        font-size: 16px;
        text-shadow: none;
    }
    ul.page-sidebar-menu > li > ul.sub-menu > li ul.sub-menu{
            padding-left: 0px;
    }
    ul.page-sidebar-menu > li > ul.sub-menu > li ul.sub-menu li {
        list-style:none;
        background: none;
        margin: 0px;
        padding: 0px;
        margin-top: 1px !important;
    }
    ul.page-sidebar-menu > li > ul.sub-menu > li ul.sub-menu li.active {
        background: #575757;
    }
    ul.page-sidebar-menu > li > ul.sub-menu li > ul.sub-menu > li > a {
        display: block;
        margin: 0px 0px 0px 0px;
        padding: 5px 0px;
        text-decoration: none;
        font-size: 14px;
        font-weight: 300;
        background: none;
    }
    ul.page-sidebar-menu > li > ul.sub-menu li > ul.sub-menu > li > i {
        padding-right: 16px;
    }
    ul.page-sidebar-menu > li > ul.sub-menu > li > ul.sub-menu > li > a {
        padding-left: 80px;
    }
    ul.page-sidebar-menu li > ul.sub-menu > li > a {
        color: #bdbdbd;
    }
    ul.page-sidebar-menu > li > ul.sub-menu li > a > .arrow:before {
        float: right;
        margin-top: 1px;
        margin-right: 20px;
        display: inline;
        font-size: 16px;
        font-family: FontAwesome;
        height: auto;
        content: "\f104";
        font-weight: 300;
        text-shadow: none;
    }
    ul.page-sidebar-menu > li > ul.sub-menu li > a > .arrow.open:before {
        float: right;
        margin-top: 1px;
        margin-right: 18px;
        display: inline;
        font-family: FontAwesome;
        height: auto;
        font-size: 16px;
        content: "\f107";
        font-weight: 300;
        text-shadow: none;
    }
    .bounce-transition {
      display: block!important; /* 否则 scale 动画不起作用 */
    }
    .bounce-enter {
      animation: bounce-in .3s;
    }
    .bounce-leave {
      animation: bounce-out .3s;
    }
    @keyframes bounce-in {
      /*0% {
        transform: scale(0.95);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }*/
    }
    @keyframes bounce-out {
     /* 0% {
        transform: scale(1);
      }
      50% {
        transform: scale(0.5);
      }
      100% {
        transform: scale(0);
      }*/
    }
</style>