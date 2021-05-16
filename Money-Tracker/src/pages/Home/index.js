import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View, ScrollView} from 'react-native';
import {Button, Gap, Number, TransactionCard} from '../../components';
import firebase from '../../config/Firebase';

const Home = ({navigation, route}) => {
  const [profile, setProfile] = useState({});
  const [balance, setBalance] = useState({
    cashOnHand: 0,
    cashOnBank: 0,
    totalBalance: 0,
  });

  const {uid} = route.params;

  const getUserProfile = () => {
    firebase
      .database()
      .ref(`users/${uid}/`)
      .once('value', res => {
        const photo = `data:image/jpeg;base64, ${res.val().photo}`;
        setProfile({...res.val(), photo: photo});
      });
  };

  const getUserBalance = () => {
    firebase
      .database()
      .ref(`balance/${uid}`)
      .on('value', res => {
        if (res.val()) {
          setBalance(res.val());
        }
      });
  };

  useEffect(() => {
    getUserProfile();
    getUserBalance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.page}>
      <View style={styles.profileWrapper}>
        <View>
          <Text style={styles.title}>Money Tracker</Text>
          <Text style={styles.subTitle}>Track your money</Text>
        </View>
        <Image source={{uri: profile.photo}} style={styles.image} />
      </View>
      <Gap height={24} />
      <View style={styles.balanceWrapper}>
        <Text style={styles.cardTitle}>Your Balance</Text>
        <Number number={balance.totalBalance} style={styles.balance} />
        <Text style={styles.cashOnHand}>
          Cash On Hand{' '}
          <Number number={balance.cashOnHand} style={styles.amount} />
        </Text>
        <Text style={styles.cashOnBank}>
          Cash On Bank{' '}
          <Number number={balance.cashOnBank} style={styles.amount} />
        </Text>
      </View>
      <Gap height={24} />
      <View style={styles.addTransactionWrapper}>
        <Text style={styles.cardTitle}>Add Transaction</Text>
        <Button
          title="Cash On Hand"
          onPress={() =>
            navigation.navigate('AddTransaction', {
              title: 'Cash On Hand',
              uid: uid,
            })
          }
        />
        <Gap height={16} />
        <Button
          title="Cash On Bank"
          onPress={() =>
            navigation.navigate('AddTransaction', {
              title: 'Cash On Bank',
              uid: uid,
            })
          }
        />
      </View>
      <Gap height={24} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  profileWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Poppins-Medium',
  },
  subTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Light',
  },
  image: {
    height: 50,
    width: 50,
    borderRadius: 8,
  },
  balanceWrapper: {
    paddingHorizontal: 24,
    backgroundColor: 'white',
    paddingVertical: 15,
  },
  cardTitle: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    marginBottom: 10,
  },
  balance: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    paddingBottom: 18,
    marginBottom: 20,
  },
  cashOnHand: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  cashOnBank: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  addTransactionWrapper: {
    paddingHorizontal: 24,
    backgroundColor: 'white',
    paddingVertical: 15,
    flex: 1,
  },
  amount: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },
});
