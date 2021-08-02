import React, {useState} from 'react';

import styles from './site-filters.style';
import {View, Text} from 'react-native';
import {Colors, IconButton} from 'react-native-paper';
import {DateTimePickerComponent} from '../..';
import moment from 'moment';

interface IStartEndDateToggleProps {
  startDate: Date;
  endDate: Date;
  label: string;
  changeCallback?: CallableFunction;
}

export const StartEndDateToggle = (props: IStartEndDateToggleProps) => {
  const [startDate, setStartDate] = useState(
    props.startDate || (moment().toDate() as Date),
  );

  const [endDate, setEndDate] = useState(
    props.endDate || (moment().toDate() as Date),
  );

  const changeDate = (argDate: Date, key: string) => {
    const keyEventMap = {
      startDate: setStartDate,
      endDate: setEndDate,
    };
    if (key === 'startDate' || key === 'endDate') {
      keyEventMap[key](argDate);
      props.changeCallback &&
        props.changeCallback({
          startDate: key === 'startDate' ? argDate : startDate,
          endDate: key === 'endDate' ? argDate : endDate,
        });
    }
  };

  const toggleStartDate = () => {};

  return (
    <>
      <View style={styles.labelView}>
        <Text style={styles.labelText}>
          {props.label || 'Start End Date Toggle'}
        </Text>
        <IconButton
          icon="plus-circle"
          color={Colors.deepPurpleA700}
          onPress={toggleStartDate}
        />
      </View>
      <View style={styles.controlView}>
        <View style={styles.startDate}>
          <DateTimePickerComponent
            label="From"
            values={startDate}
            onChange={(date: Date) => changeDate(date, 'startDate')}
          />
        </View>
        <View style={styles.endDate}>
          <DateTimePickerComponent
            label="To"
            values={endDate}
            onChange={(date: Date) => changeDate(date, 'endDate')}
          />
        </View>
      </View>
    </>
  );
};
