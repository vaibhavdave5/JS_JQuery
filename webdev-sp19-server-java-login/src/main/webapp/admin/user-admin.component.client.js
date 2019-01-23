(function(){
    var $usernameFld, $passwordFld, $roleFld;
    var $removeBtn, $editBtn, $createBtn;
    var $firstNameFld, $lastNameFld;
    var $userRowTemplate, $tbody;
    var userService = new AdminUserServiceClient();
    var $hiddenRow;
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
        
        $userRowTemplate.hide();

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
    	console.log($(this).attr('deleteID'));
    }
    function deleteUser() { 
        var delButton = $(this);
        var delRow = delButton.parent().parent();

        userService.deleteUser($(this).attr('deleteID'))
        .then(function(){
            console.log("All good");
            console.log(delRow);
            delRow.remove();
        });
        
    } 
    function selectUser() { 
    	
    }
    function updateUser(id) {
    	
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
            clone.show();
            clone.find(".username").html(users[u].username);
            clone.find(".firstName").html(users[u].firstName);
            clone.find("#removeBtn").click(deleteUser);
            clone.find("#removeBtn").attr("deleteID", users[u].id+"");
            clone.find("#editBtn").click(updateUser);
            clone.find("#editBtn").attr("editID", users[u].id+"");
            $tbody.append(clone);
        }
    }
})();