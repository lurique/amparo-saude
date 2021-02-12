export const serialize = (form) => {
	let serialized = [];
	
	for ( let i = 0; i < form.elements.length; i++ ) {
		let field = form.elements[i];
		
		if ( !field.name || field.type === 'submit' || field.type === 'button' ) continue;
		
		if ( (field.type !== 'checkbox' && field.type !== 'radio') || field.checked ) {
			serialized.push({
				[field.name]: field.value
			})
		}
	}
	
	return serialized;
}