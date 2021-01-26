import React, {useState} from 'react';
import {View, Button, Platform, Keyboard} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput } from 'react-native-paper';
import moment from 'moment';

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
    Keyboard.dismiss();
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  return (
    <View>
      <View>
        <TextInput
            label={props.label || 'Date'}
            value={moment(date).format('DD/MM/YYYY')}
            onFocus={showDatepicker}
            onChangeText={props.handleChange}
        />
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