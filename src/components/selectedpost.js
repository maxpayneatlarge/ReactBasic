import React, { Component } from 'react';

class SelectedPost extends Component{
    constructor(){
        super();
        this.state={
            comments: [],
        }
    }
    async componentDidMount(){  
        console.log(this.props);
        await this.getComments();
        console.log(this.state.comments);

    }

    getComments = async () => {
        const resp = await fetch("https://jsonplaceholder.typicode.com/comments?postId="+this.props.activePost.id);
        const commentData = await resp.json();
        this.setState({comments: commentData});
    }

    render(){
        const {activePost} = this.props;
        const {comments} = this.state;
        return(
            <div className="postInfo">
                <h3 className="centered">Post Details</h3>
                <table>
                    <tbody>
                    <tr>
                        <td className="selectedPostHeaderCell noborder">Post Title: </td>
                        <td className="noborder">{activePost.title}</td>
                    </tr>
                    <tr>
                        <td className="selectedPostHeaderCell noborder">Post Body: </td>
                        <td className="noborder">{activePost.body}</td>
                    </tr>
                    <tr>
                        <td className="selectedPostHeaderCell noborder">User Name: </td>
                        <td className="noborder">{activePost.userName}</td>
                    </tr>
                    <tr>
                        <td className="selectedPostHeaderCell noborder">User Company:  </td>
                        <td className="noborder">{activePost.userCompanyName}</td>
                    </tr>
                    <tr>
                        <td className="selectedPostHeaderCell noborder">User Website:  </td>
                        <td className="noborder">{activePost.userWebsite}</td>
                    </tr>
                    <tr>
                        <td className="selectedPostHeaderCell noborder">Comments:  </td>
                        <td className="noborder">
                            <table>
                                <tbody>
                                    {comments.map(comment =>
                                        <tr key={comment.id}>
                                            <td className="noborder">{comment.body}<br />
                                            </td>
                                        </tr>
                                    )}
                                    
                                </tbody>
                            </table>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SelectedPost;