import React, { Component } from 'react';
import {
  AppRegistry,
  ListView,
  TouchableHighlight,
  ScrollView,
  StyleSheet,
  PanResponder,
  Image,
  Text,
  View,
  RefreshControl,
} from 'react-native';

import Platform from 'Platform';

//swipt
import SwipeitemView from 'react-native-swipe-left';

//ios第三方下拉组件
import PullDownRefreshView from './components/PullDown';

class AresRn extends Component {

  constructor(props) {
    super(props);
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this._dataRow = {};
    this.openRowId = '';
    this.state = {
      dataSource: ds.cloneWithRows(['row 1', 'row 2', 'row 3', 'row 4', 'row 5', 'row 6', 'row 7', 'row 8', 'row 9', 'row 10', 'row 11', 'row 12', 'row 13', 'row 14', 'row 15']),
      isShowToTop: false,
      isReFresh: false,
      scrollEnable: true,
      hasIdOpen: false
    };
  }

  _listView() {

    /*
     * android，ios都使用原生下拉刷新组件：
     */
    return (
      <ListView
        style={styles.listview}
        dataSource={this.state.dataSource}
        renderFooter={this._renderFooter.bind(this)}
        renderRow={this.rowRender.bind(this)}
        onEndReachedThreshold = {10}
        ref="listview"
        renderScrollComponent={(props)=>{
          return <ScrollView scrollEnabled={this.state.scrollEnable} {...props}/>
        }}
        refreshControl={
            <RefreshControl
                refreshing={this.state.isReFresh}
                onRefresh={this.PullDownRefresh.bind(this)}
                colors={['#ffffff', '#ffffff', '#ffffff']}
                progressBackgroundColor="#099fde"/>
        }/>
    );
  }

  PullDownRefresh() {
    let self = this;
    this.setState({
      isReFresh: true
    });

    setTimeout(function() {
      self.setState({
        isReFresh: false
      })
    }, 2000); 
  }

  render() {
    let listView = this._listView();
    return (
      <View style={{flex:1}}>
        <View style={styles.header}>
          <Text style={styles.headerText}>消息列表</Text>
        </View>
        {listView}
        {this.state.isShowToTop?<ScrollTopView root={this} scrollname='helloworld'></ScrollTopView>:null}
      </View>
    );
  }

  rowRender(data, a, b) {
    let rightBtn = this._rightButtons();
    let id = '' + a + b;
    return (
      <SwipeitemView 
        root={this}
        ref={(row)=>this._dataRow[id] = row}
        id={id}
        data={data}
        rightBtn={rightBtn}>

          <View style={{height: 54}}>
            <TouchableHighlight 
              onPress={
                ()=>{
                  alert('hi!');
                }}>
                <Text>hello world</Text>
            </TouchableHighlight>
          </View>

      </SwipeitemView>
    );
  }

  _rightButtons() {
    return [{
          id: 1,
          text: 'button',
          width: 80,
          bgColor: 'red',
          underlayColor: '#ffffff',
          onPress: ()=>{alert('delete1!');},
        }, {
          id: 2,
          image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFgAAABYCAYAAABxlTA0AAAEBUlEQVR4Ae2dz24bZRRHPR53EG9BlFXAaovwioh3cJCQ4iSKAgosEF3QLurswEkUsN8BVGiXMazLBtGQhdtESlet5NKi/BGSQyLZiUJVmMvvohnJshzjsefz3BnfI53N5HPGOqqcNPP9SUmBiGyYhbNwFd6FW/AJbMAmZF7CP+EzuAe3vLFr3muz0IYpCUZ5cwu+DVfgT17AsGh633PFu4c1ToEn4RewTqOj7t1zMqmBM3AebkGXosOFv8IFmElCYAd+DOskj7r33pw4Bk7Dj+A+yWffe6/puATOwR2KHzswJznwFfg1fEXx5RUswyvSAk/AGiWHh3BCSuA8PKXkcQrzUQa2YAm6lGxK0Bp1YBveofHhDrRHFdiBVRo/qtAxHdiGmzS+bELbVGALfk8KN7BMBF4nxWcj7MAfQJcUH5ebhBV4CraoE6XFbYYN/BrcI+Uy9rjRMIHLUOlNZdDA78C/odIbbpQLGjgNH5LSL49gOkjgZVKCstxv4NfhISlBOeR2/QT+nJRBufl/gR14RMqgcDunV+BFUoZlsVfgGgnhn6Pf6a+vbtH53DSd5a93lb/GY3isIGqXBb4qJu7Bczqff48j9iWP5dcI4mq3wBUSAv+r5HAXX35K7kmDLoO/xmN4LL9GEJXOwBZ8TkLwPhba4/aMzGPPZ98lQbyAVnvgayQIBGODj5fF9fbARRoxFysfemHMy/eKgGJ74PuJDlxcogi47we2YTMuHwcx+thoQpsDvwlJAxshy4HnNLAx5jjwqgY2xjoHvicxMP8QhAGuiQx8jwM/kBjYux7gmsjADzjwUw1sjKccuKGBjdHgwC0NbIxmikyigSkFX5JRNPCxBjZGK2X+78D6Q+4xGUV/TftZAxvjFw78jQY2xrcc+LYGNsZtDpzXwMaY4cBTGtgYU/4joxMNHDon/iMj9geRfw8uLgW4Ji7wj+1PlW/oE43QudEe+C0NHDrZzqlTL0RPkwqAe3rsT6cSM3WKrUQ60W/1Mw4zfNzjP/h7RT0hsGJo+qr5qaoxmdJ6TdQEbA7x32TrwvTwYQvepOzo4tZ0CYFZFnURTISLYNibNCjKLcMLEXUhooCltLqUlk3DR9Qvyk7QxeBszth2BrqdgW7IEYDyMDueOD3/86HUoDNMYPaNrpt/KtxkIqxtvWagSz6KC98Pe2O6DVKMbUzHWvAuKdzAMrk5aJXGlyq0dXvbGG9v65sZsw2av4MZ3WI8vluM6yb5BgLrMQ8SDyop60ElozlqZ5fixy7M6WFR4XNg+rAokzrwE/iM5PGb996cpBzYtwC3Bfxaty3gwD6jTsJSBEdOlhJ65KQemipF/9jfAlzrcuzvGfQ586496Tj2tyDt2N9/Ac1/sDfK46TXAAAAAElFTkSuQmCC',
          width: 80,
          bgColor: null,
          onPress: ()=>{alert('delete2!')}
        }, {
          id: 3,
          text: 'button',
          width: 80,
          bgColor: 'yellow',
          onPress: ()=>{alert('delete3!');},
        }]
  }

}

const styles = StyleSheet.create({
  listview:{
    flex: 1,
    backgroundColor: '#eeeeee'
  },
  header: {
    height : 50,
    paddingTop:15,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor : '#099fde'
  },
  headerText: {
    color: '#ffffff'
  },
  deletebtn: {
    flex: 1,
    width: 80,
    height: 74,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center'
  },
  btntext: {
      color: '#ffffff'
  },
  deleteBut: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AppRegistry.registerComponent('AresRn', () => AresRn);
