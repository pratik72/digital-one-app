import moment from 'moment';
import React, { Fragment, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { LabelValueRow } from '../../../components';
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
            <View style={styles.scrollWrapper}>
              <LabelValueRow label="Id" value={currentWorkReport.workId}/>
              <LabelValueRow label="Site" value={`${currentWorkReport.siteId} - ${currentWorkReport.siteName}`}/>
              <LabelValueRow label="Date" value={moment(currentWorkReport.date).format(COMMON.DATE_FORMAT)}/>
              <LabelValueRow label="Cement" value={currentWorkReport.cementAmount}/>

              {!!currentWorkReport.Works.length && currentWorkReport.Works.map((workObj: any, id: any) => (
                <Fragment key={id}>
                  <LabelValueRow label="Work Details" value={""}/>
                  <LabelValueRow label="Work Type" value={workObj.workType}/>
                  <LabelValueRow label="Mason" value={workObj.totalworker.mason}/>
                  <LabelValueRow label="Labour" value={workObj.totalworker.labour}/>
                  <LabelValueRow label="Description" value={workObj.workDescription}/>

                </Fragment>
              ))}
            </View>

          </ScrollView>
        </View>
      </View>
    );
}
