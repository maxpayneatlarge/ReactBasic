import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import Posts from './posts';
import SelectedPost from './selectedpost';

class Main extends Component{
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
    
    render(){
        return(
            <div>
                <Switch>
                    <Route exact path='/' render={()=><Posts posts={this.state.posts}/>}/>
                    <Route path='/post/:number' render={()=><SelectedPost posts={this.state.posts}/>}/>
                </Switch>
            </div>
        );
    }
}

export default Main;