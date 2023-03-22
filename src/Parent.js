import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Button} from 'react-native';

export default function ParentScreen({route, navigation}) {
  // console.log('route', route.params.data);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (route.params?.data) {
      setData([...data, route.params.data]);
      console.log('data', data);
    }
  }, [route.params?.data]);

  const renderItem = ({item}) => {
    const {title} = item;
    console.log('tiel', title);
    return (
      <View>
        <Text>{item.title}</Text>
        <Text>{item.description}</Text>
      </View>
    );
  };

  return (
    <View>
      <Text>Hello</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button title="GoTo B" onPress={() => navigation.navigate('child')} />
    </View>
  );
}
