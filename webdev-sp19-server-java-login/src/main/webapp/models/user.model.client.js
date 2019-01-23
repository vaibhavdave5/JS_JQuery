/**
 * 
 */

function User(username, password, firstName, lastName) {
  this.username = username;
  this.password = password;
  this.lastName = lastName;
  this.firstName = firstName;
 
  this.setUsername = setUsername;
  this.getUsername = getUsername;
  
  this.setPassword = setPassword;
  this.getPassword = getPassword;
  
  this.setLastName = setLastName;
  this.getLastName = getLastName;
  
  this.setFirstName = setFirstName;
  this.getFirstName = getFirstName;
  
  
  function setUsername(username) {
    this.username = username;
  }
  function getUsername() {
    return this.username;
  }
  
  
  function setLastName(lastName) {
	    this.lastName = lastName;
  }
  function getLastName() {
	    return this.lastName;
  }
  
  
  
  function setPassword(password) {
	    this.password = password;
	  }
  function getPassword() {
	   return this.password;
  }
  
	
  function setFirstName(firstName) {
	    this.firstName = firstName;
	  }
  function getFirstName() {
	    return this.firstName;
   }
  }
	  
	  