if (typeof Levels == 'undefined') Levels = {};

Levels.RocketLandingNormal = function()
{
	this.name = "RocketLandingNormal";
	this.title = "Rocket Landing";
	this.boilerPlateCode = "function controlFunction(rocket)\n{\n  return {throttle:1,gimbalAngle:-0.2};\n}";
	this.sampleSolution = "// This takes ~120 seconds, be patient :)\nfunction controlFunction(rocket)\n{\n  if(Math.abs(rocket.x) < 10 \n     && Math.abs(rocket.dx) < 1 \n     && Math.abs(rocket.dtheta) < 0.05\n     && Math.sin(rocket.theta) < 0.05)\n    return { \n      throttle:\n      	0.5\n        -0.01*rocket.y\n        -0.3*rocket.dy,\n      gimbalAngle:      	\n        8*rocket.theta\n        +2*rocket.dtheta\n        +0.08*rocket.dx\n  	};\n  else \n    return {\n      throttle:\n          0.5\n          +0.01*(200-rocket.y)\n          -0.01*rocket.dy,\n      gimbalAngle:\n        8*rocket.theta\n        +2*rocket.dtheta\n        +0.08*rocket.dx\n        +0.03*Math.sign(rocket.x)*Math.min(30,Math.abs(rocket.x))\n  };\n}";
	this.description = "Land the rocket in the landing zone. The center of the landing zone has the coordinates (x,y)==(0,0). Steer the rocket by calculating the engine thrust (range 0 to 1) and engine steering angle (range -0.2 to 0.2 radians). The rocket has a thrust to weight ratio of 2. A throttle value of 0.5 can make it hover. Touch down gently (less than 2 m/s).";
	
	this.model = new Models.RocketLanding();
	this.resetModel();
}


Levels.RocketLandingNormal.prototype.levelComplete = function(){return this.model.landed();}

Levels.RocketLandingNormal.prototype.getSimulationTime = function()	{return this.model.T;}

Levels.RocketLandingNormal.prototype.resetModel = function()
{
	this.model.TWR = 2;
	this.model.theta = -0.1;
	this.model.dtheta = 0;
	this.model.L = 40;
	this.model.W = 5;
	this.model.x = -100;
	this.model.dx = 0;
	this.model.y = 200;
	this.model.dy = 0;
	this.model.crashed = false;
	this.model.T = 0;
}