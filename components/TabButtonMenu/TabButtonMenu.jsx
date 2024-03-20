import {Text, View, Image, TouchableOpacity} from 'react-native';
import {s} from './TabButtonMenu.style';

export function TabButtonMenu({selectedTabName, onPress, todoList}){

    const countByStatus = todoList.reduce((acc,todo)=>{
        todo.isCompleted ? acc.done++ : acc.inProgress++
        return acc

    },{all:todoList.length, inProgress:0,done:0})

    function getTextStyle(tabName){
        return {
            fontWeight:"bold",
            color:selectedTabName === tabName ? "#27F" : "black"
        }
    }
    return <>
        <View style={s.root}>
            <TouchableOpacity onPress={()=>{onPress("all")}}><Text style={getTextStyle("all")}>
                All ({countByStatus.all})</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{onPress("inProgress")}}><Text style={getTextStyle("inProgress")}>
                In Progress ({countByStatus.inProgress})</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{onPress("done")}}><Text style={getTextStyle("done")}>
                Done({countByStatus.done})</Text></TouchableOpacity>
        </View>
    </>
}