$('#login_option').click( function(){
	$(this).animate({
		opacity: 1,
	}, 400 );	
	if($('#login_data2').is(":hidden")){
		$('#login_data2').slideDown();
	} else{
		$('#login_data2').slideUp();
	}
});
	
$('#login_button2').click( function(){
	$('#login_data2').slideUp();
});

/*Validacion de formulario registro*/

var LiveValidation = function(element, optionsObj){
  	this.initialize(element, optionsObj);
}


/** element types constants ****/

LiveValidation.TEXTAREA = 1;
LiveValidation.TEXT     = 2;
LiveValidation.PASSWORD = 3;
LiveValidation.CHECKBOX = 4;
LiveValidation.SELECT   = 5;
LiveValidation.FILE     = 6;

/****** Static methods *******/

/**
 *	pass an array of LiveValidation objects and it will validate all of them
 *	
 *	@param validations {Array} - an array of LiveValidation objects
 *	@return {Bool} - true if all passed validation, false if any fail						
 */
LiveValidation.massValidate = function(validations){
  var returnValue = true;
	for(var i = 0, len = validations.length; i < len; ++i ){
		var valid = validations[i].validate();
		if(returnValue) returnValue = valid;
	}
	return returnValue;
}

/****** prototype ******/

LiveValidation.prototype = {

    validClass: 'LV_valid',
    invalidClass: 'LV_invalid',
    messageClass: 'LV_validation_message',
    validFieldClass: 'LV_valid_field',
    invalidFieldClass: 'LV_invalid_field',

    /**
     *	initialises all of the properties and events
     *
     * @param - Same as constructor above
     */
    initialize: function(element, optionsObj){
      var self = this;
      if(!element) throw new Error("LiveValidation::initialize - No element reference or element id has been provided!");
      this.element = element.nodeName ? element : document.getElementById(element);
      if(!this.element) throw new Error("LiveValidation::initialize - No element with reference or id of '" + element + "' exists!");
      // default properties that could not be initialised above
      this.validations = [];
      this.elementType = this.getElementType();
      this.form = this.element.form;
      // options
      var options = optionsObj || {};
      this.validMessage = options.validMessage || 'Thankyou!';
      var node = options.insertAfterWhatNode || this.element;
	  this.insertAfterWhatNode = node.nodeType ? node : document.getElementById(node);
      this.onlyOnBlur =  options.onlyOnBlur || false;
      this.wait = options.wait || 0;
      this.onlyOnSubmit = options.onlyOnSubmit || false;
	  // hooks
	  this.beforeValidation = options.beforeValidation || function(){};
	  this.beforeValid = options.beforeValid || function(){};
      this.onValid = options.onValid || function(){ this.insertMessage(this.createMessageSpan()); this.addFieldClass(); };
	  this.afterValid = options.afterValid || function(){};
	  this.beforeInvalid = options.beforeInvalid || function(){};
      this.onInvalid = options.onInvalid || function(){ this.insertMessage(this.createMessageSpan()); this.addFieldClass(); };	
	  this.afterInvalid = options.afterInvalid || function(){};	
	  this.afterValidation = options.afterValidation || function(){};
      // add to form if it has been provided
      if(this.form){
        this.formObj = LiveValidationForm.getInstance(this.form);
        this.formObj.addField(this);
      }
      // events
      // collect old events
      this.oldOnFocus = this.element.onfocus || function(){};
      this.oldOnBlur = this.element.onblur || function(){};
      this.oldOnClick = this.element.onclick || function(){};
      this.oldOnChange = this.element.onchange || function(){};
      this.oldOnKeyup = this.element.onkeyup || function(){};
      this.element.onfocus = function(e){ self.doOnFocus(e); return self.oldOnFocus.call(this, e); }
      if(!this.onlyOnSubmit){
        switch(this.elementType){
          case LiveValidation.CHECKBOX:
            this.element.onclick = function(e){ self.validate(); return self.oldOnClick.call(this, e); }
          // let it run into the next to add a change event too
          case LiveValidation.SELECT:
          case LiveValidation.FILE:
            this.element.onchange = function(e){ self.validate(); return self.oldOnChange.call(this, e); }
            break;
          default:
            if(!this.onlyOnBlur) this.element.onkeyup = function(e){ self.deferValidation(); return self.oldOnKeyup.call(this, e); }
      	    this.element.onblur = function(e){ self.doOnBlur(e); return self.oldOnBlur.call(this, e); }
        }
      }
    },

	/**
     *	destroys the instance's events (restoring previous ones) and removes it from any LiveValidationForms
     */
    destroy: function(){
  	  if(this.formObj){
		// remove the field from the LiveValidationForm
		this.formObj.removeField(this);
		// destroy the LiveValidationForm if no LiveValidation fields left in it
		this.formObj.destroy();
	  }
      // remove events - set them back to the previous events
	  this.element.onfocus = this.oldOnFocus;
      if(!this.onlyOnSubmit){
        switch(this.elementType){
          case LiveValidation.CHECKBOX:
            this.element.onclick = this.oldOnClick;
          // let it run into the next to add a change event too
          case LiveValidation.SELECT:
          case LiveValidation.FILE:
            this.element.onchange = this.oldOnChange;
            break;
          default:
            if(!this.onlyOnBlur) this.element.onkeyup = this.oldOnKeyup;
      	    this.element.onblur = this.oldOnBlur;
        }
      }
      this.validations = [];
	  this.removeMessageAndFieldClass();
    },

    /**
     *	adds a validation to perform to a LiveValidation object
     *
     *	@param validationFunction {Function} - validation function to be used (ie Validate.Presence )
     *	@param validationParamsObj {Object} - parameters for doing the validation, if wanted or necessary
     * @return {Object} - the LiveValidation object itself so that calls can be chained
     */
    add: function(validationFunction, validationParamsObj){
      this.validations.push( {type: validationFunction, params: validationParamsObj || {} } );
      return this;
    },

	/**
     *	removes a validation from a LiveValidation object - must have exactly the same arguments as used to add it 
     *
     *	@param validationFunction {Function} - validation function to be used (ie Validate.Presence )
     *	@param validationParamsObj {Object} - parameters for doing the validation, if wanted or necessary
     *  @return {Object} - the LiveValidation object itself so that calls can be chained
     */
    remove: function(validationFunction, validationParamsObj){
  	  var victimless = [];
  	  for( var i = 0, len = this.validations.length; i < len; i++){
	       var v = this.validations[i];
	       if(v.type != validationFunction && v.params != validationParamsObj) victimless.push(v);
	  }
	  this.validations = victimless;
      return this;
    },


    /**
     * makes the validation wait the alotted time from the last keystroke 
     */
    deferValidation: function(e){
      if(this.wait >= 300) this.removeMessageAndFieldClass();
      var self = this;
      if(this.timeout) clearTimeout(self.timeout);
      this.timeout = setTimeout( function(){ self.validate() }, self.wait); 
    },

    /**
     * sets the focused flag to false when field loses focus 
     */
    doOnBlur: function(e){
      this.focused = false;
      this.validate(e);
    },

    /**
     * sets the focused flag to true when field gains focus 
     */
    doOnFocus: function(e){
      this.focused = true;
      this.removeMessageAndFieldClass();
    },

    /**
     *	gets the type of element, to check whether it is compatible
     *
     *	@param validationFunction {Function} - validation function to be used (ie Validate.Presence )
     *	@param validationParamsObj {Object} - parameters for doing the validation, if wanted or necessary
     */
    getElementType: function(){
		var nn = this.element.nodeName.toUpperCase();
		var nt = this.element.type.toUpperCase();
	    switch(true){
	      case (nn == 'TEXTAREA'):
	        return LiveValidation.TEXTAREA;
	      case (nn == 'INPUT' && nt == 'TEXT'):
	        return LiveValidation.TEXT;
	      case (nn == 'INPUT' && nt == 'PASSWORD'):
	        return LiveValidation.PASSWORD;
	      case (nn == 'INPUT' && nt == 'CHECKBOX'):
	        return LiveValidation.CHECKBOX;
	      case (nn == 'INPUT' && nt == 'FILE'):
	        return LiveValidation.FILE;
	      case (nn == 'SELECT'):
	        return LiveValidation.SELECT;
	      case (nn == 'INPUT'):
	        throw new Error('LiveValidation::getElementType - Cannot use LiveValidation on an ' + nt.toLowerCase() + ' input!');
	      default:
	        throw new Error('LiveValidation::getElementType - Element must be an input, select, or textarea - ' + nn.toLowerCase() + ' was given!');
	    }
	  },

    /**
     *	loops through all the validations added to the LiveValidation object and checks them one by one
     *
     *	@param validationFunction {Function} - validation function to be used (ie Validate.Presence )
     *	@param validationParamsObj {Object} - parameters for doing the validation, if wanted or necessary
     *  @return {Boolean} - whether the all the validations passed or if one failed
     */
    doValidations: function(){
      	this.validationFailed = false;
      	for(var i = 0, len = this.validations.length; i < len; ++i){
			this.validationFailed = !this.validateElement(this.validations[i].type, this.validations[i].params);
    		if(this.validationFailed) return false;	
    	}
    	this.message = this.validMessage;
    	return true;
    },

    /**
     *	performs validation on the element and handles any error (validation or otherwise) it throws up
     *
     *	@param validationFunction {Function} - validation function to be used (ie Validate.Presence )
     *	@param validationParamsObj {Object} - parameters for doing the validation, if wanted or necessary
     *  @return {Boolean} - whether the validation has passed or failed
     */
    validateElement: function(validationFunction, validationParamsObj){
		// check whether we should display the message when empty
		switch(validationFunction){
    		case Validate.Presence:
            case Validate.Confirmation:
            case Validate.Acceptance:
    			this.displayMessageWhenEmpty = true;
    			break;
			case Validate.Custom:
				if(validationParamsObj.displayMessageWhenEmpty) this.displayMessageWhenEmpty = true;
				break;
    	}
		// select and checkbox elements values are handled differently
		var value = (this.elementType == LiveValidation.SELECT) ? this.element.options[this.element.selectedIndex].value : this.element.value; 
        if(validationFunction == Validate.Acceptance){
    	    if(this.elementType != LiveValidation.CHECKBOX) throw new Error('LiveValidation::validateElement - Element to validate acceptance must be a checkbox!');
    		value = this.element.checked;
    	}
		// now validate
        var isValid = true;
      	try{    
    		validationFunction(value, validationParamsObj);
    	} catch(error) {
    	  	if(error instanceof Validate.Error){
    			if( value !== '' || (value === '' && this.displayMessageWhenEmpty) ){
    				this.validationFailed = true;
					// Opera 10 adds stacktrace after newline
    				this.message = error.message.split('\n')[0];
    				isValid = false;
    			}
    		}else{
    		  	throw error;
    		}
    	}finally{
    	    return isValid;
        }
    },

    /**
     *	makes it do the all the validations and fires off the various callbacks
     *
     *  @return {Boolean} - whether the all the validations passed or if one failed
     */
    validate: function(){
      if(!this.element.disabled){
		this.beforeValidation();
		var isValid = this.doValidations();
		if(isValid){
			this.beforeValid();
			this.onValid();
			this.afterValid();
			return true;
		}else {
			this.beforeInvalid();
			this.onInvalid();
			this.afterInvalid();
			return false;
		}
		this.afterValidation();
	  }else{
      	return true;
      }
    },

 /**
   *  enables the field
   *
   *  @return {LiveValidation} - the LiveValidation object for chaining
   */
  enable: function(){
  	this.element.disabled = false;
	return this;
  },

  /**
   *  disables the field and removes any message and styles associated with the field
   *
   *  @return {LiveValidation} - the LiveValidation object for chaining
   */
  disable: function(){
  	this.element.disabled = true;
	this.removeMessageAndFieldClass();
	return this;
  },

    /** Message insertion methods ****************************
     * 
     * These are only used in the onValid and onInvalid callback functions and so if you overide the default callbacks,
     * you must either impliment your own functions to do whatever you want, or call some of these from them if you 
     * want to keep some of the functionality
     */

    /**
     *	makes a span containg the passed or failed message
     *
     * @return {HTMLSpanObject} - a span element with the message in it
     */
    createMessageSpan: function(){
        var span = document.createElement('span');
    	var textNode = document.createTextNode(this.message);
      	span.appendChild(textNode);
        return span;
    },

    /**
     *	inserts the element containing the message in place of the element that already exists (if it does)
     *
     * @param elementToIsert {HTMLElementObject} - an element node to insert
     */
    insertMessage: function(elementToInsert){
      	this.removeMessage();
		if(!this.validationFailed && !this.validMessage) return; // dont insert anything if vaalidMesssage has been set to false or empty string
      	if( (this.displayMessageWhenEmpty 
	      && (this.elementType == LiveValidation.CHECKBOX || this.element.value == ''))
    	  || this.element.value != '' ){
            var className = this.validationFailed ? this.invalidClass : this.validClass;
    	  	elementToInsert.className += ' ' + this.messageClass + ' ' + className;
			var parent = this.insertAfterWhatNode.parentNode;
            if(this.insertAfterWhatNode.nextSibling){
    		  	parent.insertBefore(elementToInsert, this.insertAfterWhatNode.nextSibling);
    		}else{
    	        parent.appendChild(elementToInsert);
    	    }
    	}
    },


    /**
     *	changes the class of the field based on whether it is valid or not
     */
    addFieldClass: function(){
        this.removeFieldClass();
        if(!this.validationFailed){
            if(this.displayMessageWhenEmpty || this.element.value != ''){
                if(this.element.className.indexOf(this.validFieldClass) == -1) this.element.className += ' ' + this.validFieldClass;
            }
        }else{
            if(this.element.className.indexOf(this.invalidFieldClass) == -1) this.element.className += ' ' + this.invalidFieldClass;
        }
    },

    /**
     *	removes the message element if it exists, so that the new message will replace it
     */
    removeMessage: function(){
    	var nextEl;
    	var el = this.insertAfterWhatNode;
    	while(el.nextSibling){
    	    if(el.nextSibling.nodeType === 1){
    		  	nextEl = el.nextSibling;
    		  	break;
    		}
    		el = el.nextSibling;
    	}
      	if(nextEl && nextEl.className.indexOf(this.messageClass) != -1) this.insertAfterWhatNode.parentNode.removeChild(nextEl);
    },

    /**
     *	removes the class that has been applied to the field to indicte if valid or not
     */
    removeFieldClass: function(){
	  var cn = this.element.className;
      if(cn.indexOf(this.invalidFieldClass) != -1) this.element.className = cn.split(this.invalidFieldClass).join('');
      if(cn.indexOf(this.validFieldClass) != -1) this.element.className = cn.split(this.validFieldClass).join(' ');
    },

    /**
     *	removes the message and the field class
     */
    removeMessageAndFieldClass: function(){
      this.removeMessage();
      this.removeFieldClass();
    }

} 

