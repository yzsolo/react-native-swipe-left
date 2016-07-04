# react-native-swipe-left
a RN component that give each row of listView the skill of swipe left.

### IOS && ANDROID
IOS | Android
-----|-------
![swipeleft ios preview](http://imgur.com/KswnF0X.gif) | ![swipeleft android preview](http://imgur.com/6FyHjft.gif)

IOS | Android
-----|-------
![swipeleft ios preview](http://imgur.com/e7FKKUs.gif) | ![swipeleft android preview](http://imgur.com/wuWThj7.gif)

### 满足
功能 | 完成度
----------------- | ----- | ----------
row之间的互斥收回 | down | 
左边按钮的可配置化（可配置多按钮，文字/图片，背景色，宽度，回调) | down
单个row内的按钮或链接可点击|                down
可选择滚动动画类型，timing/spring|  down

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

