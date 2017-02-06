package com.visog.pasupukukuma.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class PasupukukumaController {
	
	
	@RequestMapping(value ="/roles",method=RequestMethod.GET)
	public String getRoles(){
		
		return "masters/roles";
	}

	
}
