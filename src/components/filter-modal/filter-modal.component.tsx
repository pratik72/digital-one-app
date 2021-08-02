import React, {ReactElement, useEffect, useState} from 'react';

import styles from './filter-modal.style';
import {Modal, View} from 'react-native';

interface IFilterModalProps {
  showModalFlag: boolean;
  closeCallback?: CallableFunction;
  children: ReactElement;
}

export const FilterModal = (props: IFilterModalProps) => {
  const [showModalFlag, toggleModalFlag] = useState(
    props.showModalFlag || false,
  );

  useEffect(() => {
    toggleModalFlag(props.showModalFlag);
  }, [props.showModalFlag]);

  const closeDialog = () => {
    toggleModalFlag(false);
    props.closeCallback && props.closeCallback(false);
  };

  return (
    <Modal
      animationType="slide"
      visible={showModalFlag}
      onRequestClose={closeDialog}>
      <View style={styles.container}>{props.children}</View>
    </Modal>
  );
};
