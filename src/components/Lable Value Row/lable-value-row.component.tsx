import * as React from 'react';
import { Text, View } from 'react-native';

import styles from './lable-value-row.style';

interface IProps{
  label: string;
  value: string
}

export const LabelValueRow = (props: IProps) =>  {
    return (
      <View style={styles.rowView}>
        <View style={styles.labelView}>
          <Text style={{fontWeight: 'bold'}}>{props.label}</Text>
        </View>
        <View style={styles.ValueView}>
          <Text>{props.value}</Text>
        </View>
      </View>
    );
}
