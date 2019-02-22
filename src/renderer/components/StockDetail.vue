<template>
   <v-table
            :width="1100"
            :height="480"
            even-bg-color="#f2f2f2"
            :title-rows="titleRows"
            :columns="columns"
            :row-groups="rowGroups"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :title-row-height="30"
            :cell-merge="cellMerge"
    ></v-table>
</template>

<style>
    .title-cell-class-name-test1 {
        background-color: #2db7f5;
    }
    .title-cell-class-name-test2 {
        background-color: #f60;
    }
</style>

<script>
let celCnt=0;
    export default{
        data(){
            return {                
                multipleSort: false,
                tableData: [
                        {"userid":"1","name":"赵伟","gender":"男","height":"183","email":"zhao@gmail.com","tel":"156*****1987","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵东路569号17楼"},
                        {"userid":"1","name":"赵伟","gender":"男","height":"183","email":"zhao@gmail.com","tel":"156*****1987","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵北路69号2楼"},
                        {"userid":"2","name":"李伟","gender":"男","height":"166","email":"li@gmail.com","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市奉贤区南桥镇立新路12号2楼"},
                        {"userid":"2","name":"李伟","gender":"男","height":"166","email":"li@gmail.com","tel":"182*****1538","hobby":"钢琴、书法、唱歌","address":"上海市黄浦区金陵北路69号3楼"},
                        {"name":"孙伟","gender":"女","height":"186","email":"sun@gmail.com","tel":"161*****0097","hobby":"钢琴、书法、唱歌","address":"上海市崇明县城桥镇八一路739号"},
                        {"name":"周伟","gender":"女","height":"188","email":"zhou@gmail.com","tel":"197*****1123","hobby":"钢琴、书法、唱歌","address":"上海市青浦区青浦镇章浜路24号"},
                        {"name":"吴伟","gender":"男","height":"160","email":"wu@gmail.com","tel":"183*****6678","hobby":"钢琴、书法、唱歌","address":"上海市松江区乐都西路867-871号"},
                        {"name":"冯伟","gender":"女","height":"168","email":"feng@gmail.com","tel":"133*****3793","hobby":"钢琴、书法、唱歌","address":"上海市金山区龙胜路143号一层"}
                ],
                columns: [
                     {
                        field: 'custome', width: 50, titleAlign: 'center', columnAlign: 'center',
                        formatter: function (rowData, index) {
                            return index < 3 ? '<span style="color:red;font-weight: bold;">' + (index + 1) + '</span>' : index + 1
                        }, isFrozen: true
                    },
                    {field: 'name', width: 100, columnAlign: 'center', isFrozen: true},
                    {field: 'gender', width: 150, columnAlign: 'center', isFrozen: true},
                    {field: 'height', width: 150, columnAlign: 'center', isFrozen: true},
                    {field: 'tel', width: 190, columnAlign: 'center'},
                    {field: 'email', width: 230, columnAlign: 'center'},
                    {field: 'hobby', width: 230, columnAlign: 'center'},
                    {field: 'address', width: 330, columnAlign: 'left'}
                ],

                titleRows: [
                             [{fields: ['custome'], title: '排序', titleAlign: 'center', rowspan: 2},
                              {fields: ['name', 'gender', 'height'], title: '基础信息', titleAlign: 'center', colspan: 3},
                              {fields: ['tel', 'email'], title: '联系方式', titleAlign: 'center', colspan: 2},
                              {fields: ['hobby','address'], title: '爱好及地址', titleAlign: 'center', rowspan: 2,colspan: 2}],

                             [{fields: ['name'], title: '姓名', titleAlign: 'center'},
                              {fields: ['gender'], title: '性别', titleAlign: 'center', orderBy: 'asc'},
                              {fields: ['height'], title: '身高', titleAlign: 'center', orderBy: 'desc'},
                              {fields: ['tel'], title: '手机号码', titleAlign: 'center'},
                              {fields: ['email'], title: '邮箱', titleAlign: 'center'}],

                             
                           ],
                rowGroups:[
                    {field:'name',keys:['userid']},
                    {field:'gender',keys:['userid']}
                ]
            }
        },
        methods:{
            cellMerge(rowIndex,rowData,field){
                celCnt++
                //console.log("cellMarge..." + celCnt);
            }
        }
    }
</script>
