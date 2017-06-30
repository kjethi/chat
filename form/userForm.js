var forms = require('forms');
var fields = forms.fields;
var validators = forms.validators;
var widgets = require('forms').widgets;

module.exports = forms.create({
	firstName: fields.string({ required: true, label: 'First Name',errorAfterField:true }),
    lastName: fields.string({ required: true, label: 'Last Name',errorAfterField:true }),
    email: fields.email({ required: true, label: 'Email',errorAfterField:true}),
	
    password: fields.password({ required: true,errorAfterField:true, }),
	confirm: fields.password({
	        required: true,
	        errorAfterField:true,
	        label: 're- Password',
	        validators: [validators.matchField('password')]
	    }),
	  address1: fields.string({ label: 'Address 1',errorAfterField:true }),
	  phone_1: fields.string({ validators: [validators.requiresFieldIfEmpty('phone_2')],label: 'phone 1',errorAfterField:true}),
	  phone_2: fields.string({ validators: [validators.requiresFieldIfEmpty('phone_1')] ,label: 'phone 2',errorAfterField:true})
//	            city: fields.string({ required: true, label: 'City' }),
//	            state: fields.string({ required: true, label: 'State' }),
//	            zip: fields.number({ required: true, label: 'ZIP' })
	},{'validatePastFirstError': true});
