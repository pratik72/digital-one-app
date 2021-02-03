import _ from 'lodash';
import React, { Component } from 'react';
import {
  Alert,
  Modal,
  ScrollView,
    Text,
  View,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { Button, Chip, Colors, Dialog, HelperText, TextInput } from 'react-native-paper';


import styles from './multi-select.component.style';
import { IItemObject, IMultiSelectProps, IMultiSelectStates } from './multi-select.component.types';

export class MultiSelect extends Component<IMultiSelectProps, IMultiSelectStates> {


  constructor(props: IMultiSelectProps) {
    super(props);
    this.state = {
      values: this.props.values || [] as Array<IItemObject>,
      dialogVisible: false,
      items: this.props.items || [] as Array<IItemObject>,
      selectedItems: [] as Array<IItemObject>
    }
  }

  componentDidMount = () => {
  }

  componentDidUpdate = (prevProps: IMultiSelectProps) => {
    if(this.props.values != prevProps.values){
      this.setState({
        values: this.props.values
      });
    }

    if(this.props.items != prevProps.items){
      this.setState({
        items: this.props.items
      });
    }
  }

  removeChip = (obj: any, index: number) => {
    const allValues = [...this.state.values];
    if(allValues.length && index !== -1 && !obj.disabled){
      allValues.splice(index, 1);
      this.setState({values: allValues});
    }
  }

  openDialog = () => {
    const selectedUserIds = this.state.values.map((obj)=>obj.id);
    const selectedItems = this.state.items.map((obj)=>{
      return selectedUserIds.includes(obj.id) ? {...obj, selected: true } : {...obj, selected: false };
    });
    this.setState({
      dialogVisible: true,
      items: selectedItems
    })
  }

  closeDialog = () => {
    const values = this.state.items.filter((obj)=>{
      return obj.selected && obj
    });
    this.setState({
      dialogVisible: false,
      values,
    }, ()=>{
      this.props.onChange(values);
    })
  }

  toggleItem = (item: IItemObject) => {
    const unique = [...this.state.selectedItems, item];
    const items = this.state.items.map((obj)=>{
      return obj.id == item.id ? {...obj, selected: !item.selected}: obj
    });
    this.setState({
      items
    });
  }

  renderUserList = ({item}:{item:IItemObject}) => {
    return (
      <TouchableOpacity key={item.id} style={[styles.listRow, item?.selected ? { backgroundColor: '#3f51b526'} : {}, item.disabled ? styles.disabledRow : {}]} disabled={item.disabled} onPress={this.toggleItem.bind(null, item)}>
        <Text style={[styles.listText, item.disabled ? styles.disabledText : {}]}>{item.label}</Text>
      </TouchableOpacity>
    );
  }

  renderSeparatorView = ({item}:{item:any}) => {
    return (
      <View style={styles.rowSeparator} />
    );
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.chipContainer}>
          {this.state.values.map((obj:any,index)=>(
            <Chip key={obj.id} onPress={() => console.log('Pressed')} style={styles.chipStyle} onClose={()=>this.removeChip(obj, index)} disabled={obj.disabled}>
              {obj.label}
            </Chip>
          )
          )}
          <Button mode="outlined" uppercase={false} onPress={this.openDialog} style={styles.btnStyle}>
            <Text style={{fontSize: 16}}>{'Add'}</Text>
          </Button>
        </View>

          <Modal
            animationType="slide"
            visible={this.state.dialogVisible}
            onRequestClose={this.closeDialog}
          >
            <View style={styles.modalView}>
              <Text style={styles.modalLable}>Select Users</Text>
              <View style={styles.listView}>
                <FlatList
                  contentContainerStyle={styles.listContainer}
                  data={this.state.items}
                  keyExtractor={(item: any) => item.id}
                  renderItem={this.renderUserList}
                  ItemSeparatorComponent={this.renderSeparatorView}

                />
               
              </View>
              <View>
                <TouchableOpacity style={{...styles.btnStyle, ...styles.btnStyle2}} onPress={this.closeDialog}>
                  <Text style={styles.btnText}>Done</Text>
                </TouchableOpacity>
              </View>
            </View>
        </Modal>

      </View>
    );
  }
}
