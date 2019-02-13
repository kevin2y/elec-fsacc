<template>
<div>
    <h2>现金日记帐</h2>
  <el-table :data="tableData3" style="width: 100%;" highlight-current-row :header-cell-style="headCellStyle" :row-style="rowStyle">
    <el-table-column prop="date" label="日期" width="150" height="40"></el-table-column>
    <el-table-column prop="BillNo" label="凭证" width="100"></el-table-column>
    <el-table-column prop="Desc" label="摘要" width="100"></el-table-column>
    <el-table-column label="现金" style="panding:0px;">
      <el-table-column prop="MoneyIn" label="借方" width="120"></el-table-column>
      <el-table-column prop="MoneyOut" label="贷方" width="120"></el-table-column>
      <el-table-column prop="MoneyBalance" label="余额" width="120"></el-table-column>      
    </el-table-column>
    <el-table-column label="银行存款" style="panding:0px;">
      <el-table-column prop="BankIn" label="借方" width="120"></el-table-column>
      <el-table-column prop="BankOut" label="贷方" width="120"></el-table-column>
      <el-table-column prop="BankBalance" label="余额" width="120" align="right">
        <template slot-scope="scope">
          <span>{{scope.row.BankBalance | rounding}}</span>
        </template>  
      </el-table-column>      
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        currentRow:null,
        tableData3: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          BankBalance: 2003.33
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          BankBalance: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          BankBalance: 2033
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          BankBalance: 2003.33
        }, {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          BankBalance: 333
        }, {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          BankBalance: 133
        }, {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          BankBalance: 0
        }]
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
          this.currentRow = val;
        }
    },
    filters: {
      rounding (value) {
        let amt = value.toFixed(2);
        let regExpInfo = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g;
        return "￥" + amt.toString().replace(regExpInfo, "$1,");
        //return "￥" + value.toFixed(2);
    }
  }
}
</script>