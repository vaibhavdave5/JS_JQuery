(function(){
    

    var $usernameFld, $passwordFld, $lastNameFld;
    var $createBtn, $searchBtn;
    var $firstNameFld;
    var $userRowTemplate, $tbody;
    var $editConfirmBtn, $cancelEditBtn;
    var $editing;
    var userService = new AdminUserServiceClient();
    $(main);

    function main() {
        $usernameFld = $("#usernameFld");
        $firstNameFld = $("#firstNameFld");
        $passwordFld = $("#passwordFld");
        $lastNameFld = $("#lastNameFld")
        $createBtn = $("#createBtn");
        $searchBtn = $("#searchBtn");
        $searchBtn.click(searchUser);

        $editing = false;
        $createBtn.click(createUser);
        $userRowTemplate = $(".wbdv-template");
        $tbody = $("tbody");
        $cancelEditBtn = $("#cancelEditBtn");
        $editConfirmBtn = $("#editConfirmBtn");

        $cancelEditBtn.hide();
        $editConfirmBtn.hide();
        $userRowTemplate.hide();
        
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
        var delButton = $(this);
        var delRow = delButton.parent().parent().parent().parent();
        userService.deleteUser(delButton.attr('deleteID'))
        .then(function(){
            delRow.remove();
        });
    }

    function selectUser() { 
    }   

    function searchUser(){
        var userRowEdit = $(".wbdv-form");
        var ufld = userRowEdit.find("#usernameFld").val();
        var fnfld = userRowEdit.find("#firstNameFld").val();
        var lnfld = userRowEdit.find("#lastNameFld").val();
        var pfld = userRowEdit.find("#passwordFld").val();
        var user = {
            id: 123,
            username: ufld, 
            password: fnfld,
            firstName: lnfld,
            lastName: pfld
        };
        
        if(!ufld){
            user.username = null;
        }
        if(!fnfld){
            user.firstName = null;
        }
        if(!lnfld){
            user.lastName = null;
        }
        if(!pfld){
            user.password = null;
        }

        userService.searchUser(user)
        .then(renderUsers);
    }

    function updateUser() {
        if($editing === true){
            alert("Cannot edit two elements at one time");
        }

        else {
    	var editButton = $(this);
        var editRow = editButton.parent().parent().parent().parent();
        var username = editRow.find(".username").html();
        var firstname = editRow.find(".firstName").html();
        var lastname = editRow.find(".lastName").html();
        var password = editRow.find(".password").html();
                
        var userRowEdit = $(".wbdv-form");
        userRowEdit.find("#usernameFld").val(username);
        userRowEdit.find("#firstNameFld").val(firstname);
        userRowEdit.find("#lastNameFld").val(lastname);
        userRowEdit.find("#passwordFld").val(password);
        editRow.attr("bgcolor", "#FF0000");

        var user;

        $editing = true;
        $cancelEditBtn.show();  
        $cancelEditBtn.click(function(){
            location.reload();
        })

        $editConfirmBtn.show();
        $editConfirmBtn.click(function(){
            userService.updateUser(user)
            .then(function(){
                location.reload();
            })
        });

            $searchBtn.hide();
            $createBtn.hide();
        }
    }
    
    function renderUser(user) { 
        var clone = $userRowTemplate.clone();
        clone.show();
        clone.find(".username").html(user.username);
        clone.find(".firstName").html(user.firstName);
        clone.find("#removeBtn").click(deleteUser);
        clone.find("#removeBtn").attr("deleteID", user.id+"");
        clone.find("#editBtn").click(updateUser);
        clone.find("#editBtn").attr("editID", user.id+"");
        $tbody.append(clone);
    }
    
    function hideAllRows() {
        $userRowTemplate.parent().children().css("display","none");
        $(".wbdv-form").show();
    }

    function renderUsers(users) {
        hideAllRows();
        for(var u=0; u<users.length; u++) {
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