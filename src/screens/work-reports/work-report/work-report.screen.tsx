import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { MultiSelect } from '../../../components';
import { WorkReportListing } from '../../../components/listing/work-report-listing/work-report-listing.component';
import { NAVIGATION } from '../../../constants';
import { getAllSites } from '../../../services';

import styles from './work-report.style';

const mapStateToProps = (state: any) => {
  return {
    user: state.user
  };
};

class WorkReportScreen extends Component<any, any> {

  private xhr: any = {};

  constructor(props: any) {
    super(props);
    this.state = {
      refreshFlag: Math.floor(Math.random() * 6) + 1 ,
      currentSite: {},
      allSitesAsOption: []
    };
  }

  componentDidMount = () => {
    this.allSites();
  }

  componentWillUnmount = () => {
    if (this.xhr.respond && this.xhr.respond.abort) {
      this.xhr.respond.abort();
    }
  }

  allSites = async () => {
    this.xhr.respond = await getAllSites();
    if (this.xhr.respond.data) {
      const sitesOptions: Array<{}> = [];
      for (let index = 0; index < this.xhr.respond.data.length; index++) {
        const element = this.xhr.respond.data[index];
        sitesOptions.push({
          value: element.siteId,
          label: element.siteName,
          id: element.siteId,
        });
      }

      this.setState({
        allSitesAsOption: sitesOptions,
        currentSite: sitesOptions[0]
      }, this.refreshData);

    }
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
          <View style={{flex:1, paddingHorizontal: 10 }}>
            <MultiSelect value={this.state.currentSite} items={this.state.allSitesAsOption} onChange={(val: any) => { this.setState({'currentSite': val}, this.refreshData); }} label="Site" />
          </View>
          <View>
            <Button mode="outlined" uppercase={false} onPress={this.openAddSite}>
              <Text style={{fontSize: 16}}>{'Add Work Report'}</Text>
            </Button>
          </View>

        </View>

        <WorkReportListing {...this.props} currentSite={this.state.currentSite} refreshFlag={this.state.refreshFlag} refreshData={this.refreshData} />

      </View>
    );
  }
}

export default connect(mapStateToProps, {})(WorkReportScreen);