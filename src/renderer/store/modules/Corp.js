import Corps from "../../SysDb";

const state={
    CurCorp:null,
    AllCorps:[]
  }

  
const mutations={
    setAllCorps(state,data){
      state.AllCorps = data;
    },
    setCurCorp(state,data){
        state.CurCorp = data;
      }
  }
 const actions={
    getAllCorps(context){
      console.log("getAllCorps...")
      Corps.getAllCorps((err,dbReturn)=>{
        if(err){
          console.log("getAllCorps err" + err);
        }else{
          console.log(dbReturn);
          context.commit('setAllCorps',dbReturn);
        }

    });
      
    },
    setAllCorps(context,data){
        context.commit('setAllCorps',data);
    },
    setCurCorp(context,data){
        context.commit('setCurCorp',data);
    }
  }

  export default {
    state,
    mutations,
    actions
}