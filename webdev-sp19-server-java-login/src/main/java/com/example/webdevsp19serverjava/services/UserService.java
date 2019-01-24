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
	User alice = new User(new Date().getTime(), "alice", "Alice", "Wonderland", "Student");
	List<User> users = new ArrayList<>();

	public UserService() {
		users.add(alice);
	}

	@GetMapping("/api/user")
	public User[] findAllUser() {
		User[] userArr = new User[users.size()];
		for (int i = 0; i < userArr.length; ++i) {
			userArr[i] = users.get(i);
		}
		return userArr;
	}

	@GetMapping("/api/user/{userId}")
	public User findUserById(@PathVariable("userId") Long id) {
		for (User user : users) {
			if (id.equals(user.getId()))
				return user;
		}
		return null;
	}

	@PostMapping(path = "/api/user/createUser", consumes = "application/json", produces = "application/json")
	public User createUser(@RequestBody User user) {
		user.setId(new Date().getTime());
		users.add(user);
		return user;
	}

	@DeleteMapping(path = "/api/user/deleteUser")
	@ResponseBody
	public boolean deleteUser(@RequestParam("id") String strid) {		
		System.out.println(strid);
		Long id = Long.parseLong(strid);
		for (User user : users) {
			if (user.getId().equals(id)) {
				users.remove(user);
				return true;
			}
		}
		return false;
	}

	@PostMapping(path = "/api/user/searchUser", consumes = "application/json", produces = "application/json")
	public List<User> searchUsers(@RequestBody User searchUser) {
		List<User> user = new ArrayList<>();
		for (User temp : users) {
			if (searchUser.getFirstName() != null) {
				if(!temp.getFirstName().equals(searchUser.getFirstName())) {
					continue;
				}
			}
			if (searchUser.getLastName() != null) {
				if(!temp.getLastName().equals(searchUser.getLastName())) {
					continue;
				}
			}
			if (searchUser.getPassword() != null) {
				if(!temp.getPassword().equals(searchUser.getPassword())) {
					continue;
				}
			}
			if (searchUser.getUsername() != null) {
				if(!temp.getUsername().equals(searchUser.getUsername())) {
					continue;
				}
			}
			user.add(temp);

		}
		return user;
	}

	@PutMapping(path = "/api/user/updateUser")
	@ResponseBody
	public User updateUser(@RequestParam String strid, @RequestBody User user) {
		Long id = Long.parseLong(strid);
		for (int i = 0; i < users.size(); ++i) {
			if (users.get(i).getId().equals(id)) {
				users.remove(i);
				users.add(i, user);
				return users.get(i);
			}
		}
		return null;
	}
}
