<template>
  <div id="app">
  	<left></left>
  	<div class="main">
  	  <router-view></router-view>
  	</div>
  </div>
</template>

<script>
import left from '@/components/common/left'
export default {
  name: 'App',
  components:{
	left
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
.main{
	width:95%;
	float:left;
	height:100%;
	background-color:#f5f5f5
}
</style>
