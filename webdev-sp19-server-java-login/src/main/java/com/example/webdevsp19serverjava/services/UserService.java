package com.example.webdevsp19serverjava.services;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.webdevsp19serverjava.model.User;

import java.util.*;

@RestController
public class UserService {
	User alice = new User(123, "alice", "Alice", "Wonderland");
	User bob   = new User(234, "bob", "Bob", "Marley");
	List<User> users = new ArrayList<>();
	
	public UserService() {
		users.add(alice);
		users.add(bob);
	}
	
	@GetMapping("/api/user")
	public User[] findAllUser() {
		User[] userArr = new User[users.size()];
 		for(int i=0 ; i < userArr.length ; ++i) {
 			userArr[i] = users.get(i);
 		}
		return userArr;
	}
	
	@GetMapping("/api/user/{userId}")
	public User findUserById(@PathVariable("userId") Integer id) {
		for(User user: users) {
			if(id == user.getId().intValue())
				return user;
		}
		return null;
	}
	
	@PostMapping(path = "/api/user/createUser", consumes = "application/json", produces = "application/json")
	public User createUser(@RequestBody User user) {
		users.add(user);
		return user;
	}
	
	@DeleteMapping(path = "/api/user/deleteUser")
	@ResponseBody
	public void deleteUser(@RequestParam("id") Integer id) {
		for(User user: users) {
			if(user.getId().equals(id)) {
				users.remove(user);
				return;
		 }
		}
		
	}
	
	
	@PutMapping(path = "/api/user/updateUser")
	@ResponseBody
	public User updateUser(@RequestParam Integer id, @RequestBody User user) {
		for(int  i=0 ; i <users.size(); ++i) {
			if(users.get(i).getId().equals(id)) {
				users.add(i, user);
				return users.get(i);
			}
		}
		return null;
	}
}
