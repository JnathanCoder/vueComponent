<template>
    <div class="fuzzy_wrapper col pr-10">
        <input type="text" class="input full" 
                @keyup.enter="confirmKeyWord" 
                :placeholder="placeholder"
                :value="value">
        <a href="javacript:;" class="icon search_icon" @click="confirmKeyWord">&#xe617;</a>
        <div class="control-group fuzzy_box" v-show="resultShow">
            <ul style="" class="result_list">
                <li v-for="item in resultList" @click="selectItem($event)">{{item.name}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            disabled: {type: Boolean, default: false},  /*是否禁用搜索框*/
            searchIcon: {type: Boolean, default: true},  /*是否需要搜索按钮*/
            callback: {},                       /*回调函数*/
            placeholder: {type: String},    
            value: {type: String},          /*默认值*/
            fuzzyurl: {type: String},
            
            fuzzydata: {type: Object},
          
        },
        ready() {
            document.addEventListener('click', (e) => {
                if (this.$el && !this.$el.contains(e.target)) {
                    this.resultShow = false
                }
            }, false);
        },
        data() {
            return {
                resultShow: false,
                resultList: []
            }
        },
        methods: {
            confirmKeyWord(){
                var self = this

                this.resultShow = true


                // this.$http({
                //     url: self.fuzzyurl,
                //     method: self.fuzzymethod ? self.fuzzymethod : 'POST',
                //     data: self.fuzzydata
                // }).then(function(res){

                    
                // },function(err){
                //     console.log('error')
                // })
            },
            selectItem(event){
                var e = window.event || event
                this.resultShow = false
                this.value = e.target.innerHTML
            }
        }
    }
</script>

<style scoped>
    .fuzzy_wrapper {
        position: relative;
    }
    .search_icon {
        position: absolute;
        z-index: 99;
        top: 9px;
        right: 6px;
        font-size: 16px;
        color: #444;
    }
    .search_icon:hover {
        color: #00bcd4;
    }

    .fuzzy_box {
        position: absolute;
        top: 34px;
        left: 0;
        width: 100%;
    }
    ul.result_list {
        max-height: 250px;
        box-sizing: border-box;
        border: 1px solid #00bcd4;
        border-top: none;
        border-radius: 3px;
        overflow-y: scroll;
    }
    ul.result_list li {
        background: #fff;
        cursor: pointer;
        height: 25px;
        line-height: 25px;
        padding-left: 10px;
    }
    ul.result_list li:hover {
        color: #fff;
        background: #00bcd4;
    }
</style>
