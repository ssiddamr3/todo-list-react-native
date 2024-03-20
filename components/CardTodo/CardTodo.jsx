import {Image, View, Text, TouchableOpacity} from 'react-native';
import {s} from './CardTodo.style';
import check from '../../assets/check.png';

export function CardTodo({todo, onPress,onLongPress}){
    return <>
    <TouchableOpacity onLongPress={()=>{onLongPress(todo)}} style={s.card} onPress={()=>{onPress(todo)}}>
        <Text style={[s.title, todo.isCompleted&&{textDecorationLine:"line-through"}]}>{todo.title}</Text>
        {todo.isCompleted && <Image style={s.img} source={check}/>}
    </TouchableOpacity>
    
    </>
}