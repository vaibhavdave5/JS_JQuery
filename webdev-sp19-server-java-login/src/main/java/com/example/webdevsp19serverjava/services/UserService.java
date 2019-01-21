package com.example.webdevsp19serverjava.services;

import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
	public User createUser(User user) {
		users.add(user);
		return user;
	}
	
	public void deleteUser(Integer id) {
		for(User user: users) {
			if(id.equals(user.getId()))
				users.remove(user);
				return;
		}
	}
	
	public User updateUser(Integer id, User user) {
		for(int  i=0 ; i <users.size(); ++i) {
			if(users.get(i).getId().equals(id)) {
				users.add(i, user);
				return users.get(i);
			}
		}
		return null;
	}
}
