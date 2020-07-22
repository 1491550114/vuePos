<template>
	<div class="mangae">
		<el-row>
			<el-col :span="7" class="man-left" id="manH">
				<el-tabs class="m-title">
					<el-tab-pane label="点餐">
						<div class="chooseEat">
							<el-table border :data="tableData">
								<el-table-column label="商品名称" prop="goodsName"></el-table-column>
								<el-table-column label="数量" prop="count"></el-table-column>
								<el-table-column label="金额" prop="price"></el-table-column>
								<el-table-column label="操作" fixed="right">
									<template slot-scope="scope">
										<el-button type="text" size="small" @click="delSingleGoods(scope.row)">删除</el-button>
										<el-button type="text" size="small"  @click="addOrderlist(scope.row)">添加</el-button>
									</template>
								</el-table-column>
							</el-table>
							<div class="totalCom">
								<small>数量：</small> {{ totalCount }}  &nbsp;&nbsp;&nbsp;&nbsp; <small>金额：</small> {{ totalMoney }}元
							</div>
							<div class="el-btn">
								<el-button type="warning">挂单</el-button>
								<el-button type="danger" @click="delAllGoods">删除</el-button>
								<el-button type="success" @click="chekout">结账</el-button>
							</div>
						</div>
					</el-tab-pane>
					<el-tab-pane label="挂单">挂单</el-tab-pane>
					<el-tab-pane label="外卖">外卖</el-tab-pane>
				</el-tabs>
			</el-col>
			<el-col :span="17">
				<div class="goods-title">
					常用商品
				</div>
				<div class="oftenGoods">
					<ul>
						<li v-for="goods in oftenGoods" @click="addOrderlist(goods)">
							<span>{{goods.goodsName}}</span>
							<span class='price'>￥{{ goods.price }}元</span>
						</li>
					</ul>
				</div>
				<div class="eatGoods">
					<el-tabs>
						<el-tab-pane label="汉堡">
							<ul>
								<li v-for="goods in type0Goods"  @click="addOrderlist(goods)">
									<span class="img"><img :src="goods.goodsImg" alt="" width="100%" /></span>
									<span class="o-name">{{ goods.goodsName}}</span>
									<span>￥{{ goods.price }}元</span>
								</li>
							</ul>
						</el-tab-pane>
						<el-tab-pane label="小食">
							<ul>
								<li v-for="goods in type1Goods"  @click="addOrderlist(goods)">
									<span class="img"><img :src="goods.goodsImg" alt="" width="100%" /></span>
									<span class="o-name">{{ goods.goodsName}}</span>
									<span>￥{{ goods.price }}元</span>
								</li>
							</ul>
						</el-tab-pane>
						<el-tab-pane label="饮料">
							<ul>
								<li v-for="goods in type2Goods"  @click="addOrderlist(goods)">
									<span class="img"><img :src="goods.goodsImg" alt="" width="100%" /></span>
									<span class="o-name">{{ goods.goodsName}}</span>
									<span>￥{{ goods.price }}元</span>
								</li>
							</ul>
						</el-tab-pane>
						<el-tab-pane label="套餐">
							<ul>
								<li v-for="goods in type3Goods"  @click="addOrderlist(goods)">
									<span class="img"><img :src="goods.goodsImg" alt="" width="100%" /></span>
									<span class="o-name">{{ goods.goodsName}}</span>
									<span>￥{{ goods.price }}元</span>
								</li>
							</ul>
						</el-tab-pane>
						
					</el-tabs>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import axios from 'axios'
export default {
	data(){
		return {
		    tableData: [],
	        oftenGoods:[],
	        type0Goods:[],
	        type1Goods:[],
	        type2Goods:[],
	        type3Goods:[],
	        totalMoney:0,
	        totalCount:0
		}
	},
	mounted:function(){
		var manH = document.body.clientHeight;
		console.log(manH)
		var obj = document.getElementById('manH');
		obj.style.height=manH+'px';
	},
	created:function(){
		//常用商品
		axios.get('http://jspang.com/DemoApi/oftenGoods.php')
		.then(res =>{
			console.log(res.data)
			this.oftenGoods = res.data
		}).catch(error => {
			this.$message.error("网络异常")
		})
		//小食分类
		axios.get('http://jspang.com/DemoApi/typeGoods.php')
		.then(res =>{
			console.log(res.data)
			this.type0Goods = res.data[0]
			this.type1Goods = res.data[1]
			this.type2Goods = res.data[2]
			this.type3Goods = res.data[3]
			
		}).catch(error => {
			this.$message.error("网络异常")
		})
	},
	methods:{
		//添加商品
		addOrderlist(goods){
//		  this.totalMoney = 0
//		  this.totalCount = 0;
		  //判断是否有商品
		  let isHave = false;
		  for(var i=0;i<this.tableData.length;i++){
		  	if(this.tableData[i].goodsId === goods.goodsId){
		  		isHave = true;
		  	}
		  }
		  if(isHave){
		  	 var arr = this.tableData.filter(ele => ele.goodsId == goods.goodsId)
		  	 arr[0].count++;
		  	 console.log(arr)
		  }else{
		  	var obj={goodsId:goods.goodsId,goodsName:goods.goodsName,price:goods.price,count:1}
		  	this.tableData.push(obj)
		  }
		  this.getMoney()
		},
		getMoney(){
			this.totalMoney = 0
		    this.totalCount = 0;
			if(this.tableData){
				this.tableData.forEach(ele => {
			  	 this.totalMoney  = this.totalMoney+(ele.price*ele.count);
			  	 this.totalCount+=ele.count;
			    })
			}
		},
		//删除单个商品
		delSingleGoods(goods){
			this.tableData = this.tableData.filter(function(ele){
			   return  ele.goodsId != goods.goodsId;
			});
			this.getMoney();
			
		},
		//删除全部商品
		delAllGoods(){
			this.tableData=[];
			this.totalMoney = 0;
			this.totalCount = 0;
		},
		//结账
		chekout(){
			if(this.totalCount != 0){
			    this.delAllGoods();
				this.$message({
					type:'success',
					message:"恭喜您，结账成功！！！"
				})
		    }else{
		    	this.$message.error("老板着急了")
		    }
		}
	}
}
</script>

<style lang="less" scoped>
   .man-left{
   	border-right:1px solid #ccc;
   	height:100%;
   	background-color:#fff;
   }
   .totalCom{
   	  padding:10px;
   	  text-align:center;
   	  border-bottom:1px solid #ccc;
   	  margin-bottom:10px;
   }
   .el-btn{text-align:center;}
   .goods-title{
   	 padding:10px;
   	 background-color:#fff;
   	 border-bottom:1px solid #ccc;
   	 /*width:100%;*/
   }
   .oftenGoods{
   	 padding:10px;
   	 li{
   	 	width:23%;
   	 	padding:10px 0;
   	 	float:left;
   	 	/*height:30px;
   	 	line-height:30px;*/
   	 	text-align:center;
   	 	margin-right:10px;
   	 	margin-bottom:10px;
   	 	background-color:#fff;
   	 	cursor:pointer;
   	 	.price{
   	 		color:blue
   	 	}
   	 }
   }
   .o-name{color:red}
   .eatGoods{
   	  clear:both;
      li{
      	width:20%;
      	float:left;
      	background:#fff;
      	margin:10px 0 10px 20px;
      	cursor:pointer;
      	.img{
      		width:30%;
      		float:left;
      		padding-right:10px;
      		
      	}
      	span{
      		display:block
      	}
      	span:nth-child(2),span:nth-child(3){
      		padding-top:5px;
      	}
      }
   }
</style>