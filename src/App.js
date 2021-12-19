import { StatusBar,Dimensions } from 'react-native';
import React,{useState} from 'react';
import styled,{ThemeProvider} from 'styled-components/native';
import { theme } from './theme.js';
import Input from "./component/input.js";
import IconButton from './component/IconButton.js';
import { icons } from './icons.js';
import Task from './task.js';

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
  const [updateCheck,setUpdateCheck] = useState(false)
  const addTask = () => {
    if(newTask.length <1) {
      return;
    }
    const Id = Date.now().toString();
    const newTaskObject = {
      [Id]: {id:Id, text: newTask, completed: false}
    }
    setNewTask('');
    setTasks({...tasks,...newTaskObject});
  }

  const deleteTask = (id) => {
    const currentTasks = Object.assign({}, tasks);
    delete currentTasks[id];
    setTasks(currentTasks);
  }

  const toggleTask = id => {
    const currentTasks = Object.assign({}, tasks);
    currentTasks[id]['completed'] = !currentTasks[id]['completed'];
    setTasks(currentTasks);
  }

  const updateTask = (id) => {
    setUpdateCheck(!updateCheck);
  } 
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
          <Input placeholder="+ Add a Tasks"
          value ={newTask}
          onChangeText ={text => setNewTask(text)}
          onSubmitEditing={addTask}/>  : null
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
