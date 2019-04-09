import React, { Component } from "react";
import { AsyncStorage } from 'react-native';
import Myorder from '../myorder';
import MyOrdersAgent from '../MyOrdersAgent';
import { View } from 'react-native';

export default class ScreenBasedOnUser extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userType: ''
        }
    }

    componentDidMount() {
        AsyncStorage.getItem('userflaw', (err, result) => {
            console.log(result);
            this.setState({ userType: result})
        })
    }

    render() {
        return (
            <View>
                {
                    this.state.userType == 'admin' ?
                        <Myorder navigation={this.props.navigation}/>
                        :
                        <View></View>
                }
                {
                    this.state.userType == 'agent' ?
                        <MyOrdersAgent navigation={this.props.navigation} />
                        :
                        <View></View>
                }
            </View>
        );
    }
}

