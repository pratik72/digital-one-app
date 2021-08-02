import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },
  fldContainer: {
    marginTop: 10,
  },
  btnText: {
    fontSize: 14,
    color: Colors.cyanA700,
  },
  btnView: {
    justifyContent: 'space-evenly',
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  activeBtnView: {
    borderColor: Colors.cyanA700,
    borderWidth: 1,
  },
  btn: {
    marginHorizontal: 5,
  },
  labelText: {
    fontSize: 16,
    width: 200,
    fontWeight: 'bold',
  },
  controlView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  startDate: {
    marginRight: 10,
    flex: 1,
  },
  endDate: {
    flex: 1,
  },
  filterBtnTxt: {
    fontSize: 16,
  },
  labelView: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#0000001f',
    marginBottom: 10,
  },
});

export default styles;
