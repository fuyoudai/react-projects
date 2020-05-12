import * as actions from '../constants'
export function add(num){
  return {
    type:actions.ADD,
    num
  }
}