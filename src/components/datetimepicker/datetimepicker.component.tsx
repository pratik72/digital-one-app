import React, {useState} from 'react';
import {View, Platform, Keyboard, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { COMMON } from '../../constants';

export const DateTimePickerComponent = (props: any) => {
  const [date, setDate] = useState(props.values || new Date(1598051730000));
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate:any) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    props.onChange(currentDate);
  };

  const showMode = (currentMode: any) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    console.log("Hello")
    Keyboard.dismiss();
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View>
        <TouchableOpacity onPress={showDatepicker} style={{backgroundColor: '#e7e7e7', paddingHorizontal: 10, paddingVertical: 10}}>
          <Text style={{color:'#6d6d6d', fontSize: 12}}>{props.label || 'Date'}</Text>
          <Text style={{fontSize: 16, marginTop: 5}}>{moment(date).format(COMMON.DATE_FORMAT)}</Text>
        </TouchableOpacity>
        {/* <Button onPress={showDatepicker} title="Show date picker!" /> */}
      </View>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};