import moment from 'moment';
import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { LabelValueRow } from '../../../components';
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
            <View style={styles.scrollWrapper}>

                <LabelValueRow label="Id" value={currentMaterial.metId}/>
                <LabelValueRow label="Site" value={`${currentMaterial.siteId} - ${currentMaterial.siteName}`}/>
                <LabelValueRow label="Date" value={moment(currentMaterial.date).format(COMMON.DATE_FORMAT)}/>
                <LabelValueRow label="Invoice Number" value={currentMaterial.invoiceNo}/>
                <LabelValueRow label="Material Name" value={currentMaterial.materialType}/>
                <LabelValueRow label="Unit" value={currentMaterial.materialUnit}/>
                <LabelValueRow label="Quantity" value={currentMaterial.materialTotalQuantity}/>
                <LabelValueRow label="Per Unit Price" value={currentMaterial.pricePerUnit}/>
                <LabelValueRow label="Invoice Price" value={currentMaterial.invoicePrice}/>
                <LabelValueRow label="Supplier" value={currentMaterial.supplier}/>
                <LabelValueRow label="Remark" value={currentMaterial.remarks}/>
               
            </View>

          </ScrollView>
        </View>
      </View>
    );
}
