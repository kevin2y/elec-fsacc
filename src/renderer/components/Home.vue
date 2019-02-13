<template>  
  <div class="mainbody">  
   
    <div style="font-weight:bold;width:800px">当前企业</div>
    <div class="HitShow" >
        <div style="float:left;width:400px; height:180px;">   
            <span title="请点击选择一家企业" id='lblCorpName'>{{form.FullName}}</span><br />
            <span title="企业名" id='lblLimitName'>简称：{{form.LimitName}}</span><br />
            <span id='lblCorpPhone'>电话：{{form.Phone}}</span><br />
            <span id='lblCorpLastPeriod'>结转：{{form.LastPeriod}}</span><br/>
            <span>数据：{{form.id}}</span>
        </div>
        <div style=" display:none; float:left;  width:120px;  height:50px;">
            <a style="width:100px;"  href="javascript:openNull(-1);" title="暂无帮助信息">修改信息</a>
        </div>
        <div style="float:right; margin-left:20px;  height:80px; width:240px;">
            <a style="width:200px;"  href="#/bankday" title="点击打开出纳日记帐">出纳日记帐</a><br/>           
            <a style="width:200px;"  href="#/stockdetail" title="数量金额明细分类帐">数量金额明细分类帐</a><br/>
            <a style="width:200px;"  href="javascript:goCorpAction('InputAccounting');" title="录入记帐凭证">录入记帐凭证</a> <br/>
            <a style="width:200px;"  href="javascript:goCorpAction('SalesBill');" title="录入查看销售单">销售单</a><br/>     
            <a style="width:200px;"  href="javascript:cancelLastFinishPeriod();" title="取消上期结转">取消上期结转</a> <br/> 
        </div>
    </div>
    <div style="font-weight:bold;width:800px">所有企业</div>
    <div class="HitShow" id='crp001'>
        <ul style="height:180px;">
            <li v-for="corp in allCorps" class="cp">
                <a href="#" @click="setCurCorp(corp)" :title="corp.FullName ">{{corp.LimitName}}</a>
            </li>
        </ul>

    </div>
    <div class="HitShow" id='crp002'>
        <a href="javascript:window.external.SyncCorpDbSchema();" class="cp1"  title="同步所有企业数据表结构">同步结构</a>
        <a href="javascript:window.external.ShowNewCorpForm();" class="cp1"  title="添加企业">添加企业</a>
        <a href="javascript:window.external.ShowPeriodFinishForm();" class="cp1"  title="全部结转">科目结转</a>
        <a href="javascript:window.external.BackupData();" class="cp1" title="备份">备份</a>
        <a href="javascript:openNull(1);" class="cp1" style="display:none"  title="建设中...">科目维护</a>
    </div>
    <div id="divSubTitle" class="methodShow" onmousemove="setShowing(true);" onmouseout="closeTip();"  >


    </div>
    <el-dialog title="企业信息" :visible.sync="dialogFormVisible" width="450px" @open="customerDialogOpen" >
        <el-form :model="editCorp" v-enterToNext:lastTo="submitBtn">
            <el-form-item label="简称" label-width="60px">
            <el-input v-model="editCorp.LimitName" autocomplete="off" ref="customerInput"></el-input>
            </el-form-item>
            <el-form-item label="全称" label-width="60px">
            <el-input v-model="editCorp.FullName" autocomplete="off"></el-input>
            </el-form-item><el-form-item label="联系人" label-width="60px">
            <el-input v-model="editCorp.Contact" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="电话" label-width="60px">
            <el-input v-model="editCorp.Phone" autocomplete="off"></el-input>
            </el-form-item>  
        </el-form>
        <div slot="footer" class="dialog-footer">            
            <el-button type="primary" @click="saveCorp" ref="submitButton">确 定</el-button>
            <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
    </el-dialog>    
  </div>    
</template>  
  
<script>  
 import Corps from "../SysDb";
 import { mapState, mapActions } from "vuex";

