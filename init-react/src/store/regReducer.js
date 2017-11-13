export let reducerList = {};
export function regReducer(name,reducer){
	reducerList[name]=reducer;
	//console.log(reducerList,'reducerList');
}
