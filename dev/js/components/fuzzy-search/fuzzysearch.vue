<template>
    <div class="fuzzy_wrapper col" :class="{'pr-10': offset}">
        <input type="text" class="input full"
                v-model="keywords"
                @keyup.enter="confirmKeyWord" 
                :disabled="disabled"
                :placeholder="placeholder"
                :value="defaultval">
        <a class="icon search_icon" :class="{'search_icon_pr10': offset}" @click="confirmKeyWord" v-if="!disabled">&#xe617;</a>
        <div class="control-group fuzzy_box" :class="{'pr-10': offset}" v-show="resultShow">
            <!-- 若为label/name之外的情况，请自行复制<span> 勿直接在已有列表上修改 -->
            <ul class="result_list">
                <li v-for="item in fuzzydata" @click="selectItem($event)" v-if="fuzzydata.length >= 1"
                    :data-key="item.key" :data-code="item.code" :data-id="item.id">
                    <span v-if="datalabel == 'label'">{{item.label}}</span>
                    <span v-if="datalabel == 'name'">{{item.name}}</span>
                </li>
                <li v-else>当前无搜索结果</li>
            </ul>
        </div>
    </div>
</template>

<script>
    /*
    ** @param disabled [是否禁用搜索框]
    ** @param callback [回调函数 用于调接口]
    ** @param placeholder [placeholder]
    ** @param defaultval [默认填充值] [sync]
    ** @param resultcode [标识字段 提交后台时可用 默认为空] [sync]
    ** @param offset [是否含有pr-10这个class]
    ** @param fuzzydata [搜索结果集] [sync]
    ** @param datalabel [显示名称的字段 默认值label]
    **
    ** <fuzzy-search :disabled="false" :callback="getList" :placeholder="'搜索...'" 
    **      :value.sync="fuzzy.value" :resultcode="'code'" :offset="false"
    **      :fuzzydata.sync="dataList" :datalabel="'name'">
    ** </fuzzy-search>
    */
    export default {
        props: {
            disabled: {type: Boolean, default: false},  
            callback: {},                       
            placeholder: {type: String, default: '输入关键字按空格或点击搜索按钮搜索,多个关键字以空格分隔'},    
            defaultval: {type: String},  
            resultcode: {type: String}, 
            resultval: {type: String},      
            offset: {type: Boolean, default: true},  
            fuzzydata: {type: Array},
            datalabel: {type: String, default: 'label'}
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
                keywords: ''
            }
        },
        methods: {
            confirmKeyWord(){
                this.resultShow = true
                this.callback(this.keywords)
            },
            selectItem(event){
                var self = this
                var e = window.event || event
                this.resultShow = false
                this.defaultval = e.target.innerText
                // switch(self.resultcode){
                    // case 'code':
                        self.resultval = e.target.getAttribute('data-key')
                        console.info(e.target.getAttribute('data-key'))
                // }
            }
        },
        watch: {
            'keywords': function(newVal,oldVal){
                this.defaultval = newVal
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
        top: 1px;
        right: 1px;
        font-size: 16px;
        color: #444;
        background: #fcfcfc;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        padding: 8px 8px 8px 10px;
    }
    .search_icon_pr10 {
        right: 11px;
    }
    .search_icon:hover {
        background: #f6f6f6;
    }
    .search_icon:active {
        background: #e8e8e8;
    }
    

    .fuzzy_box {
        position: absolute;
        top: 33px;
        left: 0;
    }
    ul.result_list {
        max-height: 250px;
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #00bcd4;
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
