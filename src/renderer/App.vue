<template>
  <div id="app">   
    
     <ul :style=toolStyle>
       <li v-for="btn in toolButtons">
         <img class="toolItem" :src="btn.Image" :style="btn.Style" @click="handleClick(btn.Act,btn.Target)" >
       </li>
       <li style="margin:6px;">
     <el-select v-model="selectedMonth" placeholder="请选择记帐月份" size="mini">
      <el-option label="2018-01" value="shanghai"></el-option>
      <el-option label="2018-02" value="beijing"></el-option>
      <el-option label="2018-02" value="beijing"></el-option>
      <el-option label="2018-02" value="beijing"></el-option>
      <el-option label="2018-02" value="beijing"></el-option>
      <el-option label="2018-02" value="beijing"></el-option>
    </el-select>
     </li>
     </ul>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'fsaccount',   
    data() {
        return {          
           selectedMonth:'',
            toolStyle: {
              backgroundImage: "url(" + require("./assets/ToolBG.jpg") + ")",
              height:"38px",              
            },
            toolButtons:[
              {Image:require("./assets/home.png"),Act:"Url",Target:"/"},
              {Image:require("./assets/plus.png"),Act:"Func",Target:"newEdit"},
              {Image:require("./assets/proper.png"),Act:"Func",Target:"edit"},
              {Image:require("./assets/erase.png"),Act:"Func",Target:"delete",Style:"margin-top:9px;margin-left: 7px;"},
              {Image:require("./assets/redo.png"),Act:"Url",Target:"test"},
              {Image:require("./assets/print2.png"),Act:"Func",Target:"print",Style:"margin-top:7px;margin-left: 6px;"},
              {Image:require("./assets/exit.png"),Act:"Func",Target:"Exit"},
            ]
        }
     },
     computed:{
       currView:function(){         
            //const ctlView = require("./ctlView");
            let result = function(){};
            result.newEdit = ()=>{
              console.log('App click computed.');
            }
            // result.print=()=>{};
            return result;
      }
     },
     methods:{
       handleClick:function(btnAct,btnTarget) {
          switch(btnAct){
            case "Url":
              if(btnTarget=="/")
                this.$router.replace({path:btnTarget});
              else
                this.$router.push({path:btnTarget});
              break;
            case "Func":
              let fcur = "this.currView." + btnTarget + "()";
              eval(fcur);              
              break;
          } 
          // this.currView.newEdit = ()=>{
          //   alert('app click at handleClick');
          // }        
       }
     }
  }
</script>

<style>
.toolItem{
margin-top:5px;
margin-left: 7px;
}
ul
{
    list-style:none; /* 去掉ul前面的符号 */
    margin: 0px; /* 与外界元素的距离为0 */
    padding: 0px; /* 与内部元素的距离为0 */
    width: auto; /* 宽度根据元素内容调整 */
}
/* 所有ul中的li样式 */
ul li
{
    float:left; /* 向左漂移，将竖排变为横排 */
}
  /* CSS */
</style>
