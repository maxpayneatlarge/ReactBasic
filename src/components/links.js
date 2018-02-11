import React, {Component} from 'react';

class Links extends Component{
    render(){
        return(
            <div className="links">
                <a href="#posts" onClick={() => this.props.navigate("posts")}>Posts</a>
            </div>
        );
    }
}

export default Links;