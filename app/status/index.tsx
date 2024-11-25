// app/status/index.tsx

import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';

interface Occurrence {
  id: number;
  description: string;
  status: string;
}

export default function StatusScreen() {
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

  useEffect(() => {
    // Aqui você pode buscar as ocorrências do servidor ou usar dados fictícios
    const mockData: Occurrence[] = [
      { id: 1, description: 'Buraco na rua principal', status: 'Em andamento' },
      { id: 2, description: 'Lâmpada queimada na praça', status: 'Resolvido' },
    ];
    setOccurrences(mockData);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={occurrences}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.description}>{item.description}</Text>
            <Text style={styles.status}>Status: {item.status}</Text>
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
  description: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  status: {
    marginTop: 8,
    color: 'gray',
  },
});
