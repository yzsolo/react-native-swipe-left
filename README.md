# react-native-swipe-left
a RN component that give each row of listView the skill of swipe left.

### IOS && ANDROID
IOS | Android
-----|-------
![swipeleft ios preview](http://imgur.com/KswnF0X.gif) | ![swipeleft android preview](http://imgur.com/6FyHjft.gif)

IOS | Android
-----|-------
![swipeleft ios preview](http://imgur.com/e7FKKUs.gif) | ![swipeleft android preview](http://imgur.com/wuWThj7.gif)

### Features （特性）
RESOLVE | 解决
----------------- | ----- | ----------
the Opposite effect between two rows |（row之间的互斥收回）
button configurable（one or more, text/image, bgcolor, width,callback etc）|左边按钮的可配置化（可配置多按钮，文字/图片，背景色，宽度，回调) 
pressable in single row |单个row内的按钮或链接可点击
optional animation type, timing/spring |可选择滚动动画类型，timing/spring

### Installation
```
npm install --save react-native-swipe-left
```

### Usage example
see the example/example.js for a more detailed example.
```javascript
// 1, settings in your constructor
constructor(props) {
 	this._dataRow = {};
    this.openRowId = '';
    this.state = {
	    scrollEnable: true,
        hasIdOpen: false
    };
}

// 2, set scrollEnabled  
<ScrollView scrollEnabled={this.state.scrollEnable} {...props}/>

// 3, set your button`s setting
let rightBtn = [{
    id: 1,
	text: 'button',
	width: 80,
	bgColor: 'red',
	underlayColor: '#ffffff',
    onPress: ()=>{alert('delete1!');},
}, {
      id: 2,
      image: 'your uri',
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


// 4, in your renderRow function(a is sectionId, b is rowId)
let id = '' + a + b; 
<SwipeitemView 
    root={this}
    ref={(row)=>this._dataRow[id] = row}
    id={id}
    data={data}
    rightBtn={rightBtn}>
	{children node}
</SwipeitemView>
```


### Props

##### component:
Prop            | Type   | Optional  | Default    | Description
--------------- | ------ | --------- | ---------- | -----------
root            |   current component     | require   |            | current component
ref             |  function      | require   |            | it is row`s identity card
id              |   string     | require   |            | identity card
rightBtn        |   array     | require   |            | your buttons, one or more

##### row:
Prop            | Type   | Optional  | Default    | Description
--------------- | ------ | --------- | ---------- | -----------
boxbgColor      | string | Yes       | '#eeeeee'  | when you swipe the row a lot ,you`ll see this color
rowbgColor      | string | Yes       | '#ffffff'  | row`s bgColor
animationType   | string | Yes       | 'timing'   | animation type
duration        | number | Yes       | 150        | The animation process time

##### button:
Prop            | Type   | Optional  | Default    | Description
--------------- | ------ | --------- | ---------- | -----------
id              | number | require   |            | deal with the 'key' problem
text/image      | string | Yes   |            | use text or a image
width           | number | Yes   |            | the width of button
bgColor         | string | Yes   |            | backgroundColor of button
onPress         | function| Yes  |            | the callback when you press a button
underlayColor   | string | Yes   |            | the underlayColor of TouchableHighlight

