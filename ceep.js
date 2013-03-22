/**
 *  Name	:	CEEP IE7 - Complete Emulated Element Prototype IE
 *	Author	:	ayecue
 *	Version	:	1.0.1.1
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
		var obj				= 	{prototype : {}},
			doc				= 	document,
			prototypeVer	=	0,
			prototypeLabel	=	'data-hasExtendedPrototype',
			prototypeKeys	=	[],
			register		=	function(){
									var a = prototypeKeys = [], protos = obj.prototype; obj.syncVersion=++prototypeVer;
								
									for (var proto in protos)
										a.push(proto);
											
									return a;
								},
			extend			=	function(a){
									if (a[prototypeLabel]==prototypeVer) return a; else var index;
									if ((index = prototypeKeys.length) ? index : (index = register().length)) a[prototypeLabel]=prototypeVer; else return a;
									for (var match; match = prototypeKeys[--index]; a[match] = Element.prototype[match]);
									
									return a;
								},
			multi			= 	function(a){if (a) for (var index = a.length; index--; extend(a[index])); return a;},
			replace			= 	function(a,b){var c=doc[a]; doc[a]=function(d){return b(c(d));};},
			add				=	function(a,b){for (var index = a.length; index--; replace(a[index],b));};
		
		add(['createElement','getElementById'],extend);
		add(['getElementsByName','getElementsByTagName'],multi);
		
		obj.syncVersion		=	prototypeVer;
		obj.syncPrototypes	= 	register;
		window.Element 		= 	obj;
	}
}).call(this);
