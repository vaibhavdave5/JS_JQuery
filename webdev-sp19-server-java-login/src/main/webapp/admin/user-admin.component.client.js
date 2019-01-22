(function(){
    var $usernameFld, $passwordFld, $roleFld;
    var $removeBtn, $editBtn, $createBtn;
    var $firstNameFld, $lastNameFld;
    var $userRowTemplate, $tbody;
    var userService = new AdminUserServiceClient();
    $(main);

    function main() {
        $usernameFld = $("#usernameFld");
        $firstNameFld = $("#firstNameFld");
        $passwordFld = $("#passwordFld");
        $roleFld = $("#roleFld");
        $createBtn = $("#createBtn");
        $createBtn.click(createUser);
        
        $userRowTemplate = $(".wbdv-template");
        $tbody = $("tbody");
        
        $usernameFld.val("alice");
        
        userService
            .findAllUsers()
            .then(renderUsers);
    }
    function createUser() { 
    	var user =
    		{
    			id: 123,
    			username: $usernameFld, 
    			password: $passwordFld,
    			firstName: $firstNameFld,
    			lastName: $lastNameFld
    		}
    	
    	userService
            .createUser(user)
    		.then(renderUser);
    }

    function findAllUsers() {
        return userService.findAllUsers();
    }
    function findUserById() { 
    	
    }
    function deleteUser() { 
    	
    }
    function selectUser() { 
    	
    }
    function updateUser() {
    	
    }
    
    function renderUser(user) { 
        var clone = $userRowTemplate.clone();
        clone.find(".username").html(user.username);
        clone.find(".firstName").html(user.firstName);
        $tbody.append(clone);

    }
    
    function renderUsers(users) {
        for(var u=0; u<users.length; u++) {
            console.log(users[u]);
            var clone = $userRowTemplate.clone();
            clone.find(".username").html(users[u].username);
            clone.find(".firstName").html(users[u].firstName);
            $tbody.append(clone);
        }
    }
})();