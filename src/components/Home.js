import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class Home extends Component{
    render(){
        return(
            <>
                <h1>Snake game</h1>
                <p>This is game made by react</p>
                <Link to="/game">Play game!</Link>
            </>
        )
    }
};

export default Home;
