package com.doj.spring4.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/")
public class HelloSpring4Controller {
	
	@RequestMapping("/New")
	public ModelAndView New() {
		return new ModelAndView("main/New");
	}
	
	@RequestMapping("/user")
	public ModelAndView user() {
		return new ModelAndView("main/user");
	}


	@RequestMapping(value = "/roles", method = RequestMethod.GET)
	public String roles() {
		return "master/roles";
	}
	
	@RequestMapping(value = "/country", method = RequestMethod.GET)
	public String country() {
		return "master/country";
	}
	
	
	@RequestMapping(value = "/city", method = RequestMethod.GET)
	public String city() {
		return "master/city";
	}
	
	
	@RequestMapping(value = "/state", method = RequestMethod.GET)
	public String state() {
		return "master/state";
	}
	
	@RequestMapping(value = "/status", method = RequestMethod.GET)
	public String status() {
		return "master/status";
	}
	
	@RequestMapping(value = "/gender", method = RequestMethod.GET)
	public String gender() {
		return "master/gender";
	}
	
	@RequestMapping(value = "/raasi", method = RequestMethod.GET)
	public String raasi() {
		return "master/raasi";
	}
	
	@RequestMapping(value = "/nakshatram", method = RequestMethod.GET)
	public String nakshatram() {
		return "master/nakshatram";
	}
	
	@RequestMapping(value = "/puja", method = RequestMethod.GET)
	public String puja() {
		return "master/puja";
	}
	
	@RequestMapping(value = "/pujaSamagri", method = RequestMethod.GET)
	public String pujasamagri() {
		return "master/pujaSamagri";
	}
	
	@RequestMapping(value = "/address", method = RequestMethod.GET)
	public String address() {
		return "transactional/address";
	}
	
	@RequestMapping(value = "/pujaOrder", method = RequestMethod.GET)
	public String pujaOrder() {
		return "transactional/pujaOrder";
	}
	
}
