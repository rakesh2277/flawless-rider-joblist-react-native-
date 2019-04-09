
import React, { Component } from "react";
import { View, Text, FlatList, ActivityIndicator, ImageBackground, Image, TouchableOpacity, Modal } from "react-native";
import { Header, Title, Left, Button, Icon, Body } from 'native-base';
import axios from 'axios';
import { Col, Row, Grid } from "react-native-easy-grid";
import { SearchBar } from 'react-native-elements';
import styles from "./styl";
import CONFIG from '../../config';
import { connect } from 'react-redux';
import { updateText } from "../../actions/index";

class DeletAgent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      arrayholder: [],
      blankdata: [],
      loader: 0,
      keyId: '',
      _orderId: '',
      dataIndex: 0,
      tempState: 0,
      modalVisible: false,
      agentId: '',
      agent_data: [],
      assignid: '',
      assignorderid: ''
    }
  }

  componentDidMount() {
    let idnrole = this.props.updateText_1.updateText.split('|__|');
    this.setState({ agentId: idnrole[1], agentName: idnrole[2] })
    let that = this;
    axios({
      method: 'get',
      url: `${CONFIG.url}/getAllAgents.php`,
      responseType: 'json'
    })
      .then(function (response) {
        response.data != null && response.data != 'null' && response.data != '' ?
          that.setState({ agent_data: response.data.records, arrayholder: response.data.records })
          :
          that.setState({ agent_data: [], arrayholder: [], loader: 1 })
      });
  }
  deletAgentId = (item, index, id, agentName) => {
    axios({
      method: 'post',
      url: `${CONFIG.url}/deleteAgent.php?usertype=assignAgent&agentId=${item}`,
    }).then((response) => {
      console.log(response)
      if (response.data == 'Record deleted successfully ') {
        alert('your account is deleted');

      } else {
        alert('undefine')
      }
    })
  }
  searchFilterFunction = text => {
    const newData = this.state.arrayholder.filter(item => {
      const itemData = `${item.agentname.toUpperCase()}${item.agentname.toUpperCase()}${item.agentname.toUpperCase()}`;
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    })
    this.setState({ agent_data: newData });
  };
  render() {
    console.log(this.state.agent_data)
    const { goBack } = this.props.navigation;
    return (
      <View style={{}}>
        <Header androidStatusBarColor='#000' style={{ backgroundColor: '#000' }}>
          <Left>
            <Button transparent onPress={() => goBack()} >
              <Icon name='arrow-back' style={{ color: '#ffffff' }} />
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerBodyText}>Delete Agent</Title>
          </Body>
        </Header>
        <ImageBackground source={require('../../assets/bg.png')} style={styles.ImageBackgroundMyOrder}>
          <SearchBar
            placeholder="Type Here..."
            containerStyle={styles.backGroundColorMyOrder}
            placeholderTextColor='#ffffff'
            inputStyle={styles.searchbarStyle}
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false} />
          <Grid>
            {this.state.agent_data.length > 0 ?
              <View>
                <FlatList
                  data={this.state.agent_data}
                  extraData={this.state}
                  renderItem={({ item, key, index }) => (
                    <Row style={{ height: 78 }} key >
                      <Col style={styles.itemTitleWrapper_1}>
                        <Text style={styles.createdDate}>#{item.id}</Text>
                      </Col>
                      <Col style={styles.itemTitleWrapper_2}>
                        <Text style={styles.itemTitle}>{item.agentname}</Text>
                      </Col>
                      <Col style={styles.itemTitleWrapper_3}>
                        <Text style={styles.itemTitle}>{item.username}</Text>
                      </Col>
                      <Col style={styles.itemTitleWrapper_4}>
                        <TouchableOpacity onPress={() => this.deletAgentId(item.id, item.agentName)}>
                          <Text style={styles.itemTitleDelet}>Delete</Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>)}
                  keyExtractor={item => item.id} />
              </View> :
              <View style={styles.emptyData}>
                {this.state.loader == 0 ?
                  <Col style={styles.emptyData}>
                    <ActivityIndicator size="large" color="#ffffff" />
                  </Col>
                  :
                  <Col style={styles.emptyDataText}>
                    <Text style={styles.emptyDataInnerText}>Orders are Not Available</Text>
                  </Col>
                }
              </View>}
          </Grid>
        </ImageBackground >
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    updateText_1: state.userRole
  }
}
function mapDispatchToProps(dispatch) {
  return {
    updateText: (text) => dispatch(updateText(text)),
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DeletAgent)

