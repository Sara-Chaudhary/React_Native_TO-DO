import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, FlatList, Keyboard, ImageBackground, Alert, Platform } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import TaskItem from './components/taskItem';
import EditModal from './components/EditModal';

export default function Index() {
  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState([
    { id: '1', text: 'Project Report by 10 Jan', completed: false, starred: true },
    { id: '2', text: 'To Do APP in next 3 hrs', completed: true, starred: false },
  ]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editText, setEditText] = useState('');

  // Logic to toggle the completed status
  const toggleComplete = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTaskList(taskList.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // Logic to toggle the star status
  const toggleStar = (id: string) => {
    setTaskList(taskList.map(item =>
      item.id === id ? { ...item, starred: !item.starred } : item
    ));
  };

  const addTask = () => {
    if (task.trim().length === 0) return;
    setTaskList([...taskList, {
      id: Date.now().toString(),
      text: task,
      completed: false,
      starred: false
    }]);
    setTask('');
    Keyboard.dismiss();
  };

  const editTask = (id: string, newText: string) => {
    if (newText.trim().length === 0) return;
    setTaskList(taskList.map(item =>
      item.id === id ? { ...item, text: newText } : item
    ));
  };

  const handleEditPress = (id: string) => {
    const taskToEdit = taskList.find(t => t.id === id);
    if (taskToEdit) {
      setEditingTaskId(id);
      setEditText(taskToEdit.text);
      setIsModalVisible(true);
    }
  };

  const saveEdit = () => {
    if (editingTaskId && editText.trim().length > 0) {
      editTask(editingTaskId, editText);
      setIsModalVisible(false);
    }
  };

  const deleteTask = (id: string) => {
    setTaskList(taskList.filter(item => item.id !== id));
  };

  const sortedList = [...taskList].sort((a, b) => {
    // 1. Move completed items to the bottom
    if (a.completed !== b.completed) {
      return a.completed ? 1 : -1;
    }
    // 2. Move starred items to the top 
    if (a.starred !== b.starred) {
      return a.starred ? -1 : 1;
    }
    return 0;
  });

  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('../assets/images/bg4.png')}
        style={styles.backgroundImage}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>To Do List</Text>
            </View>

            <EditModal
              isVisible={isModalVisible}
              text={editText}
              setText={setEditText}
              onClose={() => setIsModalVisible(false)}
              onSave={saveEdit}
            />

            <View style={styles.inputArea}>
              <Ionicons name="add" size={24} color="#ff7c90" />
              <TextInput
                style={styles.input}
                placeholder="Add a task..."
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={task}
                onChangeText={setTask}
                onSubmitEditing={addTask}

              />
            </View>

            <FlatList
              data={sortedList}
              keyExtractor={(item) => item.id}
              ListEmptyComponent={() => (
                <View style={styles.emptyState}>
                  <Ionicons name="checkmark-done-circle-outline" size={80} color="rgba(255,255,255,0.5)" />
                  <Text style={styles.emptyText}>All caught up!</Text>
                </View>
              )}
              contentContainerStyle={{ paddingBottom: 100 }}
              renderItem={({ item }) => (
                <TaskItem
                  item={item}
                  onToggleComplete={toggleComplete}
                  onToggleStar={toggleStar}
                  onEditTask={handleEditPress}
                  onDelete={deleteTask} 
                />
              )}
            />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  header: {
    marginBottom: 30,
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  title: {
    fontSize: 34,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  inputArea: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 60,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 18,
    color: '#FFFFFF',
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 50,
    opacity: 0.8,
  },
  emptyText: {
    color: 'white',
    marginTop: 10,
    fontSize: 16,
    fontWeight: '500',
  }
});