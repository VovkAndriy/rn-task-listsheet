import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {color} from 'react-native-reanimated';
import {connect} from 'react-redux';

const MainScreen = (props) => {
  const [mode, setMode] = useState('Availabilities');
  const [isOpen, setIsOpen] = useState(false);
  const togglePicker = () => {
    setIsOpen(!isOpen);
  };
  const toggleMode = (txt) => {
    setMode(txt);
    if (isOpen) {
      setIsOpen(false);
    }
  };
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.selectCont}>
          <TouchableOpacity
            onPress={togglePicker}
            style={styles.selectContPicker}>
            <Text>{mode}</Text>
          </TouchableOpacity>
          <View style={styles.addBtnCont}>
            <Text style={styles.addBtnTxt}>+</Text>
          </View>
        </View>
        <View style={styles.monthSelectCont}>
          <View style={styles.monthLeftCont}>
            <Text style={styles.monthLeftTxt}>{'<'}</Text>
          </View>
          <View style={styles.monthCenterCont}>
            <Text style={styles.monthCenterTxt}>March 2020</Text>
          </View>
          <View style={styles.monthLeftCont}>
            <Text style={styles.monthLeftTxt}>{'>'}</Text>
          </View>
        </View>
        <View style={styles.datesCont}>
          <FlatList
            data={props.data}
            keyExtractor={(item) => item.date}
            renderItem={({item, index}) => (
              <View
                style={{
                  ...styles.datesFlex,
                  backgroundColor: index % 2 === 0 ? 'white' : '#faf7fb',
                }}>
                <View>
                  <Text style={styles.dateTxt}>{item.date}</Text>
                  <Text style={styles.dayTxt}>{item.day}</Text>
                </View>

                {mode === 'Availabilities' && (
                  <View style={styles.timeCont}>
                    <Text style={styles.marker}>&#8226;</Text>
                    <Text style={styles.timeTxt}>10:00 AM - 06:00 AM</Text>
                  </View>
                )}
              </View>
            )}
          />
        </View>
      </View>
      <Modal animationType="slide" transparent={true} visible={isOpen}>
        <TouchableOpacity onPress={togglePicker} style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              onPress={() => toggleMode('Availabilities')}
              style={{
                ...styles.modalBtn,
                backgroundColor:
                  mode === 'Availabilities' ? '#fab7a1' : 'white',
              }}>
              <Text
                style={{
                  ...styles.modalBtnTxt,
                  color: mode === 'Availabilities' ? 'white' : 'black',
                }}>
                Availabilities
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => toggleMode('Preferences')}
              style={{
                ...styles.modalBtn,
                backgroundColor: mode === 'Preferences' ? '#fab7a1' : 'white',
              }}>
              <Text
                style={{
                  ...styles.modalBtnTxt,
                  color: mode === 'Preferences' ? 'white' : 'black',
                }}>
                Preferences
              </Text>
            </TouchableOpacity>
            <View style={styles.hr}></View>
            <TouchableOpacity onPress={togglePicker} style={styles.cancelCont}>
              <Text style={styles.cancelTxt}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default connect((state) => ({
  data: state.data,
}))(MainScreen);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  selectCont: {
    width: '100%',
    height: '12%',
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  selectContPicker: {
    height: 40,
    width: '77%',
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 6,
    justifyContent: 'center',
    paddingLeft: 10,
  },
  addBtnCont: {
    height: 40,
    width: 40,
    borderRadius: 6,
    backgroundColor: '#fab7a0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addBtnTxt: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  monthSelectCont: {
    width: '100%',
    height: '7%',
    backgroundColor: '#faf7fb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  monthCenterCont: {
    width: '70%',
    alignItems: 'center',
  },
  monthLeftCont: {
    width: '10%',
    alignItems: 'center',
    backgroundColor: '#fab7a1',
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  monthLeftTxt: {
    color: 'white',
    fontSize: 17,
  },
  monthCenterTxt: {
    fontSize: 16,
  },
  datesCont: {
    width: '100%',
    height: '81%',
  },
  dateTxt: {
    fontSize: 16,
    fontWeight: '800',
    paddingBottom: 3,
  },
  dayTxt: {
    color: 'grey',
  },
  datesFlex: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: '6%',
    paddingVertical: '2%',
  },
  timeCont: {
    minWidth: '40%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  marker: {
    fontSize: 32,
    paddingBottom: 3,
    paddingRight: 6,
  },
  centeredView: {
    height: '100%',
    width: '100%',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalView: {
    height: '19%',
    paddingTop: 10,
    width: '100%',
    backgroundColor: 'white',
  },
  modalBtn: {
    width: '85%',
    borderRadius: 30,
    height: 40,
    paddingLeft: 17,
    paddingVertical: 10,
    marginLeft: 25,
  },
  modalBtnTxt: {
    fontSize: 16,
  },
  hr: {
    width: '90%',
    marginHorizontal: '5%',
    height: 2,
    borderBottomWidth: 2,
    borderBottomColor: 'silver',
    marginVertical: 12,
  },
  cancelTxt: {
    color: 'green',
    fontSize: 17,
  },
  cancelCont: {
    paddingLeft: 10,
  },
});
