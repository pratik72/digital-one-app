import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialsListing } from '../../../components/listing/materials-listing/materials-listing.component';
import { NAVIGATION } from '../../../constants';

import styles from './materials.style';


export class MaterialsScreen extends Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      refreshFlag: 0,
    };
  }

  openAddMaterial = () => {
    this.props.navigation.push(NAVIGATION.ADD_MATERIAL, {refreshData: this.refreshData})
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
          <Button mode="outlined" uppercase={false} onPress={this.openAddMaterial}>
            <Text style={{fontSize: 16}}>{'Add Material'}</Text>
          </Button>

        </View>

        <MaterialsListing {...this.props} refreshFlag={this.state.refreshFlag} refreshData={this.refreshData} />

      </View>
    );
  }
}
