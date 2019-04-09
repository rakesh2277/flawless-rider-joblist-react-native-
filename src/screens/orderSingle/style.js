const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
    backgroundColor: {
        backgroundColor: '#3f3f3f'
    },
    bodyTitle: {
        fontFamily: 'Enter-The-Grid', fontSize: 23, letterSpacing: 1
    },
    imageBackground: {
        width: '100%', height: '100%'
    },
    firstCard: {
        borderColor: 'transparent', backgroundColor: '#3f3f3f', marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5, borderColor: 'transparent'
    },
    firstCardBody: {
        backgroundColor: '#3f3f3f', justifyContent: 'center', alignItems: 'center'
    },
    firstCardBodyText: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 21, paddingBottom: 5, letterSpacing: 2
    },
    firstCardBodyText_sec: {
        color: '#fff', fontSize: 15, paddingBottom: 5, letterSpacing: 2
    },
    secondView: {
        alignItems: 'center', justifyContent: 'center'
    },
    secondViewText: {
        color: '#fff',  fontSize: 12, paddingBottom: 5, letterSpacing: 1, marginTop: 20
    },
    additionalDetails: {
        borderColor: 'transparent', backgroundColor: '#3f3f3f', marginBottom: 20, marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5
    },
    statusofOrder: {
        color: '#fff', fontFamily: 'Enter-The-Grid', fontSize: 12
    },
    activeStatus: {
        backgroundColor: 'yellow', padding: 10, margin: 5, borderRadius: 8
    },
    completedStatus: {
        backgroundColor: '#6FDA44', padding: 10, margin: 5, borderRadius: 8
    },
    stuckStatus: {
        backgroundColor: '#ff0000', padding: 10, margin: 5, borderRadius: 8
    },
    priorityStatus: {
        backgroundColor: '#f26522', padding: 10, margin: 5, borderRadius: 8
    },
    startStopStatus: {
        color: '#fff', fontFamily: 'Enter-The-Grid', fontSize: 15, letterSpacing: 2
    },
    startStatusWrp: {
        backgroundColor: 'grey', padding: 10, borderRadius: 8
    },
    stopStatusWrp: {
        backgroundColor: '#DA8A8B', padding: 10, borderRadius: 8
    },
    customerInfoWrp: {
        borderColor: 'transparent', backgroundColor: '#000000', marginBottom: 20, marginTop: 20, marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5
    },
    customernotewrap: {
        backgroundColor: '#000000', justifyContent: 'center', alignItems: 'center'
    },
    customernotewrapcust: {
        backgroundColor: '#000000', justifyContent: 'center', alignItems: 'flex-start'
    },
    agentHistory: {
        borderColor: 'transparent', backgroundColor: '#3f3f3f', marginBottom: 20, marginLeft: 10, marginRight: 10, paddingTop: 5
    },
    statusAllWrapper: {
        backgroundColor: 'transparent', borderColor: 'transparent', backgroundColor: 'transparent'
    },
    statusAllWrapperInner: {
        justifyContent: 'center', alignItems: 'center'
    },
    statusAllWrapperFirstInner: {
        justifyContent: 'space-around', flexDirection: "row"
    },
    statusTextActive: {
        color: '#000', fontFamily: 'Enter-The-Grid', fontSize: 12, letterSpacing: 1
    },
    statusNeedSupport: {
        marginBottom: 90, borderColor: 'transparent', backgroundColor: 'transparent', marginLeft: 10, marginRight: 10
    },
    backgroundTranparent: {
        backgroundColor: 'transparent'
    },
    backgroundNeedSupport: {
        backgroundColor: 'purple', padding: 10, margin: 5, borderRadius: 8
    },
    backgroundNeedSupportText: {
        color: '#fff', fontFamily: 'Enter-The-Grid', fontSize: 13, letterSpacing: 1
    },
    wrapperNeedSupportText: {
        backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center'
    },
    dataEmpty: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    allTransparent: {
        backgroundColor: 'transparent', borderColor: 'transparent'
    },
    blackBackground: {
        backgroundColor: '#000000'
    }
}