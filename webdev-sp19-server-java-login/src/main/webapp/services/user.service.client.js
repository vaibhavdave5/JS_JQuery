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
       
       
        
        // var settings = {
    	// 	"async": true,
    	//     "crossDomain": true,
    	//     "url": "http://localhost:8080/api/user/createUser",
    	// 	"method": "POST",
    	// 	"headers": {
    	// 		"Content-Type": "application/json",
    	// 		"cache-control": "no-cache",
    	// 		"Postman-Token": "10f4c357-38c5-4150-8255-f42a6b16be3b"
    	// 	 },
    	// 	 "processData": false,
    	// 		 "data": "{\n        \"id\": 123,\n        \"username\": \"alice\",\n        \"password\": null,\n        \"firstName\": \"Alice\",\n        \"lastName\": \"Wonderland\"\n}"
        //     }

    	// 	$.ajax(settings).done(function (response) {
        //         return Promise.resolve(response);
        //      });
    }
    
    function findAllUsers(callback) {
    	return fetch(this.url)
        .then(function(response) {
            return response.json();
        });
    }
    function findUserById(userId, callback) { }
    function updateUser(userId, user, callback) {  }
    function deleteUser(userId, callback) {  }
}
