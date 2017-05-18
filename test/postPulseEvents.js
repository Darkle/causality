const assert = require('assert');
let causality = require('../causality');
causality.install();
causality.setConfiguration({objectActivityList : true, mirrorRelations: true, recordPulseEvents : true});
causality.addPostPulseAction(postPulse)

let mirror = require('../mirror');
let pulseEvents = null
function postPulse(events) {
	pulseEvents = events;
}

describe("Post pulse events", function(){
    it("Check post pulse events", function(){
		let x = create({id : "x"});
		let y = create({id : "y"});
		let z = create({id : "z"});

		transaction(function() {
			x.fooX = 3;
			y.fooY = 31;
			z.fumZ = 3;			
		});
		assert.equal(3, pulseEvents.length);
		assert.equal('set', pulseEvents[0].type);
		assert.equal('fooX', pulseEvents[0].property);
	});
});	