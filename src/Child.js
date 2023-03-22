import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export default function ScreenB({navigation}) {
  const data = {
    id: 1,
    title: 'New Item',
    description: 'This is a new item',
  };

  const handlePress = () => {
    // console.log('data', {data});
    navigation.navigate('parent', {data});
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <TouchableOpacity
        onPress={handlePress}
        style={{
          width: 200,
          height: 50,
          backgroundColor: '#dddd',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>Add Item to List</Text>
      </TouchableOpacity>
    </View>
  );
}