/*************************************** LiveValidationForm class ****************************************/

var LiveValidationForm = function(element){
  this.initialize(element);
}

/**
 * namespace to hold instances
 */
LiveValidationForm.instances = {};

/**
   *	gets the instance of the LiveValidationForm if it has already been made or creates it if it doesnt exist
   *	
   *	@param element {mixed} - a dom element reference to or id of a form
   */
LiveValidationForm.getInstance = function(element){
  if(!element) throw new Error("LiveValidationForm::getInstance - No element reference or element id has been provided!");
  var el = element.nodeName ? element : document.getElementById(element);
  var rand = Math.random() * Math.random();
  if(!el.id) el.id = 'formId_' + rand.toString().replace(/\./, '') + new Date().valueOf();
  if(!LiveValidationForm.instances[el.id]) LiveValidationForm.instances[el.id] = new LiveValidationForm(el);
  return LiveValidationForm.instances[el.id];
}

LiveValidationForm.prototype = {

  beforeValidation: function(){},
  onValid: function(){},
  onInvalid: function(){},
  afterValidation: function(){},

  /**
   *	constructor for LiveValidationForm - handles validation of LiveValidation fields belonging to this form on its submittal
   *	
   *	@param element {HTMLFormElement} - a dom element reference to the form to turn into a LiveValidationForm
   */
  initialize: function(element){
  	this.name = element.id;
    this.element = element;
    this.fields = [];
    // preserve the old onsubmit event
	this.oldOnSubmit = this.element.onsubmit || function(){};
    var self = this;
    this.element.onsubmit = function(e){
      var ret = false;
      self.beforeValidation(),
      self.valid = LiveValidation.massValidate(self.fields);
      self.valid ? self.onValid() : self.onInvalid();
      self.afterValidation();
	  if(self.valid) ret = self.oldOnSubmit.call(this, e || window.event) !== false;
	  if(!ret) return ret;
    }
  },

  /**
   *	adds a LiveValidation field to the forms fields array
   *	
   *	@param element {LiveValidation} - a LiveValidation object
   */
  addField: function(newField){
    this.fields.push(newField);
  },

  /**
   *	removes a LiveValidation field from the forms fields array
   *	
   *	@param victim {LiveValidation} - a LiveValidation object
   */
  removeField: function(victim){
  	var victimless = [];
  	for( var i = 0, len = this.fields.length; i < len; i++){
		if(this.fields[i] !== victim) victimless.push(this.fields[i]);
	}
    this.fields = victimless;
  },

  /**
   *	destroy this instance and its events
   *
   * @param force {Boolean} - whether to force the detruction even if there are fields still associated
   */
  destroy: function(force){
  	// only destroy if has no fields and not being forced
  	if (this.fields.length != 0 && !force) return false;
	// remove events - set back to previous events
	this.element.onsubmit = this.oldOnSubmit;
	// remove from the instances namespace
	LiveValidationForm.instances[this.name] = null;
	return true;
  }

}

