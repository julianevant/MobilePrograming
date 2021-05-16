import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const TransactionCard = () => {
  return (
    <View style={styles.container}>
      <View>
        <Text>17 April 2020</Text>
        <Text>Water, Food</Text>
      </View>
      <Text>-Rp. 300.000</Text>
    </View>
  );
};

export default TransactionCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    padding: 20,
    borderRadius: 8,
    shadowColor: 'grey',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 1,
  },
});
