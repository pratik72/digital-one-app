import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Appbar, Colors, Divider, IconButton, Menu, Provider } from 'react-native-paper';


interface Props{
  title?: string;
  navigation?: any;
  scene: any;
}

export class HeaderComponent extends React.Component<Props, any> {

  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  _goBack = () => console.log('Went back');

  _handleSearch = () => console.log('Searching');

  _handleMore = () => console.log('Shown more');

  closeMenu = () => {

  }

  render() {
    return (
      <Appbar.Header>
        <IconButton
          icon="menu"
          color={Colors.white}
          size={25}
          onPress={() => this.props.navigation.openDrawer()}
        />
        
        <Appbar.Content title={this.props.scene?.route.name} />
        {/* <Appbar.Action icon="dots-vertical" onPress={this._handleMore} /> */}
        
      </Appbar.Header>
      
    );
  }
}
