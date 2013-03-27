/**
 *  Name	:	CEEP IE7 - Complete Emulated Element Prototype IE
 *	Author	:	ayecue
 *	Version	:	1.0.4.0
 *	Date	:	27.03.2013
 *
 *	Description:	
 *
 *	Enable you to work with Element prototypes in the IE. Emulates a normal Element Object. Also works with jQuery.
 */
(function() {
	"use strict";
	
	var MAIN = window,
		KEYWORD = 'Element',
		OBJECT = MAIN[KEYWORD],
		DOC = document;
		
	if (!OBJECT)
	{
		var CORELABEL = 'prototype',
			DUMMYEVENT = 'onpropertychange',
			PROTOLABEL = 'data-hasExtendedPrototype';
		
		DOC.write('<'+CORELABEL+'>');
		
		var protoHas = {},
			protoRegs = [],
			protoKeys = [],
			proto = {},
			update = function(){
				var p = event.propertyName;
			
				if (!protoHas[p])
					protoKeys.push(p);
				
				protoHas[p]=proto[CORELABEL][p];
				for (var index = protoRegs.length; index--; protoRegs[index][p]=protoHas[p]);
			},
			extend = function(a,r){
				if (a[PROTOLABEL] && DOC == r) return a;
				
				var index = protoKeys.length;
				
				if (index)
				{
					for (var match; match = protoKeys[--index]; a[match] = protoHas[match]);
				
					add(['cloneNode'],extend,a);
					protoRegs.push(a);
					a[PROTOLABEL]=true;
				}
			
				return a;
			},
			multi = function(a,r){if (a) for (var index = a.length; index--; extend(a[index],r)); return a;},
			replace	= function(a,b,r){var c=r[a]; r[a]=function(){return b(c.apply(r,arguments),r);};},
			add	= function(a,b,r){for (var index = a.length; index--; replace(a[index],b,r));};
			
		proto[CORELABEL]=DOC.getElementsByTagName(CORELABEL)[0];
		proto[CORELABEL].attachEvent(DUMMYEVENT,update);
		add(['createElement','getElementById'],extend,DOC);
		add(['getElementsByName','getElementsByTagName'],multi,DOC);
		
		MAIN[KEYWORD] = proto;
	}
}).call(this);
