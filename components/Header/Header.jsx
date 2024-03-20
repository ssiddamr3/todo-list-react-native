import {s} from './Header.style';
import {Image,Text, View} from 'react-native';
import logoImg from '../../assets/logo.png';

export function Header(){
    return <>
    <Image style={s.img} source={logoImg} resizeMode="contain"/>
    <Text style={s.subtitle}>You need to something</Text>
    
    
    </>

}