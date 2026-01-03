import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

interface EditModalProps {
  isVisible: boolean;
  text: string;
  setText: (text: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const EditModal = ({ isVisible, text, setText, onClose, onSave }: EditModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Edit Task</Text>
          
          <TextInput
            style={styles.modalInput}
            value={text}
            onChangeText={setText}
            autoFocus={true}
          />

          <View style={styles.modalButtons}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.saveButton} onPress={onSave}>
              <Text style={[styles.buttonText, { color: 'white' }]}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: 'white',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  modalInput: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    borderRadius: 15,
    padding: 15,
    fontSize: 16,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: '#EEE',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
  },
  saveButton: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    backgroundColor: '#ff7c90', 
    alignItems: 'center',
  },
  buttonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});