const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
    bodyTitleText: {
        fontFamily: 'Enter-The-Grid', fontSize: 22, letterSpacing: 1, color:'#ffffff'
    },
    buttonTopBar: {
        color: '#fff', fontFamily: 'Enter-The-Grid', fontSize: 23, letterSpacing: 2
    },
    topBarAgentName: {
        color: '#fff', fontSize: 18, letterSpacing: 2
    },
    topBarAgentNameM: {
        color: '#BBB', fontSize: 18, letterSpacing: 2
    },
    textItem_time: {
        color: '#fff',  fontSize: 18, paddingBottom: 10, paddingLeft: 15, letterSpacing: 2
    },
    imgBackground: {
        width: '100%', height: '100%'
    },
    imgBackgroundInnerView: {
        flexDirection: "row", justifyContent: 'space-around', marginTop: 20, marginBottom: 20
    },
    inboxButton: {
        backgroundColor: '#014197', padding: 20,
    },
    cardWrapper: {
        backgroundColor: '#3f3f3f', marginBottom: 20, marginLeft: 10, marginRight: 10, paddingTop: 10, paddingBottom: 10
    },
    backgroundColor: {
        backgroundColor: '#3f3f3f'
    },
    cardFirstText: {
        color: '#fff',  fontSize: 21, paddingBottom: 10, letterSpacing: 2
    },
    cardFirstTextNop: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 21, paddingBottom: 10, letterSpacing: 2, justifyContent:'center', alignItems:'center'
    },
    cardFirstTextNopWrp:{
        justifyContent: 'center', alignItems: 'center'
    },
    cardSecondText: {
        color: '#fff', fontFamily: 'Enter-The-Grid', fontSize: 23, paddingBottom: 15, letterSpacing: 2, lineHeight: 25
    },
    cardFourthText: {
        color: '#fff', fontSize: 16, paddingBottom: 10, paddingLeft: 15, letterSpacing: 2
    },
    cardFifthTextWrapper: {
        flexDirection: "row", paddingLeft: 15, paddingBottom: 10, flexWrap:'wrap'
    },
    blackBackground: {
        backgroundColor: '#000'
    }
}