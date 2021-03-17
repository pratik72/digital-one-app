import * as React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

import styles from './loader.style';


export const Loader = () =>  {
    return (
      <ActivityIndicator animating={true} color={Colors.deepPurpleA700} />
    );
}