export default {  
  name: 'home',  
  created: function() {
     
    //   let su = this.$refs.submitButton.$el;
    //   console.log("Home init..." + su)
      let curApi = this.$parent.currView;      
      curApi.newEdit = ()=>{
          //this.submitButton = "submitButton";
          this.form = {
            LimitName: '',
            FullName: '',
            Phone: '',
            Contact: '',
            LastPeriod:''
            }
          this.dialogFormVisible = true;
      }
      curApi.edit=()=>{
          if(!this.form.id){
            alert('请选择一个企业.');
          }else{
            this.editCorp = JSON.parse(JSON.stringify(this.form)); 
            this.dialogFormVisible = true;
        }
          
      }
  },
  data () {  
    return {  
        allCorps:[],
        LimitName:"",
        CorpPhone:"",
        CorpLastPeriod:"",
        submitBtn:"submitButton",
        submitTestBtn:"testSubmitButton",        
        testFormVisible:false,
        dialogFormVisible: false,
        form: {},
        editCorp:{},
     
    }  
  },
  computed:{
      curCorp:function(){
          return this.$store.state.Corp.CurCorp;
      },
      allCorps1:function(){        
          return this.$store.state.Corp.AllCorps;
      }     
  },
  mounted(){
      //console.log("mounted...");
      //this.$store.dispatch("getAllCorps");
      this.showAllCorps();      
  },
 methods:{
       handleClick:function(btnAct,btnTarget) {
         var str = JSON.stringify(this.allCorps);
         alert(btnAct + "--" + str);         
       },
       setCurCorp:function(corp){
         //let clCorp = clone(corp);
         let clCorp = JSON.parse(JSON.stringify(corp)); 
         this.$store.dispatch("setCurCorp",clCorp);
         this.form = corp;
       },
       customerDialogOpen() {
         //  console.log(this);
        //this.customerVisible = true        
        this.$nextTick(function () {
          this.$refs.customerInput.$el.querySelector('input').focus();
        });
      },
      saveCorp(){          
          let vueHome = this;
          //const Corps = require("../SysDb");
          Corps.saveCorp(this.editCorp,(err,idObj)=>{
            if(err){
                alert(err);
            }else{
                //this.$store.dispatch("getAllCorps");
                //console.log(idObj);
                if(idObj&& idObj.length>0)
                    this.editCorp.id=idObj[0].newid;
                this.setCurCorp(this.editCorp);
                alert("保存成功");                
                this.dialogFormVisible = false;
                this.showAllCorps();
            }
          });
      },
      showAllCorps(){
          Corps.getAllCorps((err,dbReturn)=>{
            if(err){
              alert("getAllCorps err" + err);
            }else{
              //console.log(dbReturn);
              //this.$store.dispatch("setAllCorps",dbReturn);
              this.allCorps = dbReturn;
              if(this.$store.state.Corp.CurCorp){
                let lastCorp = this.allCorps.filter(v => v.id === this.$store.state.Corp.CurCorp.id);
                if(lastCorp && lastCorp.length>0)
                  this.form = lastCorp[0];
              }
            }
        });
      }
       
     }      
  
}  
</script>  
  
<!-- Add "scoped" attribute to limit CSS to this component only -->  
<style scoped>  
.cp
{
	width:180px; margin-right:10px;
}
.cp1
{
	width:340px;
}
 .mainbody { 
background-color: rgb(246, 245, 242);
background-repeat: repeat-x;
color: rgb(72, 72, 72);
cursor: default;
font-family: "Arial", "宋体";
font-size: 20px;
font-style: normal;
font-variant: normal;
font-weight: 400;
line-height: 30px;
_height:200px; 
min-height:600px;
padding:10px;
 }
 .HitShow { 
background-attachment: scroll;
background-color: rgb(255, 255, 255);
background-image: none;
border-bottom-color: rgb(210, 210, 210);
border-bottom-style: solid;
border-bottom-width: 1px;
border-left-color: rgb(210, 210, 210);
border-left-style: solid;
border-left-width: 1px;
border-right-color: rgb(210, 210, 210);
border-right-style: solid;
border-right-width: 1px;
border-top-color: rgb(210, 210, 210);
border-top-style: solid;
border-top-width: 1px;
margin-bottom: 20px;
margin-left: auto;
margin-right: auto;
margin-top: 0px;
padding:10px;
width: 800px;
float: left;
}
</style>
