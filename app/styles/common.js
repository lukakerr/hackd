import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  center: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
  },
  text: {
    // fontFamily: "PingFangSC-Light",
  },
  icon: {
    width: 15,
    height: 15,
  },
  flex: {
    flex: 1,
  },
  textCenter: {
    textAlign: 'center',
  },
  error: {
    textAlign: 'center',
    fontSize: 20,
    opacity: 0.8,
  },
  backgroundWhite: {
    backgroundColor: '#FFF',
  },
  cell: {
    flexDirection: 'row',
    height: 44,
    paddingLeft: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cellText: {
    fontSize: 17,
  },
  cellValue: {
    fontSize: 17,
    marginRight: 16,
    color: '#8E8E93',
  },
  cellSwitch: {
    marginRight: 16,
  },
});
