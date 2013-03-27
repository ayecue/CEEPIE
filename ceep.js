/**
 *  Name	:	CEEP IE7 - Complete Emulated Element Prototype IE
 *	Author	:	ayecue
 *	Version	:	1.0.3.0
 *	Date	:	26.03.2013
 *
 *	Description:	
 *
 *	Enable you to work with Element prototypes in the IE. Emulates a normal Element Object. Also works with jQuery.
 */
(function() {
	"use strict";
	
	var keyword = 'Element', n = window[keyword];
	
	if (!n)
	{
		var doc				= 	document,
			prototypeRegs	=	[],
			prototypeLabel	=	'data-hasExtendedPrototype',
			prototypeKeys	=	[],
			register		=	function(){
									var oldKeys = prototypeKeys, a = prototypeKeys = [], protos = Element.prototype,match;
								
									for (var before = {}, index = oldKeys.length; index--; before[oldKeys[index]]=true);
									for (var proto in protos)
									{
										if (!before[proto])
											for (var index = prototypeRegs.length; index--; (match = prototypeRegs[index]) ? match[proto]=protos[proto] : prototypeRegs.splice(index,1));
										
										a.push(proto);
									}
											
									return a;
								},
			extend			=	function(a,r){
									if (a[prototypeLabel] && r==doc) return a; 
									
									var index = prototypeKeys.length;
									
									if (index || (index = register().length))
									{
										for (var match; match = prototypeKeys[--index]; a[match] = Element.prototype[match]);
										add(['cloneNode'],extend,a);
										a.sync=register;
						
										prototypeRegs.push(a);
										a[prototypeLabel]=true;
									}
									
									return a;
								},
			multi			= 	function(a,r){if (a) for (var index = a.length; index--; extend(a[index],r)); return a;},
			replace			= 	function(a,b,r){var c=r[a]; r[a]=function(){return b(c.apply(r,arguments),r);};},
			add				=	function(a,b,r){for (var index = a.length; index--; replace(a[index],b,r));};
		
		add(['createElement','getElementById'],extend,doc);
		add(['getElementsByName','getElementsByTagName'],multi,doc);
		
		window[keyword] = {prototype : {},sync:register};
	}
	else if (!n.prototype.sync && !n.sync)
		n.prototype.sync = n.sync = function(){return false};
}).call(this);
