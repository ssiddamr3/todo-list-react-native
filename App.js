import { StatusBar } from 'expo-status-bar';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {s} from './App.style';
import { Header } from './components/Header/Header';
import { CardTodo } from './components/CardTodo/CardTodo';
import { useEffect, useRef, useState } from 'react';
import { TabButtonMenu } from './components/TabButtonMenu/TabButtonMenu';
import { ButtonAdd } from './components/ButtonAdd/ButtonAdd';
import Dialog from 'react-native-dialog';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

let isFirstRender = true;
export default function App() {
  useEffect(()=>{
    loadTodoList()
  },[])
  
  useEffect(()=>{
    if(isFirstRender){

    }
    else{
    saveTodoList();
    isFirstRender = false;
    }
  },[todoList])

  const [todoList, setTodoList] = useState([ {id:1,title:"Go to gym",isCompleted:true},
  {id:2,title:"Send that email",isCompleted:false},
  {id:3,title:"Buy Groceries",isCompleted:false},
  {id:4,title:"Walk the dog",isCompleted:false},
  {id:5,title:"Walk the dog",isCompleted:false},
  {id:6,title:"Walk the dog",isCompleted:false},
  {id:7,title:"Walk the dog",isCompleted:false},]);

  const [selectedTabName,setSelectedTabName] = useState("all");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [inputValue,setInputValue]= useState("");
  const ScrollViewRef = useRef();

  async function loadTodoList(){
    const toListString = AsyncStorage.getItem('@todoList');
    const parsedTodoList = JSON.parse(toListString);
    setTodoList(parsedTodoList || []);
  }

  async function saveTodoList(){
    try{
        await AsyncStorage.setItem('@todoList',JSON.stringify(todoList));
    }
    catch(error){
      alert(error);

    }
  }

  function getFilteredList(){
    switch(selectedTabName){
      case "all":
        return todoList
      case "inProgress":
        return todoList.filter((todo)=>todo.isCompleted === false);
      case "done":
        return todoList.filter((todo)=>todo.isCompleted === true);
    }
  }

  function deleteTodo(todo){
    Alert.alert("Delete todo", "Are you sure you want to delete this todo?",
    [
      {text:"Delete", style:"destructive",
    onPress:()=>{
      setTodoList(todoList.filter(t => t.id !== todo.id))
    }},
      {text:"Cancel",style:"cancel"}
    ])
  }

  function renderTodoList(){
    return getFilteredList().map((todo)=> <View key ={todo.id} style={s.cardItem}>
      <CardTodo onLongPress={deleteTodo} onPress={updateTodo} todo={todo}/>
      </View>)
  }

  function updateTodo(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted
    };
  
    const updatedTodoList = todoList.map((t) =>
      t.id === updatedTodo.id ? updatedTodo : t
    );
  
    setTodoList(updatedTodoList);
  }

  function addTodo(){
    const newTodo ={
      id:uuid.v4(),
      title: inputValue,
      isCompleted:false,
    };
    setTodoList([...todoList, newTodo]);
    setShowAddDialog(false);
    setInputValue("");
    setTimeout(()=>{
      ScrollViewRef.current.scrollToEnd();
    },300)
  }

  function renderAddDialogue(){
    return(
      <Dialog.Container visible={showAddDialog} onBackdropPress={()=>setShowAddDialog(false)}>
      <Dialog.Title>Add Todo</Dialog.Title>
      <Dialog.Description>Choose a name for the todo</Dialog.Description>
      <Dialog.Input onChangeText= {(text)=>setInputValue(text)} placeholder='Ex: Get a haircut'/>
      <Dialog.Button label="Cancel" onPress={()=>setShowAddDialog(false)}/>
      <Dialog.Button disabled={inputValue.length === 0} label="Save" onPress={addTodo}/>
    </Dialog.Container>
    )
  }

  function showAddTodoDialogue(){
    setShowAddDialog(true);
  }
  
  return (
    <>
    <SafeAreaProvider>
      <SafeAreaView style={s.app}>
        <View style={s.header}>
          <Header/>
        </View>
        <View style={s.body}>
        <ScrollView ref={ScrollViewRef}>
          {renderTodoList()}
          </ScrollView>
        </View>
        <ButtonAdd onPress={() => showAddTodoDialogue(true)}/>
      </SafeAreaView>
    </SafeAreaProvider>
    <View style={s.footer}>
    <TabButtonMenu onPress = {setSelectedTabName} 
    todoList={todoList}
    selectedTabName={selectedTabName}/>
  </View>
  {renderAddDialogue()}
  </>

  );
}


