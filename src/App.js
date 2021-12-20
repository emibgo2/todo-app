import { StatusBar,Dimensions } from 'react-native';
import React,{useEffect, useState} from 'react';
import styled,{ThemeProvider} from 'styled-components/native';
import { theme } from './theme.js';
import Input from "./component/input.js";
import IconButton from './component/IconButton.js';
import { icons } from './icons.js';
import Task from './task.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { any } from 'prop-types';

const STORAGE_KEY ="@toDos";

const List = styled.ScrollView`
  flex: 1;
  width: ${({width}) => width-40}px;
`;

export default function App() {
  const width = Dimensions.get('window').width;
  const tempData = {
    '1': {id:'1',text:'React Native',completed:false},
    '2': {id:'2',text:'Expo',completed:false},
    '3': {id:'3',text:'js',completed:false},
  }

  const [tasks, setTasks] = useState(tempData);
  const [newTask,setNewTask] = useState('');
  const [updateTasks,setUpdateTask] = useState('');
  const [updateCheck,setUpdateCheck] = useState(false)

  const addTask = async () => {
    if(newTask.length <1) {
      return;
    }
    const Id = Date.now().toString();
    const newTaskObject = {
      [Id]: {id:Id, text: newTask, completed: false}
    }
   
    setNewTask('');
    setTasks({...tasks,...newTaskObject}); 

    const currentTasks = Object.assign( tasks,newTaskObject);
    await saveToDos(currentTasks);
  }

  const deleteTask = async(id) => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    setTasks(currentTasks);
    await saveToDos(currentTasks);
  }

  const toggleTask =async (id) => {
    console.log(id);
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    setTasks(currentTasks);
    await saveToDos(currentTasks);
  }

//  const addTask = async () => {
//     if(newTask.length <1) {
//       return;
//     }
//     const Id = Date.now().toString();
//     const newTaskObject = {
//       [Id]: {id:Id, text: newTask, completed: false}
//     }
   
//     setNewTask('');
//     setTasks({...tasks,...newTaskObject}); 

//     const currentTasks = Object.assign( tasks,newTaskObject);
//     await saveToDos(currentTasks);
//   }

  const updateTask = (id) => {
    
    setUpdateCheck(!updateCheck);
    if (updateCheck=== false){
      console.log("update Task",id);
      const currentTasks = Object.assign({}, tasks);
      const temp = currentTasks[id]['text'];
      setUpdateTask(temp);
    }

    if (updateCheck == true){
      console.log("ididididid",id);
      const updateTaskObject = {
       [id]: {id:id, text: updateTasks, completed:false }
      }
      console.log('updateTaskObject Text', updateTasks);
      const currentTasks = Object.assign( {} ,tasks);
      currentTasks[id]['text']=updateTasks
      setTasks(currentTasks);
    }
  } 
  
  const updateText  =  (id) =>{
    console.log(id);
    // setTasks(currentTasks);
  }

  const saveToDos = async(toSave)=>{
    await AsyncStorage.setItem(STORAGE_KEY,  JSON.stringify(toSave));
  }

  const loadToDos = async()=>{
    const s = await AsyncStorage.getItem(STORAGE_KEY);
    setTasks(JSON.parse(s));
    console.log(s);
  }
  
  useEffect(()=> {
    loadToDos();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Title>ToDo List</Title>
        <StatusBar 
        barStyle='light-content'
        backgroundColor={theme.background}
         />
         <Input 
         placeholder="+ Add a Tasks"
         value ={newTask}
         onChangeText ={text => setNewTask(text)}
         onSubmitEditing={addTask}
          />
          <List width={width}>
            {Object.values(tasks).reverse().map(item =>(
              <Task 
              text={item.text} 
              item = {item}
              deleteTask= {deleteTask}
              toggleTask={toggleTask}
              updateTask={updateTask}
              />
            ))}
          </List>
          {updateCheck ? 
          <Input placeholder="✓ Modify"
          value ={updateTasks}
          onChangeText ={text => setUpdateTask(text)}
          onSubmitEditing={updateTask}/>  : null
        }
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.SafeAreaView`
  flex: 1;
  background-color:${({theme}) => theme.background};
  align-items: center;
  justify-content: flex-start;
`;

const Title = styled.Text`
  font-size: 40px;
  font-weight: 600;
  color: ${({theme}) => theme.main};
  align-items: flex-start;
  margin: 20px;
`;
