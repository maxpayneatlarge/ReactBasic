import React, { Component } from 'react';
import './App.css';
import Posts from './components/posts';
import Header from './components/header';
import Footer from './components/footer';

class App extends Component {
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
    return (
      <div>
        <Header />
        <Posts posts={this.state.posts}/>
        <Footer />
      </div>
    );
  }
}

export default App;
