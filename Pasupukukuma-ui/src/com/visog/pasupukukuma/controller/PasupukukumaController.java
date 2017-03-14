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
	@RequestMapping(value ="/home",method=RequestMethod.GET)
	public String getHome(){
		
		return "masters/home";
	}

	@RequestMapping(value ="/gender",method=RequestMethod.GET)
	public String getGender(){
		
		return "masters/gender";
	}
	
	@RequestMapping(value ="/state",method=RequestMethod.GET)
	public String getState(){
		
		return "masters/state";
	}
	
	@RequestMapping(value ="/country",method=RequestMethod.GET)
	public String getCountry(){
		
		return "masters/country";
	}

	@RequestMapping(value ="/city",method=RequestMethod.GET)
	public String getCity(){
		
		return "masters/city";
	}
	
	@RequestMapping(value ="/raasi",method=RequestMethod.GET)
	public String getRaasi(){
		
		return "masters/raasi";
	}
	
	@RequestMapping(value ="/nakshatram",method=RequestMethod.GET)
	public String getNakshatram(){
		
		return "masters/nakshatram";
	}
	
	@RequestMapping(value ="/status",method=RequestMethod.GET)
	public String getStatus(){
		
		return "masters/status";
	}
	
	@RequestMapping(value ="/couponType",method=RequestMethod.GET)
	public String getCouponType(){
		
		return "masters/couponType";
	}
	
	@RequestMapping(value ="/puja",method=RequestMethod.GET)
	public String getPuja(){
		
		return "masters/puja";
	}
	@RequestMapping(value ="/pujaSamagri",method=RequestMethod.GET)
	public String getPujaSamagri(){
		
		return "masters/puja_Samagri";
	}
	
}
