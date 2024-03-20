import { StyleSheet } from "react-native";

export const s = StyleSheet.create({
    card:{
        backgroundColor:"white",
        height:115,
        shadowColor:"#000",
        shadowOffset:{
            width:0,
            height:3
        },
        shadowOpacity:0.25,
        shadowRadius:3.84,
        elevation:5,
        borderRadius:13,
        justifyContent:"center",
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingHorizontal:20
    },
    img:{
        width: 25,
        height:25
    },
    title:{
        fontSize:25,
    },
});