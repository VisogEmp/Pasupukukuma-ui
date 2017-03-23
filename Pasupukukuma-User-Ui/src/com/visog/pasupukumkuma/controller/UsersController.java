package com.visog.pasupukumkuma.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class UsersController {

	@RequestMapping(value = "/home", method = RequestMethod.GET)
	public String home() {
		return "users/home";
	}
	
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index() {
		return "users/index";
	}
}
