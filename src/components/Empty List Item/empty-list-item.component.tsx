import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import styles from './empty-list-item.style';


export const EmptyListItem = () =>  {
    return (
      <View style={styles.listView}>
        <Text style={styles.text}>Record Not Found</Text>
      </View>
    );
}
