/**
 * 
 */

function AdminUserServiceClient() {
    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.url = 'http://localhost:8080/api/user';
    var self = this;
    
    
    /**
     * 
     */
    function createUser(user, callback) {
        
        const promise = new Promise((resolve, reject) => {
            var data = JSON.stringify({
                "id": 123,
                "username": "alice",
                "password": null,
                "firstName": "Alice",
                "lastName": "Wonderland"
              });
              
              var xhr = new XMLHttpRequest();
              xhr.withCredentials = true;
              
              xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                  resolve(JSON.parse(this.responseText));
                }
              });
              
              xhr.open("POST", "http://localhost:8080/api/user/createUser");
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.setRequestHeader("cache-control", "no-cache");
              xhr.setRequestHeader("Postman-Token", "caf1dc73-961c-4c79-ab84-5c206a2ab9db");
              
              xhr.send(data);
          });  
      

       return promise;

    }
    
    /*
     * 
     */
    
    function findAllUsers(callback) {
    	return fetch(this.url)
        .then(function(response) {
            return response.json();
        });
    }
    
    /*
     * 
     */
    
    function findUserById(userId, callback) {

    	const promise = new Promise((resolve, reject) => {
        	var data = JSON.stringify(false);

      		var xhr = new XMLHttpRequest();
      		xhr.withCredentials = true;

      		xhr.addEventListener("readystatechange", function () {
      		  if (this.readyState === 4) {
      			resolve(JSON.parse(this.responseText));
      		  }
      		});

      		xhr.open("GET", "http://localhost:8080/api/user/234");
      		xhr.setRequestHeader("Content-Type", "application/json");
      		xhr.setRequestHeader("cache-control", "no-cache");
      		xhr.setRequestHeader("Postman-Token", "d4cfa94a-6962-4c4c-a413-482821f4622b");

      		xhr.send(data)    	
    	
    	});
    	
    	return promise;
    }
    
    /*
     * 
     */
    function updateUser(userId, user, callback) {
    	
    	const promise = new Promise((resolve, reject) => {
    	var data = JSON.stringify({
    		  "id": 234,
    		  "username": "bobi",
    		  "password": null,
    		  "firstName": "Bob",
    		  "lastName": "Marley"
    		});

    		var xhr = new XMLHttpRequest();
    		xhr.withCredentials = true;

    		xhr.addEventListener("readystatechange", function () {
    		  if (this.readyState === 4) {
        			resolve(JSON.parse(this.responseText));
    		  }
    		});

    		xhr.open("PUT", "http://localhost:8080/api/user/updateUser?id=234");
    		xhr.setRequestHeader("Content-Type", "application/json");
    		xhr.setRequestHeader("cache-control", "no-cache");
    		xhr.setRequestHeader("Postman-Token", "52eb2f5a-e5e2-4083-a253-b09fd34bf42a");

    		xhr.send(data);
    	});
    	return promise;
    }
    
    /*
     * 
     */
    	
    function deleteUser(userId, callback) {
    	
    const promise = new Promise((resolve, reject) => {
    	var data = JSON.stringify(false);

    	var xhr = new XMLHttpRequest();
    	xhr.withCredentials = true;

    	xhr.addEventListener("readystatechange", function () {
    	  if (this.readyState === 4) {
    	    console.log(this.responseText);
    	  }
    	});

    	xhr.open("DELETE", "http://localhost:8080/api/user/deleteUser?id=123");
    	xhr.setRequestHeader("Content-Type", "application/json");
    	xhr.setRequestHeader("cache-control", "no-cache");
    	xhr.setRequestHeader("Postman-Token", "84c27046-38f6-466d-9b6d-68348732c29d");

    	xhr.send(data);
    });
    return promise;
    }
}
