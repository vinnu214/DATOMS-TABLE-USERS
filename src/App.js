import React from "react";
import './App.css';

class App extends React.Component {
  state={
    users:[],
    userinput:"",userstobeShown:[]
  }
  componentDidMount(){
    fetch("https://reqres.in/api/users")
    .then( res =>  res.json())
    .then( res => {
      this.setState({users:res.data});
      this.setState({userstobeShown:res.data});
    })
  }
    inputHandler = ({name,value})=>{
     console.log(value)
     this.setState({userInput:value})
     const users = this.state.users;
     console.log(users)
     const updatedUsers= users.filter( user => {if(user.first_name.includes(value) ||user.last_name.includes(value)){
       return user;
     }} )
     console.log(updatedUsers)
     this.setState({userstobeShown:updatedUsers})

  }
  render(){
    const usersList = this.state.userstobeShown.map( user => {return <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.email}</td>
      <td>{user.first_name}</td>
      <td>{user.last_name}</td>
      <td><img alt="USer Icon" src={user.avatar}/></td>
    </tr>} )
    
    return (
    <div className="App">
    <div>
      <input type="text" name="username"  onChange ={(event)=>this.inputHandler(event.target)} value={this.state.userInput} />
    </div>
   
      <table className="users">
        <tr>
        <th>ID</th>
        <th>Email</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Avatar</th>
    </tr>
        {usersList.length > 0 ?usersList:<tr><td colSpan="5">No Users Found</td></tr>}
      </table>
      
    </div>
  );
    }
}

export default App;