/*************************************** Validate class ****************************************/

var Validate = {


    Presence: function(value, paramsObj){
      	var paramsObj = paramsObj || {};
    	var message = paramsObj.failureMessage || "Can't be empty!";
    	if(value === '' || value === null || value === undefined) Validate.fail(message);
    	return true;
    },

   
    /**
     *	validates that the field contains a valid email address
   
     */
    Email: function(value, paramsObj){
    	var paramsObj = paramsObj || {};
    	var message = paramsObj.failureMessage || "Must be a valid email address!";
    	Validate.Format(value, { failureMessage: message, pattern: /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i } );
    	return true;
    },

    /**
     *	validates the length of the value
  
     */
    Length: function(value, paramsObj){
    	var value = String(value);
    	var paramsObj = paramsObj || {};
        var minimum = ((paramsObj.minimum) || (paramsObj.minimum == 0)) ? paramsObj.minimum : null;
    	var maximum = ((paramsObj.maximum) || (paramsObj.maximum == 0)) ? paramsObj.maximum : null;
    	var is = ((paramsObj.is) || (paramsObj.is == 0)) ? paramsObj.is : null;
        var wrongLengthMessage = paramsObj.wrongLengthMessage || "Must be " + is + " characters long!";
    	var tooShortMessage = paramsObj.tooShortMessage || "Must not be less than " + minimum + " characters long!";
    	var tooLongMessage = paramsObj.tooLongMessage || "Must not be more than " + maximum + " characters long!";
    	switch(true){
    	  	case (is !== null):
    	  		if( value.length != Number(is) ) Validate.fail(wrongLengthMessage);
    			break;
    	  	case (minimum !== null && maximum !== null):
    	  		Validate.Length(value, {tooShortMessage: tooShortMessage, minimum: minimum});
    	  		Validate.Length(value, {tooLongMessage: tooLongMessage, maximum: maximum});
    	  		break;
    	  	case (minimum !== null):
    	  		if( value.length < Number(minimum) ) Validate.fail(tooShortMessage);
    			break;
    	  	case (maximum !== null):
    	  		if( value.length > Number(maximum) ) Validate.fail(tooLongMessage);
    			break;
    		default:
    			throw new Error("Validate::Length - Length(s) to validate against must be provided!");
    	}
    	return true;
    },




    /**
     *	validates that the value matches that in another field
     *	
				
     */
    Confirmation: function(value, paramsObj){
      	if(!paramsObj.match) throw new Error("Validate::Confirmation - Error validating confirmation: Id of element to match must be provided!");
    	var paramsObj = paramsObj || {};
    	var message = paramsObj.failureMessage || "Does not match!";
    	var match = paramsObj.match.nodeName ? paramsObj.match : document.getElementById(paramsObj.match);
    	if(!match) throw new Error("Validate::Confirmation - There is no reference with name of, or element with id of '" + paramsObj.match + "'!");
    	if(value != match.value) Validate.fail(message);
    	return true;
    },

   


    /**
     *	validates whatever it is you pass in, and handles the validation error for you so it gives a nice true or false reply
     *
     *	@param validationFunction {Function} - validation function to be used (ie Validation.validatePresence )
     *	@param value {mixed} - value to be checked if true or not (usually a boolean from the checked value of a checkbox)
     *	@param validationParamsObj {Object} - parameters for doing the validation, if wanted or necessary
     */
    now: function(validationFunction, value, validationParamsObj){
      	if(!validationFunction) throw new Error("Validate::now - Validation function must be provided!");
    	var isValid = true;
        try{    
    		validationFunction(value, validationParamsObj || {});
    	} catch(error) {
    		if(error instanceof Validate.Error){
    			isValid =  false;
    		}else{
    		 	throw error;
    		}
    	}finally{ 
            return isValid 
        }
    },

    /**
     *  shortcut for failing throwing a validation error
     *
     *	@param errorMessage {String} - message to display
     */
    fail: function(errorMessage){
            throw new Validate.Error(errorMessage);
    },

    Error: function(errorMessage){
    	this.message = errorMessage;
    	this.name = 'ValidationError';
    }




}

