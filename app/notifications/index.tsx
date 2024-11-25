// app/notifications/index.tsx

import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

interface Notification {
  id: number;
  message: string;
  date: string;
}

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Aqui você pode buscar as notificações do servidor ou usar dados fictícios
    const mockData: Notification[] = [
      { id: 1, message: 'Sua ocorrência foi atualizada.', date: '2023-10-01' },
      { id: 2, message: 'Nova ocorrência próxima a você.', date: '2023-10-02' },
    ];
    setNotifications(mockData);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.date}>{item.date}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  item: {
    borderColor: '#ddd',
    borderWidth: 1,
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
  },
  message: {
    fontSize: 16,
  },
  date: {
    marginTop: 8,
    color: 'gray',
  },
});
