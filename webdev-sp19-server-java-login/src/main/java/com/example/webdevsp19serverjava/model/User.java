package com.example.webdevsp19serverjava.model;

/**
 * This object represents an abstract representation of User Object
 *  
 * @author Vaibhav
 *
 */
public class User {
	private Long id;
	private String username;
	private String password;
	private String firstName;
	private String lastName;
	private String role;
	
	public User() {}
	
	public User(Long id, 
				String username,
				String firstName, 
				String lastName,
				String role) {
		this.id = id;
		this.username = username;
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
	}
	
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	
	@Override
	public String toString() {
		return "fName "+ firstName + System.lineSeparator()+
				"lName "+ lastName + System.lineSeparator()+
				"uName "+ username + System.lineSeparator()+
				"password "+ password + System.lineSeparator();
	}
	
	@Override
	public boolean equals(Object obj) {
		if(obj == null) {
			return false;
		}
		
		if (!(obj instanceof User)) {
			return false;
		}
		
		User u = (User)obj;
		
		return (this.firstName.equals(u.firstName)
				&&this.lastName.equals(u.lastName)
				&&this.username.equals(u.username)
				&&this.role.equals(u.role)
				);
	}
}
