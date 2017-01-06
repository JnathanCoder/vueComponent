<template>
	<div class="row author-mian-content">
		<open-side></open-side>
		<div class="main-content contrl-height-min">
			<div class="row main-content">
				<div class="row col-top outer-content" style="height: 500px;">
					<div class="form-box-center form-box-center-spec">
						<div class="control-group mb-30 mt-30">
							<label class="label col w-140">收单方</label>
							<div class="col pr-10">
							    <select class="input full">
							        <option>1</option>
							        <option>1</option>
							        <option>1</option>
							    </select>
							</div>
						</div>

						<div class="control-group mb-30">
							<label class="label col w-140">门店名称</label>
							<fuzzy-search :defaultval.sync="fuzzy.defaultval" :resultcode.sync="fuzzy.resultattr" :resultval.sync="resultVal"
									:fuzzydata.sync="fuzzy.dataList" :callback="getList"></fuzzy-search>
						</div>
	{{fuzzy.defaultval}}--{{fuzzy.resultVal}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		ready(){

		},
		data(){
			return {
				fuzzy: {
					resultattr: 'code',//需要获取所选中全称的属性
					resultVal: '',//需要获取所选中全称的属性值
					defaultval: '', //全称
					dataList: []
				}
			}
		},
		methods: {
			getList(keywords){
				var self = this
				this.$http({
                    url: 'v1/backend/vague/merchant',
                    method: 'POST',
                    data: {
                    	name: keywords
                    }
                }).then(function(res){
                	self.fuzzy.dataList = res.data.dataList
                    
                },function(err){
                    console.log('error')
                })
			}
		}
	}
</script>