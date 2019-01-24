
(function(){
    
    
    var $usernameFld, $passwordFld, $lastNameFld;
    var $createBtn, $searchBtn, $roleFld;
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
        $lastNameFld = $("#lastNameFld");
        $roleFld = $("#roleFld");

        
        $createBtn = $("#createBtn");
        $createBtn.click(createUser);
    
        $searchBtn = $("#searchBtn");
        $searchBtn.click(searchUser);

        $editing = false;
    
        $userRowTemplate = $(".wbdv-template");
        $userRowTemplate.hide();

        $tbody = $("tbody");
        
        $cancelEditBtn = $("#cancelEditBtn");
        $editConfirmBtn = $("#editConfirmBtn");

        $cancelEditBtn.hide();
        $editConfirmBtn.hide();

        userService
            .findAllUsers()
            .then(renderUsers);     
    }


    /**
     * This function handles creation of all users
     */
    
    function createUser() { 
            
            if(!$usernameFld.val() ||
                !$passwordFld.val() || 
                !$firstNameFld.val() ||
                !$lastNameFld.val()){
                alert("All fields must be filled");
            }
        
            else{ 
                var user =
                {
                    id: null,
                    username: $usernameFld.val()+"", 
                    password: $passwordFld.val()+"",
                    firstName: $firstNameFld.val()+"",
                    lastName: $lastNameFld.val()+"",
                    role: $roleFld.val()+"" 
                };
                
                userService
                    .createUser(user)
                    .then(findAllUsers)
                    .then(renderUsers);
        }
    }

    /**
     * Finds all users
     */
    
    function findAllUsers() {
        return userService.findAllUsers();
    }
    
    
    /**
     * Finds the user corresponding to the ID
     */
    
    function findUserById(id) {
        return userService.findUserById(id);
    }

    
    /**
     * This function deletes the user
     */
    function deleteUser() { 
        var delButton = $(this);
        var delRow = delButton.parent().parent().parent().parent();
        
        var r = confirm("Are you sure?");
        if (r == true) {
            console.log(delButton.attr('deleteID'));
            userService.deleteUser(delButton.attr('deleteID'))
            .then(function(){
                delRow.remove();
            });    
        } 
    }

    function selectUser() { 
    // No contract for this method is present in the question
    
    }   

    
    /**
     * This function handles the search operation of the users
     */

    
    function searchUser(){
        var userRowEdit = $(".wbdv-form");
        var ufld = userRowEdit.find("#usernameFld").val();
        var fnfld = userRowEdit.find("#firstNameFld").val();
        var lnfld = userRowEdit.find("#lastNameFld").val();
        var pfld = userRowEdit.find("#passwordFld").val();
        var rfld = userRowEdit.find("#roleFld").val();
        var user = {
            id: null,
            username: ufld, 
            password: pfld,
            firstName: fnfld,
            lastName: lnfld,
            role: rfld
        };
        console.log(user);

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

    /**
     * This function updates the selected user
     */

    
    function updateUser() {
        if($editing === true){
            alert("Cannot edit two elements at one time \n Press Cancel button");
        }

        else {
    	var editButton = $(this);
        var editRow = editButton.parent().parent().parent().parent();
        var username = editRow.find(".wbdv-username").html();
        var firstname = editRow.find(".wbdv-first-name").html();
        var lastname = editRow.find(".wbdv-last-name").html();
        var password = editRow.find(".wbdv-password").html();
        var role = editRow.find(".wbdv-role").html();
        var editID = editButton.attr("editID");        

        var userRowEdit = $(".wbdv-form");
        userRowEdit.find("#usernameFld").val(username);
        userRowEdit.find("#firstNameFld").val(firstname);
        userRowEdit.find("#lastNameFld").val(lastname);
        userRowEdit.find("#passwordFld").val(password);
        userRowEdit.find("#roleFld").val(role);
        editRow.attr("bgcolor", "#FF0000");

 

        $editing = true;
        $cancelEditBtn.show();  
        $cancelEditBtn.click(function(){
            location.reload();
        })

        $editConfirmBtn.show();
        $editConfirmBtn.click(function(){

            var user =
                {
                    id: null,
                    username: userRowEdit.find("#usernameFld").val(), 
                    password: userRowEdit.find("#passwordFld").val(),
                    firstName: userRowEdit.find("#firstNameFld").val(),
                    lastName: userRowEdit.find("#lastNameFld").val(),
                    role: userRowEdit.find("#roleFld").val() 
                };

            userService.updateUser(editID, user)
            .then(function(){
                location.reload();
            });
        });

            $searchBtn.hide();
            $createBtn.hide();
        }
    }
    
    /**
     * This function to appends a single user to the list
     */
    
    function renderUser(user) { 
        var clone = $userRowTemplate.clone();
        clone.show();
        clone.find(".wbdv-username").html(user.username);
        clone.find(".wbdv-first-name").html(user.firstName);
        clone.find("#wbdv-remove").click(deleteUser);
        clone.find("#wbdv-remove").attr("deleteID", user.id+"");
        clone.find("#wbdv-edit").click(updateUser);
        clone.find("#wbdv-edit").attr("editID", user.id+"");
        $tbody.append(clone);
    }
    
    
    /**
     * Helper function to update the list of Users
     */
    
    function hideAllRows() {
        $userRowTemplate.parent().children().css("display","none");
        $(".wbdv-form").show();
    }

    
    /**
     * This function displays all the user on the roaster
     */
    
    function renderUsers(users) {
        hideAllRows();
        for(var u=0; u<users.length; u++) {
            var clone = $userRowTemplate.clone();
            clone.show();
            
            clone.find(".wbdv-username").html(users[u].username);
            clone.find(".wbdv-first-name").html(users[u].firstName);
            clone.find(".wbdv-last-name").html(users[u].lastName);
            clone.find(".wbdv-password").html('********');
            clone.find(".wbdv-date").html(new Date(users[u].id).toLocaleDateString());
            clone.find(".wbdv-role").html(users[u].role);
            clone.find("#wbdv-remove").click(deleteUser);
            clone.find("#wbdv-remove").attr("deleteID", users[u].id+"");
            clone.find("#wbdv-edit").click(updateUser);
            clone.find("#wbdv-edit").attr("editID", users[u].id+"");
            $tbody.append(clone);
        }
    }
})();