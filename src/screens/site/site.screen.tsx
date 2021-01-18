import React, { Component } from 'react';
import {
    Text,
  View
} from 'react-native';
import { Button } from 'react-native-paper';
import { SitesListing } from '../../components/listing/sites-listing/sites-listing.component';

import styles from './site.style';


export class SiteScreen extends Component<any, any> {

  constructor(props: any) {
    super(props);
  }

  componentDidMount = () => {
    // this.props.navigation.reset({
    //   index: 0,
    //   routes: [{ name: 'Home' }],
    // });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <Button mode="outlined" uppercase={false}>
            <Text style={{fontSize: 16}}>{'Add Site'}</Text>
          </Button>

          <Button mode="outlined" uppercase={false}>
            <Text style={{fontSize: 16}}>{'Manage Category'}</Text>
          </Button>
        </View>

        <SitesListing />

      </View>
    );
  }
}
