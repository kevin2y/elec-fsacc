<template>  
  <div class="mainbody">  
   数量明细帐   
  </div>    
</template>  
  
<script>  
 import Corps from "../SysDb";
 import { mapState, mapActions } from "vuex"
export default {  
  name: 'stockdetail',  
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
        form: {
          LimitName: '',
          FullName: '',
          Phone: '',
          Contact: '',
          LastPeriod:''
        },
     
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
          Corps.saveCorp(this.form,(err,idObj)=>{
            if(err){
                alert(err);
            }else{
                //this.$store.dispatch("getAllCorps");
                //console.log(idObj);
                if(idObj&& idObj.length>0)
                    this.form.id=idObj[0].newid;
                
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
