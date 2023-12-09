import React from 'react';
import Tile from './Tile';
import './gamecontainer.css';
var tcount =0; 


class Game extends React.Component{
    constructor(props){
        super(props);
        this.state={
            gameMatrix:[],
            snakeList:[[1,1],[1,2],[2,2]],
            increment:[1,0],
            gameOver:false,
            food:[15,15],
            isFoodVisible:true
        }
    }
    generateFood = ()=>{
        return [parseInt(Math.random()*18),parseInt(Math.random()*18)];
    }
     gameTick=()=>{
        var body=[];
        this.state.snakeList.map((i)=>body.push(i));
        tcount=(tcount+1)%40;

        var newInc = this.state.increment;
        var newx = (this.state.snakeList[0][0]+newInc[0]), newy = (this.state.snakeList[0][1]+newInc[1]);
        body.unshift([newx%19, newy%19]);
              
        var newx = (this.state.snakeList[0][0]+newInc[0]), newy = this.state.snakeList[0][1]+newInc[1];
        if( this.state.snakeList.filter((i)=>{return i[0]==newx%19&&i[1]==newy%19}).length 
        || newx<0 || newx>18 || newy<0|| newy>18) this.setState({gameOver:true});    
        else{
            var food = this.state.food;
            var ifv=this.state.isFoodVisible;
            if(tcount = 39)
            {
                food=this.generateFood();
                ifv=true;
            }

            if(!(body[0][0]==food[0]&&body[0][1]==food[1])) body.pop();
            else ifv=false;
            
            this.setState({snakeList:body, food:food, isFoodVisible:ifv});
            }

    }

    componentDidMount(){
        this._isMounted=true;
        window.fnInterval= setInterval(this.gameTick,100);
        const keyboard= document.querySelector('body');
        keyboard.addEventListener('keydown', e=>{
            var newInc=this.state.increment;
            if(e.key == 'ArrowUp') newInc=[-1,0];
            else if(e.key == 'ArrowDown') newInc=[1,0];
            else if(e.key == 'ArrowLeft') newInc=[0,-1];
            else if(e.key =='ArrowRight') newInc=[0,1];        
            if(newInc[0]+this.state.increment[0]==0 && newInc[1]+this.state.increment[1]==0) return;
             this.setState({increment:newInc});
        })
    }
    static getDerivedStateFromProps(props,state){
        var temp=[];
        for(var i=0;i<19;i++){
            var temp2=[];
            for(var j=0;j<19;j++) temp2.push(0);
            temp.push(temp2);
        }

        temp[state.food[0]][state.food[1]] =2;

        state.snakeList.map((i)=>{
            var x=i[0], y=i[1]; 
            temp[x][y]=1;
        })
        return ({gameMatrix:temp});
    }
    renderGameMatrix=()=>{
        return this.state.gameMatrix.map((row)=>{
            return row.map((t)=>{
                if(t==2) return<Tile color ={this.state.isFoodVisible?
                    "red":"lightgrey"}/>
                return <Tile color={t?"blue":"lightgrey"}/>
            })
        })
    } 

    restartGame = ()=>{this.setState({gameOver:false,snakeList:[[1,1],[1,2],[2,2]], increment:[1,0]})}

    render(){
        return(
            (<div className="game-container">
               {
                this.state.gameOver?<> <p>Game Over</p> <button onClick={this.restartGame}>
                    Restart</button></>:this.renderGameMatrix()
               }
               <h1> {this.state.snakeList.length-3}</h1>
              
            </div>)
        )      
    }
};
export default Game;