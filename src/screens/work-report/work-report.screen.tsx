import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { HeaderComponent } from '../../components';

import styles from './work-report.style';


export class WorkReportScreen extends Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{fontSize:18, color:'#ffffff'}}>{'Work Report'}</Text>
      </View>
    );
  }
}
