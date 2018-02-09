import React, { Component } from 'react';
import '../App.css';

class Posts extends Component {
    
    showPost(id){
        console.log("showPostWasClicked, id: "+id);
    }

    render() {
    const {posts} = this.props;
        return(
            <div>
            <div className="body">
            <table>
                <thead className="headerRow">
                    <tr>
                        <td>Post Title</td><td>Posted By</td><td>Poster's Website</td><td>Poster's Phone Number</td><td>Poster's Company</td>
                    </tr>
                </thead>
            <tbody>
            {posts.map(post =>
                <tr key={post.id}>
                    <td className="leftAlign"><span className="link" onClick={(e) => this.showPost(post.id, e)}>{post.title}</span></td><td className="leftAlign">{post.userName}</td><td className="leftAlign">{post.userWebsite}</td><td className="rightAlign">{post.userPhone}</td><td className="leftAlign">{post.userCompanyName}</td>
                </tr>
                )}
                </tbody>
            </table> 
            </div>
        </div>
        );
    }
}

export default Posts;