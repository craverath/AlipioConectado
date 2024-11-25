// app/report/index.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';

export default function ReportScreen() {
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<null | string>(null);
  const [location, setLocation] = useState<null | Location.LocationObject>(null);

  const pickImage = async () => {
    // Solicita permissão para acessar as fotos
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permissão para acessar a mídia é necessária!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const getLocation = async () => {
    // Solicita permissão para acessar a localização
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permissão para acessar a localização é necessária!');
      return;
    }

    const currentLocation = await Location.getCurrentPositionAsync({});
    setLocation(currentLocation);
  };

  const submitReport = () => {
    // Aqui você pode enviar os dados para a API ou armazená-los localmente por enquanto
    console.log({
      description,
      image,
      location,
    });
    alert('Ocorrência reportada com sucesso!');
    // Limpar os campos
    setDescription('');
    setImage(null);
    setLocation(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Descrição:</Text>
      <TextInput
        style={styles.input}
        placeholder="Descreva o problema..."
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={pickImage}>
        <Text style={styles.buttonText}>Selecionar Foto</Text>
      </TouchableOpacity>

      {image && <Image source={{ uri: image }} style={styles.image} />}

      <TouchableOpacity style={styles.button} onPress={getLocation}>
        <Text style={styles.buttonText}>Obter Localização</Text>
      </TouchableOpacity>

      {location && (
        <Text>
          Localização obtida: {location.coords.latitude}, {location.coords.longitude}
        </Text>
      )}

      <TouchableOpacity style={styles.submitButton} onPress={submitReport}>
        <Text style={styles.submitButtonText}>Enviar Ocorrência</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    marginVertical: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    marginTop: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  image: {
    width: '100%',
    height: 200,
    marginVertical: 12,
    borderRadius: 8,
  },
});
