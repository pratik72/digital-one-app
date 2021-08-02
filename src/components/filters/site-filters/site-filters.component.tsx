import React, {useEffect, useState} from 'react';

import styles from './site-filters.style';
import {View, Text, ScrollView} from 'react-native';
import {FilterModal} from '../../filter-modal/filter-modal.component';
import {Button, Colors, IconButton} from 'react-native-paper';
import {DateTimePickerComponent, MultiSelect} from '../..';
import {getAllSites} from '../../../services';
import moment from 'moment';
import {COMMON} from '../../../constants';
import {StartEndDateToggle} from './start-end-date-toggle';

interface IFilterModalProps {
  showModalFlag: boolean;
  closeCallback?: CallableFunction;
  setFilterCallback: CallableFunction;
}

export const SiteFilters = (props: IFilterModalProps) => {
  const [showModalFlag, toggleModalFlag] = useState(
    props.showModalFlag || false,
  );
  const [selectedSites, setSelectedSites] = useState([] as Array<any>);
  const [allSitesAsOption, setAllSitesAsOption] = useState([] as Array<any>);

  const [siteInaugurationDateFrom, setSiteInaugurationDateFrom] = useState(
    moment().toDate() as Date,
  );

  const [siteInaugurationDateTo, setSiteInaugurationDateTo] = useState(
    moment().toDate() as Date,
  );

  const [tentativeDeadlineFrom, setTentativeDeadlineFrom] = useState(
    moment().toDate() as Date,
  );

  const [tentativeDeadlineTo, setTentativeDeadlineTo] = useState(
    moment().toDate() as Date,
  );

  const fetcAllSiteData = async (searchText: string) => {
    const xhrRespond = await getAllSites(
      searchText ? {siteName: searchText} : {page: 1},
    );
    if (xhrRespond.data[0] && xhrRespond.data[0].data) {
      console.log('xhrRespond.data[0].data', xhrRespond.data[0].data);
      const sitesOptions: Array<{}> = [];
      for (let index = 0; index < xhrRespond.data[0].data.length; index++) {
        const element = xhrRespond.data[0].data[index];
        sitesOptions.push({
          value: element.siteId,
          label: element.siteName,
          id: element.siteId,
        });
      }

      return sitesOptions;
    }
    return [];
  };

  useEffect(() => {
    toggleModalFlag(props.showModalFlag);
  }, [props.showModalFlag]);

  const closeDialog = () => {
    toggleModalFlag(false);
    props.closeCallback && props.closeCallback(false);
  };

  const applyFilter = () => {
    props.setFilterCallback({
      site: selectedSites,
      siteInaugurationDateFrom: moment(siteInaugurationDateFrom).format(
        COMMON.PARAM_DATE_FORMAT,
      ),
      siteInaugurationDateTo: moment(siteInaugurationDateTo).format(
        COMMON.PARAM_DATE_FORMAT,
      ),
      tentativeDeadlineFrom: moment(tentativeDeadlineFrom).format(
        COMMON.PARAM_DATE_FORMAT,
      ),
      tentativeDeadlineTo: moment(tentativeDeadlineTo).format(
        COMMON.PARAM_DATE_FORMAT,
      ),
    });
    closeDialog();
  };

  const siteInaugurationCallback = ({
    startDate,
    endDate,
  }: {
    startDate: Date;
    endDate: Date;
  }) => {
    console.log(startDate, endDate);
    setSiteInaugurationDateFrom(startDate);
    setSiteInaugurationDateTo(endDate);
  };

  return (
    <FilterModal showModalFlag={showModalFlag} closeCallback={closeDialog}>
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.fldContainer}>
            <Text style={styles.labelText}>Sites</Text>
            <MultiSelect
              values={selectedSites}
              items={allSitesAsOption}
              onChange={(val: any) => {
                setSelectedSites(val);
              }}
              label="Site"
              apiData={fetcAllSiteData}
              isDefaultData={true}
              multiple={true}
            />
          </View>

          <View style={styles.fldContainer}>
            <StartEndDateToggle
              startDate={siteInaugurationDateFrom}
              endDate={siteInaugurationDateTo}
              changeCallback={siteInaugurationCallback}
              label="Site Start Date"
            />
          </View>
          <View style={styles.fldContainer}>
            <View style={styles.labelView}>
              <Text style={styles.labelText}>Site Start Date</Text>
            </View>
            <View style={styles.controlView}>
              <View style={styles.startDate}>
                <DateTimePickerComponent
                  label="From"
                  values={siteInaugurationDateFrom}
                  onChange={(date: Date) => setSiteInaugurationDateFrom(date)}
                />
              </View>
              <View style={styles.endDate}>
                <DateTimePickerComponent
                  label="To"
                  values={siteInaugurationDateTo}
                  onChange={(date: Date) => setSiteInaugurationDateTo(date)}
                />
              </View>
            </View>
          </View>

          <View style={styles.fldContainer}>
            <Text style={styles.labelText}>Site End Date</Text>
            <View style={styles.controlView}>
              <View style={styles.startDate}>
                <DateTimePickerComponent
                  label="From"
                  values={tentativeDeadlineFrom}
                  onChange={(date: Date) => setTentativeDeadlineFrom(date)}
                />
              </View>
              <View style={styles.endDate}>
                <DateTimePickerComponent
                  label="To"
                  values={tentativeDeadlineTo}
                  onChange={(date: Date) => setTentativeDeadlineTo(date)}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.btnView}>
          <Button
            mode="contained"
            uppercase={false}
            style={styles.btn}
            onPress={applyFilter}>
            <Text style={styles.filterBtnTxt}>{'Filter'}</Text>
          </Button>
          <Button
            mode="contained"
            uppercase={false}
            onPress={closeDialog}
            style={styles.btn}>
            <Text style={styles.filterBtnTxt}>{'Cancel'}</Text>
          </Button>
        </View>
      </View>
    </FilterModal>
  );
};
