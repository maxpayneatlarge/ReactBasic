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

    async getPosts(){
        try{
            const resp  = await fetch('https://jsonplaceholder.typicode.com/posts');
            const postData = await resp.json();

            await postData.map( (object) => {
                object.name = this.state.users[object.userId].name;
                console.log(JSON.stringify(object));
                return object;
            });

            //const posts = processUsers(postData);
            this.setState({posts: postData});
        }catch(error){
            console.log("Error getting Posts: "+error);
        }
    }

    async getUsers(cb){
        const resp = await fetch("https://jsonplaceholder.typicode.com/users");
        const usersData = await resp.json();

        this.setState({users: usersData});
        cb();
    }

    // async getUserData(id){
    //     const uri = "https://jsonplaceholder.typicode.com/users?id=" + userId;
    //     var resp = await fetch(uri);

    // }
    // async function getPosts() {
    //     try {
    //         var resp = await fetch('https://jsonplaceholder.typicode.com/posts')
    //         var posts = await resp.json()
    //         //processUsers(posts)
    //     } catch (error) {
    //         console.log("error->" + error)
    //     }
    // }
    //   async function processUsers(posts) {
    //     var users = {}
    //     try {
    //       for (var i = 0; i < posts.length; i++) {
    //         var post = posts[i]
    //         var userId = post.userId
    //         var user = null
    //         if (users[userId]) {
    //           user = users[userId]
    //         } else {
    //           var userUri = "https://jsonplaceholder.typicode.com/users?id=" + userId
    //           var resp2 = await fetch(userUri)
    //           user = await resp2.json()
    //           users[userId] = user
    //         }
    //         document.write("post: " + JSON.stringify(post))
    //         document.write("<br/><br/>")
    //         document.write("user:" + JSON.stringify(user))
    //         document.write("<br/><hr/><br/>")
    //       }
    //     } catch (error) {
    //       console.log("error")
    //     }
    //   }
    //   getPosts()

      render() {
        const {posts} = this.state;
        const {users} = this.state;
          return(
              <div>
                <div className="header">Test Header
                </div>
                <div className="body">
                    
                {posts.map(post =>
                    <div key={post.id}>
                    
                        {post.title}
                    </div>
                    )}

                    {users.map(user =>
                    <div key={user.id}>
                    
                        {user.name}
                    </div>
                    )}  
                </div>
            </div>
          );
      }
}

export default Posts;