import React from "react";

class Tile extends React.Component{
    constructor(props){
        super(props);
        this.state={
            style:{
                aspectRatio:"1",
                float:"left"
            }
        }
    }
    static getDerivedStateFromProps(props, state){
        
        return {
            style:{backgroundColor:props.color,aspectRatio:"1",
            float:"left"}
        }
    }

render(){

    return<div className="game-tile" style={this.state.style}></div>
}


};

export default Tile;