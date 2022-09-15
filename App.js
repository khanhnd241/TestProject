/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import api from './src/api/users/index';
import FastImage from 'react-native-fast-image';
const deviceWidth = Dimensions.get('screen').width;
const App = () => {
  const [listUsers, setListUser] = useState([]);
  useEffect(() => {
    getListUsers();
  }, []);
  const getListUsers = () => {
    api
      .getListUsers()
      .then(res => {
        setListUser(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  const getFetchRamdom = () => {
    getListUsers();
  };
  const renderItem = ({item, index}) => {
    return (
      <View style={styles.contain(index)}>
        <FastImage
          source={{
            uri: item.avatar,
          }}
          style={styles.avatar}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.txtName}>
          {item?.first_name} {item.last_name}
        </Text>
        <Text style={styles.txtName}>{item?.employment?.title}</Text>
      </View>
    );
  };
  const renderHeader = () => (
    <TouchableOpacity onPress={getFetchRamdom}>
      <Text style={styles.txtFetchRandom}>Fetch random</Text>
    </TouchableOpacity>
  );
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listUsers}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        numColumns={2}
        // contentContainerStyle={styles.list}
        style={styles.list}
        ListHeaderComponent={renderHeader()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, padding: 10},
  avatar: {
    width: '100%',
    height: 150,
  },
  list: {
    backgroundColor: '#66ff99',
    flex: 1,
    paddingHorizontal: 10,
  },
  txtName: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  txtFetchRandom: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contain: index => ({
    flex: 1,
    backgroundColor: 'white',
    marginRight: index % 2 === 0 ? 10 : 0,
    marginVertical: 5,
    padding: 10,
    // marginLeft: index % 2 === 0 ? 20 : 0,
    height: 250,
    // width: (deviceWidth - 60) / 2,
  }),
});

export default App;
