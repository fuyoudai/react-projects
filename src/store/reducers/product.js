const product = (state={list:[],page:1,total:0},action) => {
  switch(action.type) {
    case "PRODUCT_LOADED":
      return {...state};
    default:
      return state;
  }
}

export default product