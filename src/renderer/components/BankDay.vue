<template>
<div>
    
    <el-container style="width: 100%;height: 100%; border: 1px solid #eee">

      <el-main>
        <h2>现金日记帐</h2>
        <el-table :data="bankData" height="400" style="width: 100%;" highlight-current-row :header-cell-style="headCellStyle" :row-style="rowStyle" @current-change="handleCurrentChange">
    <el-table-column prop="NoteDate" label="日期" width="150" height="40"></el-table-column>
    <el-table-column prop="BillNo" label="凭证" width="100"></el-table-column>
    <el-table-column prop="Desc" label="摘要" width="100"></el-table-column>
    <el-table-column label="现金" style="panding:0px;">
      <el-table-column prop="MoneyIn" label="借方" width="120" align="right">
        <template slot-scope="scope">
          <span>{{scope.row.MoneyIn |moneySum("+")| rounding}}</span>
        </template>  
      </el-table-column>
      <el-table-column prop="MoneyOut" label="贷方" width="120" align="right">
        <template slot-scope="scope">
          <span>{{scope.row.MoneyOut |moneySum("-")| rounding}}</span>
        </template>  
      </el-table-column>
      <el-table-column prop="MoneyBalance" label="余额" width="120" align="right">
        <template slot-scope="scope">
          <span>{{scope.row.MoneyBalance|moneySum| rounding(true)}}</span>
        </template>  
      </el-table-column>      
    </el-table-column>
    <el-table-column label="银行存款" style="panding:0px;">
      <el-table-column prop="BankIn" label="借方" width="120" align="right">
        <template slot-scope="scope">
          <span>{{scope.row.BankIn |bankSum("+")| rounding}}</span>
        </template>  
      </el-table-column>
      <el-table-column prop="BankOut" label="贷方" width="120" align="right">
        <template slot-scope="scope">
          <span>{{scope.row.BankOut |bankSum("-")| rounding}}</span>
        </template>  
      </el-table-column>
      <el-table-column prop="BankBalance" label="余额" width="120" align="right">
        <template slot-scope="scope">
          <span>{{scope.row.BankBalance | bankSum|rounding(true)}}</span>
        </template>  
      </el-table-column>      
    </el-table-column>
  </el-table>
      </el-main>
      <el-footer style="height:150px;">
        <el-form v-enterToNext:lastFunc="saveBankDay">
        <el-row :gutter="24">
          <el-col :span="6"><div>日期：<el-date-picker v-model="editBank.NoteDate" @blur="nextFocus('afterPickDate')" ref="firstInput" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
    </el-date-picker></div></el-col>    
          <el-col :span="3"><div>凭证：<el-input placeholder="请输入凭证号" ref="afterPickDate" v-model="editBank.BillNo">  </el-input></div></el-col>
          <el-col :span="12"><div>摘要：<el-input  placeholder="请输入摘要"        v-model="editBank.Desc">  </el-input></div></el-col>
          <el-col :span="3"><div>方向：<el-input    placeholder="方向"        v-model="inputType">  </el-input></div> </el-col>
          </el-row>
          <el-row :gutter="24">
            <el-col :span="8" :offset="9"> 金额：<el-input    placeholder="请输入金额"  @keydown.native="inputLimit" v-model="inputVal">  </el-input></el-col>
          </el-row>
        </el-form>
      </el-footer>
    </el-container>
  
  </div>
</template>

