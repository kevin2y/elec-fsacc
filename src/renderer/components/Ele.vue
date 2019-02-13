<template>  
  <div class="hello">  
    <h1>{{ msg }}</h1>  
    <h2>Essential Links</h2>  
    <el-button>默认按钮</el-button>  
    <el-button type="primary">主要按钮</el-button>  
    <el-button type="text">文字按钮</el-button>  
    <router-link to="/landing">原默认页面</router-link>
  </div>  
</template>  
  
<script>  
export default {  
  name: 'hello',  
  data () {  
    return {  
      msg: 'Welcome to Your Vue.js App'  
    }  
  }  
}  
</script>  
  
<!-- Add "scoped" attribute to limit CSS to this component only -->  
<style scoped>  
h1, h2 {  
  font-weight: normal;  
}  
  
ul {  
  list-style-type: none;  
  padding: 0;  
}  
  
li {  
  display: inline-block;  
  margin: 0 10px;  
}  
  
a {  
  color: #42b983;  
}  
</style> 
