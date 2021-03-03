import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Button } from 'react-native-paper';
import { MultiSelect } from '../../../components';
import { MaterialsListing } from '../../../components/listing/materials-listing/materials-listing.component';
import { NAVIGATION } from '../../../constants';
import { getAllSites } from '../../../services';

import styles from './materials.style';


export class MaterialsScreen extends Component<any, any> {

  private xhr: any = {};

  constructor(props: any) {
    super(props);
    this.state = {
      refreshFlag: 0,
      currentSite: {},
      allSitesAsOption: []
    };
  }

  openAddMaterial = () => {
    this.props.navigation.push(NAVIGATION.ADD_MATERIAL, {refreshData: this.refreshData})
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
            <Button mode="outlined" uppercase={false} onPress={this.openAddMaterial}>
              <Text style={{fontSize: 16}}>{'Add Material'}</Text>
            </Button>
          </View>
        </View>

        <MaterialsListing {...this.props} currentSite={this.state.currentSite} refreshFlag={this.state.refreshFlag} refreshData={this.refreshData} />

      </View>
    );
  }
}
