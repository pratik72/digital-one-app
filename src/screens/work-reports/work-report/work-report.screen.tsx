import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Button } from 'react-native-paper';
import { WorkReportListing } from '../../../components/listing/work-report-listing/work-report-listing.component';
import { NAVIGATION } from '../../../constants';

import styles from './work-report.style';


export class WorkReportScreen extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      refreshFlag: Math.floor(Math.random() * 6) + 1 ,
    };
  }

  openAddSite = () => {
    this.props.navigation.push(NAVIGATION.ADD_WORK_REPORT, {refreshData: this.refreshData})
  }

  refreshData = () => {
    this.setState({
      refreshFlag: Math.floor(Math.random() * 6) + 1 
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <Button mode="outlined" uppercase={false} onPress={this.openAddSite}>
            <Text style={{fontSize: 16}}>{'Add Work Report'}</Text>
          </Button>

        </View>

        <WorkReportListing {...this.props} refreshFlag={this.state.refreshFlag} refreshData={this.refreshData} />

      </View>
    );
  }
}