$(function(){
var name = new LiveValidation( "nameBar", { validMessage: "Ok!", wait: 500 } );	
name.add( Validate.Presence, { failureMessage: "Please, enter your name" } );
});
$(function(){
var LastName = new LiveValidation( "lastnameBar", { validMessage: "Ok!", wait: 500 } );	
LastName.add( Validate.Presence, { failureMessage: "Please, enter your last name" } );
});

$(function(){
var email = new LiveValidation( "emailBar", { validMessage: "Ok!", wait: 500 } );	
email.add( Validate.Presence, { failureMessage: "Please, enter your e-mail" } );
email.add( Validate.Email );
});
$(function(){
var retypeEmailBar = new LiveValidation( "retypeEmailBar", { validMessage: "Ok!", wait: 500 } );	
retypeEmailBar.add( Validate.Presence, { failureMessage: "Please, re-type your e-mail" } );
retypeEmailBar.add( Validate.Email );
retypeEmailBar.add( Validate.Confirmation, { match: 'emailBar' } );
});
$(function(){
var PasswordBar = new LiveValidation( "PasswordBar", { validMessage: "Ok!", wait: 500 } );	
PasswordBar.add( Validate.Presence, { failureMessage: "Please, enter your password" } );
PasswordBar.add( Validate.Length, { minimum: 4, maximum: 8 } );
});
$(function(){
var retipePasswordBar = new LiveValidation( "retipePasswordBar", { validMessage: "Ok!", wait: 500 } );	
retipePasswordBar.add( Validate.Presence, { failureMessage: "Please, enter your password" } );
retipePasswordBar.add( Validate.Length, { minimum: 4, maximum: 8 } );
retipePasswordBar.add( Validate.Confirmation, { match: 'PasswordBar' } );

});	