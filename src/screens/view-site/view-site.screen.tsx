import moment from 'moment';
import React from 'react';
import { Text, View } from 'react-native';
import { Button, DataTable } from 'react-native-paper';
import styles from './view-site.style';


export const ViewSiteScreen = (props: any) => {

    const {siteDetails} = props.route.params;
    return (
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <Button mode="outlined" uppercase={false}>
            <Text style={{fontSize: 16}}>{'Edit Site'}</Text>
          </Button>
        </View>

        <View>
          <DataTable>
            <DataTable.Row>
              <DataTable.Cell>Site Name</DataTable.Cell>
              <DataTable.Cell>{siteDetails.siteName}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Owner Name</DataTable.Cell>
              <DataTable.Cell>{siteDetails.ownerName}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Owner Contract No</DataTable.Cell>
              <DataTable.Cell>{siteDetails.ownerContactNo}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Address</DataTable.Cell>
              <DataTable.Cell>{siteDetails.siteAddress.AddressLine1}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>City</DataTable.Cell>
              <DataTable.Cell>{siteDetails.siteAddress.City}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>State</DataTable.Cell>
              <DataTable.Cell>{siteDetails.siteAddress.State}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Pincode</DataTable.Cell>
              <DataTable.Cell>{siteDetails.siteAddress.pincode}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Start Date</DataTable.Cell>
              <DataTable.Cell>{moment(siteDetails.tentativeDeadline).format('DD/MM/YYYY')}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Estimate</DataTable.Cell>
              <DataTable.Cell>{siteDetails.siteEstimate}</DataTable.Cell>
            </DataTable.Row>

            <DataTable.Row>
              <DataTable.Cell>Deadline</DataTable.Cell>
              <DataTable.Cell>{moment(siteDetails.tentativeDeadline).format('DD/MM/YYYY')}</DataTable.Cell>
            </DataTable.Row>

          </DataTable>
        </View>
      </View>
    );
}
