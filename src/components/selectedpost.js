import React, { Component } from 'react';

class SelectedPost extends Component{

    async componentDidMount(){  
        console.log(this.props);
    }

    render(){
        return(
            <div>
                Post Details:
            </div>
        );
    }
}

export default SelectedPost;