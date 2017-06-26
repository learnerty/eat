import React from 'react'

let eats = ['白菜','香蕉','菠萝','西瓜','豆芽','豆腐','苹果','草莓','蓝莓','黄瓜','梨','西红柿','樱桃','桃子','李子','杏','火龙果'];
class App extends React.Component{
  constructor(){
    super();
    this.state={
      start:false,
      which:'请开始选择',
      what:[]
    }
  }
  getRandom(m, n){
    return Math.floor(Math.random()*(n-m)+m)
  }
  renderBg(){
    let oldWhat = this.state.what;
    for(var i=0;i<oldWhat.length;i++){
      if(oldWhat[i].opacity<=0){
        oldWhat.splice(i,1);
        i--;
      }else{
        oldWhat[i].opacity-=5;
      }
    }
    if(oldWhat.length<20 && this.state.start){
      oldWhat = [
        ...oldWhat,
        {
          top: this.getRandom(0,95),
          left: this.getRandom(0,95),
          opacity: 100,
          title: eats[Math.floor(Math.random()*eats.length)],
          id: Date.now()
        }
      ]
    }
    if(oldWhat.length === 0){
      clearInterval(this.startBg)
    }
    this.setState({what: oldWhat})
  }
  handleStart(){
    clearInterval(this.interval)
    if(!this.state.start){
      clearInterval(this.startBg)
      this.interval=setInterval(()=>{
        this.setState({which:eats[Math.floor(Math.random()*eats.length)]})
      },100)
      this.startBg = setInterval(()=>this.renderBg(),50)
    }
    this.setState({
      start:!this.state.start
    })
  }
  render(){
    return(
      <div className='play'>
        <div>
          {
            this.state.what.map( item=>
              <p key={item.id} style={{top:`${item.top}vh`,left:`${item.left}vw`,opacity:`${item.opacity/100}`}}>{item.title}</p>
            )
          }
          <h1>今天吃什么：{this.state.which}</h1>
          <button onClick={this.handleStart.bind(this)}>{this.state.start ? '停止' : '开始'}</button>
        </div>
      </div>
    )
  }
}

export default App
