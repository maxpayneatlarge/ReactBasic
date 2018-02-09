import React, { Component } from 'react';
import '../App.css';

class Posts extends Component {
    constructor(){
        super();
        this.state = {
          users: [],
          posts: [],
        }
      }
    async componentDidMount(){
        this.getUsers(this.getPosts);

    }

    getPosts = async() => {
        try{
            const resp  = await fetch('https://jsonplaceholder.typicode.com/posts');
            const postData = await resp.json();

            postData.map( (object) => {
                this.state.users.forEach(user => {
                    if(user.id === object.userId){
                        object.userName = user.name;
                        object.userWebsite = user.website;
                        object.userPhone = user.phone;
                        object.userCompanyName = user.company.name;
                    }
                });
                return object;
            });

            //const posts = processUsers(postData);
            this.setState({posts: postData});
        }catch(error){
            console.log("Error getting Posts: "+error);
        }
    }

    getUsers = async(cb) => {
        const resp = await fetch("https://jsonplaceholder.typicode.com/users");
        const usersData = await resp.json();

        this.setState({users: usersData});
        cb();
    }

      render() {
        const {posts} = this.state;
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
                        <td>{post.title}</td><td>{post.userName}</td><td>{post.userWebsite}</td><td>{post.userPhone}</td><td>{post.userCompanyName}</td>
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