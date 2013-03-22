/**
 *	Name	:	CEEP IE7 - Complete Emulated Element Prototype IE
 *	Author	:	ayecue
 *	Version	:	1.0.1.0
 *	Date	:	22.03.2013
 *
 *	Description:	
 *
 *	Enable you to work with Element prototypes in the IE. Emulates a normal Element Object. Also works with jQuery.
 */
(function() {
	"use strict";
	
	if (!window.Element)
	{
		var obj				= 	{prototype : {}},
			doc				= 	document,
			prototypeCache	=	true,
			prototypeLabel	=	'data-hasExtendedPrototype',
			prototypeKeys	=	[],
			register		=	function(){
									var a = prototypeKeys = [], protos = obj.prototype;
								
									for (var proto in protos)
										a.push(proto);
											
									return a;
								},
			extend			=	function(a){
									if (a[prototypeLabel]) return a; else var index;
									if ((index = prototypeKeys.length) ? index : (index = register().length)) a[prototypeLabel]=prototypeCache; else return a;
									for (var match; match = prototypeKeys[--index]; a[match] = Element.prototype[match]);
									
									return a;
								},
			multi			= 	function(a){if (a) for (var index = a.length; index--; extend(a[index])); return a;},
			replace			= 	function(a,b){var c=doc[a]; doc[a]=function(d){return b(c(d));};},
			add				=	function(a,b){for (var index = a.length; index--; replace(a[index],b));};
		
		add(['createElement','getElementById'],extend);
		add(['getElementsByName','getElementsByTagName'],multi);
			
		obj.syncPrototypes	= 	register;
		window.Element 		= 	obj;
	}
}).call(this);
