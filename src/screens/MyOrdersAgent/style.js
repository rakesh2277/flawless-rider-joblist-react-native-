const React = require("react-native");
const { Dimensions, Platform } = React;
import color from "color";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default {
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
    backGroundColorMyOrder: {
        backgroundColor: '#3f3f3f'
    },
    backGroundColorBody: {
        backgroundColor: '#3f3f3f', justifyContent: 'center', alignItems: 'center'
    },
    cardItem: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 21, paddingBottom: 5, letterSpacing: 2
    },
    headerBodyText: {
        fontFamily: 'Enter-The-Grid', fontSize: 23, letterSpacing: 1, color:'#ffffff'
    },
    searchbarStyle: {
        backgroundColor: '#000000', color: '#ffffff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 15
    },
    wrapperMyOrder: {
        width: '18%', backgroundColor: '#3f3f3f', height: 78, borderRightColor: '#000', borderRightWidth: 1, justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 10, borderBottomLeftRadius: 10, padding: 10, marginLeft: '2%'
    },
    itemTitleWrapper: {
        width: '40%', backgroundColor: '#3f3f3f', height: 78, justifyContent: 'center', alignItems: 'flex-start', marginLeft: 10
    },
    itemTitle: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 17, paddingLeft: 5, paddingRight: 5
    },
    createdDate: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 14, paddingLeft: 5, paddingRight: 5, marginTop: 5
    },
    itemStatus: {
        minWidth: 90, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'
    },
    itemStatusText: {
        color: '#000', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 15, flexDirection: 'row'
    },
    itemPrice: {
        width: '18%', backgroundColor: '#000000', height: 78, justifyContent: 'center', alignItems: 'center', padding: 10, marginRight: '2%'
    },
    itemPriceText: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 15
    },
    actionSheetElements: {
        backgroundColor: '#000000', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', color: '#ffffff'
    },
    cardMain: {
        backgroundColor: '#3f3f3f', marginLeft: 10, marginRight: 10, paddingTop: 5, paddingBottom: 5, borderColor: 'transparent'
    },
    emptyData: {
        flex: 1, justifyContent: 'center', alignItems: 'center'
    },
    emptyDataText: {
        justifyContent: 'center', alignItems: 'center'
    },
    emptyDataInnerText: {
        color: '#fff', justifyContent: 'center', alignItems: 'center', fontFamily: 'Enter-The-Grid', fontSize: 18
    },
    ImageBackgroundMyOrder: {
        width: '100%', height: '100%'
    },
    blackBackgroundColor: {
        backgroundColor: '#000'
    },
    totalPrice: {
        fontSize: 16, color: '#fff', fontFamily: 'Enter-The-Grid', marginLeft:10,marginRight:10
    },
    totalPriceWrapper: {
        justifyContent: 'flex-end', alignItems: 'flex-end', height: 25, flexDirection: 'row', marginRight: 5, marginBottom: 10
    },
    filterWrapper: {
        flex: 1, justifyContent: 'center', alignItems: 'center', margin: 15, flexDirection: 'row'
    },
    filterText: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 18
    },
    filterText_pr: {
        color: '#fff', fontFamily: Platform.OS === 'ios' ? 'Chosence' : 'Chosence Regular', fontSize: 18, marginLeft: 10, marginRight: 10
    }
}