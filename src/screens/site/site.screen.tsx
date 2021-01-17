import React, { Component } from 'react';
import {
    Text,
  View
} from 'react-native';

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
          
        <Text style={{fontSize:18, color:'#ffffff'}}>{'Site'}</Text>

      </View>
    );
  }
}
