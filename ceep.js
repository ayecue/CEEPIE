/**
 *  Name	:	CEEP IE7 - Complete Emulated Element Prototype IE
 *	Author	:	ayecue
 *	Version	:	1.0.2.0
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
			prototypeRegs	=	[],
			prototypeLabel	=	'data-hasExtendedPrototype',
			prototypeKeys	=	[],
			register		=	function(){
									var oldKeys = prototypeKeys, a = prototypeKeys = [], protos = obj.prototype,match;
								
									for (var before = {}, index = oldKeys.length; index--; before[oldKeys[index]]=true);
									for (var proto in protos)
									{
										if (!before[proto])
											for (var index = prototypeRegs.length; index--; (match = prototypeRegs[index]) ? match[proto]=protos[proto] : prototypeRegs.splice(index,1));
										
										a.push(proto);
									}
											
									return a;
								},
			extend			=	function(a){
									if (a[prototypeLabel]) return a; 
									
									var index = prototypeKeys.length;
									
									if (index || (index = register().length))
									{
										a[prototypeLabel]=1;
										prototypeRegs.push(a);
										for (var match; match = prototypeKeys[--index]; a[match] = Element.prototype[match]);
									}
									
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
