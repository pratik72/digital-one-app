import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, DataTable } from 'react-native-paper';
import { COMMON, NAVIGATION } from '../../../constants';
import styles from './view-work-report.style';


export const ViewWorkReportScreen = (props: any) => {

    const [currentWorkReport, setWorkReportDetails] = useState(props.route.params.currentWorkReport);

    const openEditSite = () => {
      const {refreshData} = props.route.params;
      props.navigation.push(NAVIGATION.ADD_WORK_REPORT, {
        refreshData,
        currentWorkReport,
        setWorkReportDetails
      })
    }

    return (
      <View style={styles.container}>
        <View style={styles.btnContainer}>
          <Button mode="outlined" uppercase={false} onPress={openEditSite} style={styles.btnStyle}>
            <Text style={{fontSize: 16}}>{'Edit'}</Text>
          </Button>
        </View>

        <View style={{marginBottom: 1, flex: 1}}>
          <ScrollView>
            <DataTable>
              <DataTable.Row>
                <DataTable.Cell>Site</DataTable.Cell>
                <DataTable.Cell>{currentWorkReport.siteName}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Date</DataTable.Cell>
                <DataTable.Cell>{moment(currentWorkReport.date).format(COMMON.DATE_FORMAT)}</DataTable.Cell>
              </DataTable.Row>

              <DataTable.Row>
                <DataTable.Cell>Cement</DataTable.Cell>
                <DataTable.Cell>{currentWorkReport.cementAmount}</DataTable.Cell>
              </DataTable.Row>

            </DataTable>

            {!!currentWorkReport.Works.length && currentWorkReport.Works.map((workObj: any, id: any) => (
              <DataTable key={id}>
                <DataTable.Row>
                  <DataTable.Cell>Work Details</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Work Type</DataTable.Cell>
                  <DataTable.Cell>{workObj.workType}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Mason</DataTable.Cell>
                  <DataTable.Cell>{workObj.totalworker.mason}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Labour</DataTable.Cell>
                  <DataTable.Cell>{workObj.totalworker.labour}</DataTable.Cell>
                </DataTable.Row>

                <DataTable.Row>
                  <DataTable.Cell>Description</DataTable.Cell>
                  <DataTable.Cell>{workObj.workDescription}</DataTable.Cell>
                </DataTable.Row>

              </DataTable>
            ))}
          </ScrollView>
        </View>
      </View>
    );
}