<script>
import Corps from "../SysDb";
import CorpDb from "../CorpDb";
import inputVue from 'element-ui/packages/input/src/input.vue';
let moneyTotal = 0.0;
let bankTotal = 0.0;
  export default {
    created: function() {
      this.newBankDay();
      
      //console.log("created NoteDate type " + this.editBank.NoteDate instanceof Date ? "is date":"not a date" );
      //console.log("created NoteDate type "+ (this.editBank.NoteDate instanceof Date?"is date":"not a date"));
      this.corpDb = null;      
      if(this.$store.state.Corp.CurCorp.id){
        this.corpDb = Corps.initCorpDb(this.$store.state.Corp.CurCorp.id);
        this.corpDb.selectAll("bankDay",(err,data)=>{
          if(err){
              alert("getAllbankDay err" + err);
            }else{              
              this.bankData = data;              
          }
        });
      }
    },
    beforeDestroy:function(){
      this.corpDb.closeDb();
      this.corpDb = null;
      //Console.log("corp db is closed.");//beforeDestroy不能使用Console
    },
    beforeUpdate:function(){
      console.log("beforeUpdate...");
      moneyTotal = 0.0;
      bankTotal = 0.0;
    },
    beforeMount:function(){
      console.log("beforeMount...");
    },
    beforeCreate:function(){
      console.log("beforeCreate...");
    },
    data() {
      return {
        moneyTotal:0.0,
        bankTotal:0.0,
        editBank:{},
        inputType:"1",
        inputVal:"",
        currentRow:null,
        bankData: []
      }
    },
    methods: {
        rowStyle({ row, rowIndex}) {
            if (rowIndex >= 0) {
                return 'height:30px;'
            } else {
                return 'height:30px'
            }
        },
        headCellStyle({ row, column, rowIndex, columnIndex }){
          return "padding:0px;text-align:center";
        },
        handleCurrentChange(val) {
          moneyTotal = 0.0;
          bankTotal = 0.0;
          this.currentRow = val;
        },
        inputLimit(e) {
          let num = e.target.value || ''
          let code = e.which || e.keyCode
          let str = (e.key && e.key != 'Unidentified') ? e.key : num.substr(num.length - 1)
          console.log('|type:' + e.type + '|code:' + code + '|str:' + str + '|value:' + num)
          //无论任何情况，皆可执行
          if(code == '8') {
            return true
          }
          //没有满足任何一种情况，中断执行
          if(!(/[\d.]/.test(str) || code == '190')) {
            e.returnValue = false
            return false
          }
          if(num.length > 12 ||
            (num.indexOf('.') >= 0 && code == '190') ||
            ((num.indexOf('.') == num.length - 3) && num.length > 3) ||
            (num.length == 0 && code == '190')) {
            e.returnValue = false
            return false
          }
          return true
      
        },
        focusFirstInput(){
          this.$refs.firstInput.$el.querySelector('input').focus();
        },
        customerDialogOpen() {
          //  console.log(this);
          //this.customerVisible = true        
          this.$nextTick(function () {
            this.focusFirstInput();
          });
        },
        nextFocus(refName){
          console.log("nextFocus..." + refName);
          let el = this.$refs[refName].$el;
          let ctl = el.querySelector('input');
          console.log(ctl);
          ctl.focus(); //最后一个input，焦点跳转到表单最后控件  
        },
        showLog(){
            console.log("log....");
        },
        sortData(){
          this.bankData.sort((a,b)=>{
            let oneDay = Corps.ConvertStrToDate(a.NoteDate);
            let othDay = Corps.ConvertStrToDate(b.NoteDate);
            return oneDay - othDay;
          });
        },
        newBankDay(){
          this.editBank = {
            NoteDate:"",
            BillNo:"",
            Desc:"",
            MoneyIn:0.0,
            MoneyOut:0.0,
            MoneyBalance:0.0,
            BankIn:0.0,
            BankOut:0.0,
            BankBalance:0.0
          };

          var arr = Object.keys(this.editBank);
          console.log(arr);
        },
        saveBankDay(){
          let vueHome = this;        
          if(!this.corpDb){
            alert("请返回首页选择一个企业");
            return;
          }
          switch(this.inputType){
            case "1":
              this.editBank.MoneyIn = parseFloat(this.inputVal);
              break;
            case "2":
              this.editBank.MoneyOut = parseFloat(this.inputVal);
              break;
            case "11":
              this.editBank.BankIn = parseFloat(this.inputVal);
              break;
            case "12":
              this.editBank.BankOut = parseFloat(this.inputVal);
              break;
          }
          this.corpDb.saveBank(this.editBank,(err,idObj)=>{
            if(err){
                alert(err);
            }else{
              if(idObj&& idObj.length>0)
                this.editBank.id=idObj[0].newid;                
              this.bankData.push(this.editBank);
              this.sortData();
              this.newBankDay();
            }
            this.focusFirstInput();
          });
        }
    },
    filters: {      
      moneySum(value,act){
        switch(act){
          case "+":
            moneyTotal += value;
            return value;       
          case "-":
            moneyTotal -= value;
            return value;       
        }
        return moneyTotal;         
      },      
      bankSum(value,act){
        switch(act){
          case "+":
            bankTotal += value;
            return value;       
          case "-":
            bankTotal -= value;
            return value;       
        }
        return bankTotal;
      }
  }
}
</script>