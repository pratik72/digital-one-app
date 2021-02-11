import React, { Component } from 'react';
import {
    Text,
  View
} from 'react-native';
import { Button } from 'react-native-paper';
import { SitesListing } from '../../../components/listing/sites-listing/sites-listing.component';
import { NAVIGATION } from '../../../constants';

import styles from './site.style';


export class SiteScreen extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      refreshFlag: 0,
    };
  }

  componentDidMount = () => {
    
  }

  openAddSite = () => {
    this.props.navigation.push(NAVIGATION.ADD_SITE, {refreshSiteData: this.refreshSiteData})
  }

  openWorkCategory = () => {
    this.props.navigation.push(NAVIGATION.WORK_CATEGORY)
  }

  refreshSiteData = () => {
    this.setState({
      refreshFlag: Math.floor(Math.random() * 6) + 1 
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <Button mode="outlined" uppercase={false} onPress={this.openAddSite}>
            <Text style={{fontSize: 16}}>{'Add Site'}</Text>
          </Button>

          <Button mode="outlined" uppercase={false} onPress={this.openWorkCategory}>
            <Text style={{fontSize: 16}}>{'Manage Category'}</Text>
          </Button>
        </View>

        <SitesListing {...this.props} refreshFlag={this.state.refreshFlag} refreshSiteData={this.refreshSiteData} />

      </View>
    );
  }
}
