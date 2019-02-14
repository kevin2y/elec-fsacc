
const state={
    CurCorp:{}    
  }

  
const mutations={    
    setCurCorp(state,data){
        state.CurCorp = data;
      }
  }
 const actions={
    setCurCorp(context,data){
        context.commit('setCurCorp',data);
    }
  }

  export default {
    state,
    mutations,
    actions
}