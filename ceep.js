/**
 *  Name	:	CEEP IE7 - Complete Emulated Element Prototype IE
 *	Author	:	ayecue
 *	Version	:	1.0.0.0
 *	Date	:	21.03.2013
 *
 *	Description:	
 *
 *	Enable you to work with Element prototypes in the IE. Emulates a normal Element Object. Also works with jQuery.
 */
(function() {
	"use strict";
	
	if (!window.Element)
	{
		var Element						= 	{
												prototype : {},
												prototypeKeys : [],
												register : function(){
													var a = this.prototypeKeys = [];
												
													for (var proto in this.prototype)
														a.push(proto);
															
													return a;
												},
												extend : function(a){
													if (this.prototypeKeys.length == 0) this.register();
													
													for (var b = this.prototypeKeys, index = b.length, match; match = b[--index]; a[match] = this.prototype[match]);
													
													return a;
												}
											},
			doc							= 	document,
			multi						= 	function(a){if (a) for (var index = a.length; index--; Element.extend(a[index])); return a;},
			nativeCreateElement 		= 	doc.createElement,
			nativeGetElementById 		= 	doc.getElementById,
			nativeGetElementsByName 	= 	doc.getElementsByName,
			nativeGetElementsByTagName 	= 	doc.getElementsByTagName,
			nativeGetElementsByClassName= 	doc.getElementsByClassName;
		
		doc.createElement = function(tagName){
			return Element.extend(nativeCreateElement(tagName));
		};
		
		doc.getElementById = function(id){
			return Element.extend(nativeGetElementById(id));
		};
		
		doc.getElementsByName = function(name){					
			return multi(nativeGetElementsByName(name));
		};
		
		doc.getElementsByTagName = function(tagName){							
			return multi(nativeGetElementsByTagName(tagName));
		};
		
		if (nativeGetElementsByClassName)
			doc.getElementsByClassName = function(className){								
				return multi(nativeGetElementsByClassName(className));
			};
			
		window.Element = Element;
	}
}).call(this);
