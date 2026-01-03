import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

interface TaskItemProps {
    item: { id: string; text: string; completed: boolean; starred: boolean };
    onToggleComplete: (id: string) => void;
    onToggleStar: (id: string) => void;
    onEditTask: (id: string) => void;
    onDelete: (id: string) => void;
}

const TaskItem = ({ item, onToggleComplete, onToggleStar, onEditTask, onDelete }: TaskItemProps) => {


    const renderRightActions = () => (
        <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onDelete(item.id)}
        >
            <Ionicons name="trash-outline" size={24} color="white" />
        </TouchableOpacity>
    );

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            rightThreshold={20}
            friction={1}
        >
            <View style={styles.taskCard}>
                <TouchableOpacity
                    style={styles.cardMainContent}
                    onPress={() => onToggleComplete(item.id)}
                    onLongPress={() => onEditTask(item.id)}
                    activeOpacity={0.7}
                >
                    <Ionicons
                        name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                        size={24}
                        color={item.completed ? "#8E74FB" : "#CCC"}
                        style={styles.iconOffset}
                    />
                    <Text style={[
                        styles.taskText,
                        item.completed && styles.completedText
                    ]}>
                        {item.text}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onToggleStar(item.id)}>
                    <Ionicons
                        name={item.starred ? "star" : "star-outline"}
                        size={22}
                        color={item.starred ? "#FFD700" : "#E0E0E0"}
                        style={styles.iconOffset}
                    />
                </TouchableOpacity>
            </View>
        </Swipeable >
    );
};


export default TaskItem;


const styles = StyleSheet.create({
    taskCard: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 20,
        marginBottom: 15,
        alignItems: 'flex-start',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.05,
        shadowRadius: 15,
        elevation: 5,
    },
    cardMainContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flex: 1,
    },
    taskText: {
        flex: 1,
        fontSize: 16,
        marginLeft: 15,
        marginRight: 10,
        color: '#444',
        flexWrap: 'wrap',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#BBB',
    },
    iconOffset: {
        marginTop: 2,
    },
    deleteButton: {
        backgroundColor: '#ff4d4d',
        justifyContent: 'center',
        alignItems: 'center',
        width: 80,
        height: 65,
        borderRadius: 20,
        marginLeft: 10,
    },
});