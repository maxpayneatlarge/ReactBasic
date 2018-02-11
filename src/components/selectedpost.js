import React, { Component } from 'react';

class SelectedPost extends Component{
    constructor(){
        super();
        this.state={
            comments: [],
        }
    }
    async componentDidMount(){  
        await this.getComments();
    }

    getComments = async () => {
        const resp = await fetch("https://jsonplaceholder.typicode.com/comments?postId="+this.props.activePost.id);
        const commentData = await resp.json();
        this.setState({comments: commentData});
    }

    showAlbums = (id, name) =>{
        this.props.setSelectedUser(id, name);
    }

    render(){
        const {activePost} = this.props;
        const {comments} = this.state;
        return(
            <div className="postInfo">
                <h3 className="centered">Post Details</h3>
                <br />
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
                        <td className="noborder"><span className="link" onClick={() => this.showAlbums(activePost.userId, activePost.userName)}>{activePost.userName}</span></td>
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
                                            <td className="noborder borderBottom">{comment.body}<br />
                                            <span className="commentByLine">By: {comment.email}</span>
                                            
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