const React = require("react-native");
const { Dimensions, Platform } = React;

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
    backgroundColor: {
        backgroundColor: '#3f3f3f'
    },
    bodyTitle: {
        fontFamily: 'Enter-The-Grid', fontSize: 23, letterSpacing: 1,color:'#ffffff'
    },
    rowFirstColumn: {
        backgroundColor: '#3f3f3f', borderRightColor: '#000', borderRightWidth: 2, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, padding: 5, marginLeft: 10
    },
    rowFirstColumnDownload:{
        backgroundColor: '#3f3f3f',  justifyContent: 'center', alignItems: 'center',  padding: 5, marginLeft: 10
    },
    rowFirstColumnText: {
        color: '#fff', fontFamily: 'Enter-The-Grid', fontSize: 20
    },
    rowSecColumn: {
        backgroundColor: '#3f3f3f', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 10, borderBottomRightRadius: 10, padding: 10, marginRight: 10
    },
    rowSecColumnText: {
        color: '#fff', fontFamily: 'RobotoCondensed-Light', fontSize: 20, lineHeight: 22
    },
    formInput: {
        backgroundColor: "transparent",
        borderWidth: 0,
        borderRadius: 0,
        elevation: 0,
        shadowOpacity: 0,
        shadowRadius: 0,
        color: '#fff',
        fontFamily: 'Chosence Light',
        fontSize: 18,
        paddingLeft: 12,
        letterSpacing: 5,
        marginTop: 10,
    },
    imageBackground: {
        width: '100%', height: '100%'
    },
    textAreaContainer: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        height: 250,
        marginTop: 15
    },
    textAreaContainerfirst: {
        borderColor: 'grey',
        borderWidth: 1,
        padding: 5,
        height: 80,
        marginTop: 15
    },
    textArea: {
        height: 100,
        justifyContent: "center"
    },
    postSubmitButton: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginTop: 15,
        padding: 5
    },
    postSubmitButtonText: {
        color: '#000000',
        fontFamily: 'Chosence Light',
        backgroundColor: "#ffffff",
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 20
    },
    mainWrap: {
        width: deviceWidth - 20,
        marginLeft: 10,
        marginRight: 10
    },
    actionSheetTextStyle: {
        fontSize: 16, fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', color: '#ffffff', justifyContent: 'center', alignItems: 'center'
    },
    actionSheetTextStyle_c: {
        fontSize: 16, fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', color: '#000000', justifyContent: 'center', alignItems: 'center'
    },
    startAction: {
        width: '100%', backgroundColor: 'grey', justifyContent: 'center', alignItems: 'center', flex: 1
    },
    activeAction: {
        width: '100%', backgroundColor: 'yellow', justifyContent: 'center', alignItems: 'center', flex: 1
    },
    priorityAction: {
        width: '100%', backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center', flex: 1
    },
    stuckAction: {
        width: '100%', backgroundColor: 'red', justifyContent: 'center', alignItems: 'center', flex: 1
    },
    needSupportAction: {
        width: '100%', backgroundColor: 'purple', justifyContent: 'center', alignItems: 'center', flex: 1
    },
    completedAction: {
        width: '100%', backgroundColor: '#6FDA44', justifyContent: 'center', alignItems: 'center', flex: 1
    },
    cancleAction: {
        width: '100%', backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', flex: 1
    },
    filterText: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 18
    },
    wrapperMyOrder: {
        width: '18%', backgroundColor: '#3f3f3f', height: 78, borderRightColor: '#000', borderRightWidth: 1, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, padding: 10, marginLeft: '2%'
    },
    itemStatus: {
        minWidth: 90, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
    },
    itemStatusText: {
        color: '#000', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 15, flexDirection: 'row'
    },
    itemTitle: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 17, paddingLeft: 5, paddingRight: 5
    },
    createdDate: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 14, paddingLeft: 5, paddingRight: 5, marginTop: 5
    },
    itemTitleWrapper: {
        width: '40%', backgroundColor: '#3f3f3f', height: 78, justifyContent: 'center', alignItems: 'center'
    },
    reservedAgent: {
        color: '#000', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 12
    },
    itemPrice: {
        width: '18%', backgroundColor: '#000000', height: 78, justifyContent: 'center', alignItems: 'center', padding: 10, marginRight: '2%'
    },
    itemPriceInputField: {
        borderColor: '#ffffff', borderWidth: 1, color: '#fff', fontSize: 12
    },
    backGroundColorMyOrder: {
        backgroundColor: '#3f3f3f'
    },
    backGroundColorBody: {
        backgroundColor: '#3f3f3f', justifyContent: 'center', alignItems: 'center'
    },
    cardItem: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 21, paddingBottom: 5, letterSpacing: 2
    },
    cardMain: {
        backgroundColor: '#3f3f3f', marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5, borderColor: 'transparent'
    },
    emptyData: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    emptyDataText: {
        borderRightWidth: 1, justifyContent: 'center', alignItems: 'center'
    },
    emptyDataInnerText: {
        color: '#fff', justifyContent: 'center', alignItems: 'center', fontFamily: 'Enter-The-Grid', fontSize: 18
    },
    actionSheetElements: {
        backgroundColor: '#000000', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', color: '#ffffff'
    },
    headerBodyText: {
        fontFamily: 'Enter-The-Grid', fontSize: 23, letterSpacing: 1
    },
    filterWrapper: {
        flex: 1, justifyContent: 'center', alignItems: 'center', margin: 15, flexDirection: 'row'
    },
    searchbarStyle: {
        backgroundColor: '#000000', color: '#ffffff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 15
    },
    ImageBackgroundMyOrder: {
        width: '100%', height: '100%'
    }
}