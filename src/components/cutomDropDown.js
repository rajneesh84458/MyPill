import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const cutomDropDown = () => {
  return (
    <View>
      {/* <TouchableOpacity
            onPress={() => isSetClickedPill(!isClickedPill)}
            style={styles.amountContainer}>
            <Text>{selectedPill}</Text>

            {isClickedPill ? (
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/130/130906.png',
                }}
                style={styles.dropDownIconStyle}
              />
            ) : (
              <Image
                source={{
                  uri: 'https://cdn-icons-png.flaticon.com/512/32/32195.png',
                }}
                style={styles.dropDownIconStyle}
              />
            )}
          </TouchableOpacity>
          {isClickedPill ? (
            <ScrollView
              style={[
                {
                  width: 120,
                  height: 100,
                  backgroundColor: '#f4f4f4',
                  margin: 2,
                  borderRadius: 5,
                },
              ]}>
              {pillType.map(item => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedPill(item.name);
                      isSetClickedPill(false);
                    }}
                    style={{
                      borderBottomColor: '#000',
                      borderBottomWidth: 0.5,
                    }}>
                    <Text style={{textAlign: 'center', padding: 5}}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : null} */}
    </View>
  );
};

export default cutomDropDown;

const styles = StyleSheet.create({});
