import React, { Component } from "react";
import { Text, ImageBackground, View, TouchableOpacity, ScrollView, KeyboardAvoidingView } from "react-native";
import { Body, Button, Container, Icon, Header, Title, Left, Input } from 'native-base';
import styles from "./style";
import axios from 'axios';
import CONFIG from '../../config';

export default class BlogPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogTitle: '',
            blogBody: '',
            downloadLink: ''
        }
    }

    downloadFormData = () => {
        // Add form download link ( Admin functionality )
        axios({
            method: 'post',
            url: `${CONFIG.url}/taxFileDownload.php?link=${this.state.downloadLink}`,
        })
            .then(function (response) {
                if (response.data == 'success') {
                    alert('Link Submitted Successfully');
                } else {
                    alert('Technical Error');
                }
            });
    }

    submitBlog = () => {
        // Add Blog Post ( Admin functionality )
        axios({
            method: 'post',
            url: `${CONFIG.url}/postBlogs.php?blogTitle=${this.state.blogTitle}&blogBody=${this.state.blogBody}`,
        })
            .then(function (response) {
                if (response.data == 'success') {
                    alert('Blog Submitted Successfully');
                } else if (response.data == 'exist') {
                    alert('This Blog Title is already available');
                } else {
                    alert('Technical Error');
                }
            });
    }

    render() {
        const { goBack } = this.props.navigation;
        return (
            <Container style={{}}>
                <Header androidStatusBarColor='#000' style={{ backgroundColor: '#000' }}>
                    <Left>
                        <Button transparent onPress={() => goBack()} >
                            <Icon name='arrow-back' style={{ color: '#ffffff' }} />
                        </Button>
                    </Left>
                    <Body>
                        <Title style={styles.bodyTitle}>News Post</Title>
                    </Body>
                </Header>
                <ImageBackground source={require('../../assets/bg.png')} style={styles.imageBackground}>
                    <KeyboardAvoidingView behavior="padding" enabled>
                        <ScrollView style={styles.mainWrap}>
                            <View style={styles.textAreaContainerfirst}>
                                <Input
                                    secureTextEntry={false}
                                    placeholder="Blog Title"
                                    placeholderTextColor="#FFFFFF"
                                    onChangeText={(blogTitle) => { this.setState({ blogTitle }); }}
                                    value={this.state.blogTitle}
                                    style={styles.formInput}
                                />
                                {this.state.error == 1 ? <Icon style={styles.error} name='close-circle' /> : null}
                            </View>
                            <View style={styles.textAreaContainer} >
                                <Input
                                    style={styles.formInput}
                                    placeholderTextColor="#FFFFFF"
                                    placeholder="News Content"
                                    numberOfLines={15}
                                    multiline={true}
                                    value={this.state.blogBody}
                                    onChangeText={(blogBody) => { console.log(blogBody); this.setState({ blogBody }); }}
                                />
                            </View>
                            <View style={{ height: 50 }}>
                                <TouchableOpacity style={styles.postSubmitButton} onPress={() => this.submitBlog()}>
                                    <Text style={styles.postSubmitButtonText}>Submit</Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ borderWidth: 4, margin: 10 }}></Text>
                            <View style={styles.textAreaContainerfirst} >
                                <Input
                                    style={styles.formInput}
                                    placeholderTextColor="#FFFFFF"
                                    placeholder="Add File Download Link"
                                    numberOfLines={15}
                                    multiline={true}
                                    value={this.state.downloadLink}
                                    onChangeText={(downloadLink) => { console.log(downloadLink); this.setState({ downloadLink }); }}
                                />
                            </View>
                            <View style={{ height: 50 }}>
                                <TouchableOpacity style={styles.postSubmitButton} onPress={() => this.downloadFormData()}>
                                    <Text style={styles.postSubmitButtonText}>Add Link</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </KeyboardAvoidingView>
                </ImageBackground>
            </Container>
        );
    }
}
