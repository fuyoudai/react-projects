const product = (state={list:[],page:1,total:0},action) => {
  switch(action.type) {
    case "PRODUCT_LOADED":
      return {...state, lists:action.payload.products, page:action.payload.page, total:action.payload.totalCount};
    default:
      return state;
  }
}

export default product