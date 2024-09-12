import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';
import Task from './components/Task';
import { Platform } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default function App() {
  const [task, setTask] = useState();
  const [tasksItems, setTasksItems] = useState([]);
  const [editing, setEditing] = useState(null);

  const handleAddTask = () => {
    Keyboard.dismiss();
    setTasksItems([...tasksItems, task])
    setTask(null);
  } 

  const completeTask = (task) => {
    let itemsCopy = [...tasksItems];
    const index = itemsCopy.indexOf(task);
    if (index != -1) {
      itemsCopy.splice(index, 1);
    }
    setTasksItems(itemsCopy);
  };

  const startEditing = (task) => {
    setEditing(task);
  };

  const stopEditing = () => {
    setEditing(null);
  }
  const updateTask = (newTask) => {
    let itemsCopy = [...tasksItems];
    const index = itemsCopy.indexOf(editing);
    if (index != -1) {
      itemsCopy[index] = newTask;
    }
    setTasksItems(itemsCopy);
    stopEditing();
  };
  



  return (
    <View style={styles.container}>
      {/*Today's Task */}
      <View style={styles.textWrapper}>
        <Text style={styles.sectionTitle}>Today's Task</Text>

        <View style={styles.items}>  
          {/* This is where the items or tasks will go */}
          {
            tasksItems.map((item, index) => {
              return(
                <TouchableOpacity key={item} onPress ={() => completeTask(item)}>
                   <Task text={item}/> 
                 </TouchableOpacity>
                
              ) 
            })
          }
          
        </View>
      </View>

      {/*Write a Task */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.input} placeholder={'Write a task'} value = {task} onChangeText={text => setTask(text) }/>

        <TouchableOpacity onPress={() => handleAddTask()}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}>+</Text>
            </View>

        </TouchableOpacity>

      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFEAC5',
  },
  textWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    color: '#6C4E31',
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  
  writeTaskWrapper:{
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input:{
    paddingVertical:15,
    paddingHorizontal:15,
    backgroundColor: '#FFF8E8',
    borderRadius: 60,
    borderColor: '#AAB396',
    borderWidth: 1,
    width: 250,
  },
  addWrapper:{
    width: 60,
    height: 60, 
    backgroundColor: '#FFF8E8',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#AAB396',
    borderWidth: 1,


  },
  addText:{},
});