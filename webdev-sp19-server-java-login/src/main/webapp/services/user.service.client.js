/**
 * This is a Javascript service for admin
 * it serves as the middle layer between client JS and api	
 */

function AdminUserServiceClient() {


    this.createUser = createUser;
    this.findAllUsers = findAllUsers;
    this.findUserById = findUserById;
    this.deleteUser = deleteUser;
    this.updateUser = updateUser;
    this.searchUser = searchUser;
    this.url = 'http://localhost:8080/api/user';
    var self = this;
    
    
    /**
     * Send request to api to create user
     * returns a promise with a new user
     */
    function createUser(user, callback) {
        
        const promise = new Promise((resolve, reject) => {
							var data = JSON.stringify({
				                "id": null,
				                "username": user.username,
				                "password": user.password,
				                "firstName": user.firstName,
								"lastName": user.lastName,
								"role": user.role 
							});
              
              var xhr = new XMLHttpRequest();
              xhr.withCredentials = true;
              
              xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                  resolve(JSON.parse(this.responseText));
                }
              });
              
              xhr.open("POST", this.url+"/createUser");
              xhr.setRequestHeader("Content-Type", "application/json");
              xhr.setRequestHeader("cache-control", "no-cache");
              xhr.setRequestHeader("Postman-Token", "caf1dc73-961c-4c79-ab84-5c206a2ab9db");
              
              xhr.send(data);
          });  
      

       return promise;

    }
    
    /**
     * Send request to api to find all user
     * returns a promise with all users
     */
    
    function findAllUsers(callback) {
    	return fetch(this.url)
        .then(function(response) {
            return response.json();
        });
    }
    
    /**
     * Send request to api to fetch a user with a ID
     * returns a promise with a user
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

      		xhr.open("GET", this.url+"/"+userId);
      		xhr.setRequestHeader("Content-Type", "application/json");
      		xhr.setRequestHeader("cache-control", "no-cache");
      		xhr.setRequestHeader("Postman-Token", "d4cfa94a-6962-4c4c-a413-482821f4622b");

      		xhr.send(data)    	
    	
    	});
    	
    	return promise;
    }
    
    /**
     * Send request to api to update user
     * returns a promise with a new user
     */
    function updateUser(userId, user, callback) {
    	
    	const promise = new Promise((resolve, reject) => {
	    		var data = JSON.stringify({
	                "id": userId,
	                "username": user.username,
	                "password": user.password,
	                "firstName": user.firstName,
					"lastName": user.lastName,
					"role": user.role 
				});

    		var xhr = new XMLHttpRequest();
    		xhr.withCredentials = true;

    		xhr.addEventListener("readystatechange", function () {
    		  if (this.readyState === 4) {
        			resolve(JSON.parse(this.responseText));
    		  }
    		});

    		xhr.open("PUT", this.url+"/updateUser?strid="+userId);
    		xhr.setRequestHeader("Content-Type", "application/json");
    		xhr.setRequestHeader("cache-control", "no-cache");
    		xhr.setRequestHeader("Postman-Token", "52eb2f5a-e5e2-4083-a253-b09fd34bf42a");

    		xhr.send(data);
    	});
    	return promise;
    }
    
    /**
     * Send request to api to delete user corresponding to a ID
     * returns a promise with a boolean
     */
    	
    function deleteUser(userId, callback) {
    	
    const promise = new Promise((resolve, reject) => {
    	var data = JSON.stringify(false);

    	var xhr = new XMLHttpRequest();
    	xhr.withCredentials = true;

    	xhr.addEventListener("readystatechange", function () {
    	  if (this.readyState === 4) {
    	    resolve(JSON.parse(this.responseText));
    	  }
    	});

    	xhr.open("DELETE", this.url+"/deleteUser?id="+userId);
    	xhr.setRequestHeader("Content-Type", "application/json");
    	xhr.setRequestHeader("cache-control", "no-cache");
    	xhr.setRequestHeader("Postman-Token", "84c27046-38f6-466d-9b6d-68348732c29d");

    	xhr.send(data);
    });
    return promise;
    }

    /**
     * Send request to api to search user based on criteria
     * returns a promise with a users fitting the criteria
     */
    
    function searchUser(user, callback) {
    	
        const promise = new Promise((resolve, reject) => {
		    var data = JSON.stringify({
		    	  "id": null,
		    	  "username": user.username,
		    	  "password": user.password,
		    	  "firstName": user.firstName,
						"lastName": user.lastName,
						"role": user.role
		    	});
		
		    	var xhr = new XMLHttpRequest();
		    	xhr.withCredentials = true;
		
		    	xhr.addEventListener("readystatechange", function () {
		    	  if (this.readyState === 4) {
		    		  resolve(JSON.parse(this.responseText));
		    	  }
		    	});
		
		    	xhr.open("POST", this.url+"/searchUser");
		    	xhr.setRequestHeader("Content-Type", "application/json");
		    	xhr.setRequestHeader("cache-control", "no-cache");
		    	xhr.setRequestHeader("Postman-Token", "fa18de82-526a-4232-991c-01d665972057");
		
		    	xhr.send(data);
		    });
        return promise;
      }
}
