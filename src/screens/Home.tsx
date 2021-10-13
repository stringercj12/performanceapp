import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FriendList } from '../components/FriendList';

interface Data {
  id: string;
  name: string;
  likes: string;
}

export function Home() {
  const [name, setName] = useState('');
  const [friends, setFriends] = useState([]);

  async function handleSearch() {
    const response = await fetch(`http://192.168.18.209:3333/friends?q=${name}`);
    const data = await response.json();
    const formattedData = data.map((item: Data) => {
      return {
        id: item.id,
        name: item.name,
        likes: item.likes,
        online: `${new Date().getHours()}:${new Date().getMinutes()}`,
      }
    });

    setFriends(formattedData);
  }

  const handleFollow = useCallback(() => {
    console.log('follow user');
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.title}>Amigos</Text>

      <TextInput
        placeholder="Nome do cliente"
        onChangeText={setName}
        style={styles.input}
      />

      <Button
        title="Buscar"
        onPress={handleSearch}
      />

      <FriendList
        data={friends}
        follow={handleFollow}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    padding: 25
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    padding: 7,
    marginVertical: 10,
  },
  list: {
    marginTop: 20
  }
})