import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://zellab-pineapple.herokuapp.com/meets')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={styles.main}>
      <Text style={styles.title}>
        Zellab Meets
      </Text>
      {isLoading ? <ActivityIndicator/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text>{item.title}</Text>
              <Text>{item.content}</Text>
              <Text>{item.room}</Text>
              <Text>{item.start} - {item.end}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    marginTop: 50,
    marginHorizontal: 15
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    marginVertical: 10,
    backgroundColor: '#f0f0f0',
    padding: 10, 
    borderRadius: 10,   
  }
});
