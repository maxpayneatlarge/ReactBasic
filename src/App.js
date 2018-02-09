import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Posts from './components/posts';
import SelectedPost from './components/selectedpost';

class App extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      posts: [],
      view: ""
    }
  }
  
  async componentDidMount(){
      this.getUsers(this.getPosts);    
  }

  navigate = (view, selected) =>{
    if(view === 'posts'){
        this.setState({view: <Posts posts={this.state.posts}/>});
    } else if(view==='selectedpost'){
        this.setState({view: <SelectedPost posts={this.state.posts} selection={selected} />});
    }
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
          this.setState({view: <Posts posts={this.state.posts} state={this.state} />});
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
        {this.state.view}
        <Footer />
      </div>
    );
  }
}

export default App;
