CEEPIE
======

Enable you to work with Element prototypes in the IE. Emulates a normal Element Object. Also works with jQuery.

### Example:
    $(document).ready(function(){
        /* Add prototype functions */
        Element.prototype.Testing = function(){console.log('test');};
        Element.prototype.Hey = function(){console.log('see');};
        Element.prototype.Woot = function(){console.log('haha');};
        
        /* Get first form element */
        var test = $('form')[0];
        
        /* Execute those added prototype functions */
        test.Testing();
        test.Hey();
        test.Woot();
        
        /* Clone element */
        var testClone = test.cloneNode();
        
        /* Execute the added "Hey" prototype function */
        testClone.Hey();
    });
    
### Additional:
    /* After the first call of the syncPrototype function you have to sync your Prototypes manually */
    Element.prototype.Testing = function(){console.log('test');};
    
    var test = $('form')[0];
    
    test.Testing();
    
    Element.prototype.Cool = function(){console.log('bar');};
    Element.syncPrototypes();
    
    test.Cool();
