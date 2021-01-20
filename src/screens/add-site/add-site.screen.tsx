import React, { Component } from 'react';
import {
    Text,
  View
} from 'react-native';
import { Button } from 'react-native-paper';

import styles from './add-site.style';


export class AddSiteScreen extends Component<any, any> {

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
        </View>

      </View>
    );
  }
}
