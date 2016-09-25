import * as types from '../actions/types';

const initialState={
  isLoggedIn:false,//登陆状态
  user:{},
  status: null,//登陆的状态 ‘done’:已登陆,'doing':正在登陆，null：没有登陆
};

//reducer处理函数更新state,渲染UI(主要根据传入旧的state,)
export default function user(state=initialState,action={}){

  switch(action.type) {
    case types.LOGIN:
       return{
         ...state,
         isLoggedIn:true,
         user:action.user,
         status: 'done',
       }
      break;
    case types.LOGIN_ING:
      return {
        ...state,
        isLoggedIn:false,
        status: 'doing',
      }
      break;
    case types.LOGIN_ERROR:
    console.log('types.LOGIN_ERROR...');
        return{
          ...state,
        	isLoggedIn: false,
          status: null,
        };
        break;
    case types.LOGOUT:

      return {
        ...state,
        isLoggedIn:false,
        status:null,
      }
      break;
    //切莫忘记default返回值
    default:
      return state;
  }

}
