import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, DataTable } from 'react-native-paper';
import { COMMON, NAVIGATION } from '../../../constants';
import styles from './view-material.style';


export const ViewMaterialScreen = (props: any) => {

    const [currentMaterial, setMaterialDetails] = useState(props.route.params.currentMaterial);

    const openEditMaterial = () => {
      const {refreshData} = props.route.params;
      props.navigation.push(NAVIGATION.ADD_MATERIAL, {
        refreshData,
        currentMaterial,
        setMaterialDetails
      })
    }

    return (
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <Button mode="outlined" uppercase={false} onPress={openEditMaterial} style={styles.btnStyle}>
            <Text style={{fontSize: 16}}>{'Edit'}</Text>
          </Button>
        </View>

        <View style={{marginBottom: 1, flex: 1}}>
          <ScrollView>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>Site</DataTable.Cell>
                <DataTable.Cell>{currentMaterial.siteName}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Date</DataTable.Cell>
                <DataTable.Cell>{moment(currentMaterial.date).format(COMMON.DATE_FORMAT)}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Invoice Number</DataTable.Cell>
                <DataTable.Cell>{currentMaterial.invoiceNo}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Material Name</DataTable.Cell>
                <DataTable.Cell>{currentMaterial.materialType}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Unit</DataTable.Cell>
                <DataTable.Cell>{currentMaterial.materialUnit}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Quantity</DataTable.Cell>
                <DataTable.Cell>{currentMaterial.materialTotalQuantity}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Per Unit Price</DataTable.Cell>
                <DataTable.Cell>{currentMaterial.pricePerUnit}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Invoice Price</DataTable.Cell>
                <DataTable.Cell>{currentMaterial.invoicePrice}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Supplier</DataTable.Cell>
                <DataTable.Cell>{currentMaterial.supplier}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Remark</DataTable.Cell>
                <DataTable.Cell>
                  <View style={{flex: 1}}>
                    <Text>{`${currentMaterial.remarks || ''}`}</Text>
                  </View>
                </DataTable.Cell>
              </DataTable.Row>

            </DataTable>

          </ScrollView>
        </View>
      </View>
    );
}
