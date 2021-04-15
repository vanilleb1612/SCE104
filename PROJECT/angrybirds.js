(function( global ) {

	var canvasElem = document.getElementById( "game" );
	var world = boxbox.createWorld( canvasElem, { collisionOutlines: false } );

	var birdConfig = {
		name: "bird",
		shape: "circle",
		radius: 1,
		image: "https://dl.dropbox.com/u/200135/imgs/blue-bird.gif",
		imageStretchToFit: true,
		density: 4,
		x: 2,
        y: 11,
		onKeyDown: function( e ) {
			var key = global.keyDecode( e ),
				force = 600;

			console.log( "key", key );
			switch ( key ) {
				case "left":  this.setForce( "movement", force, 270 ); break;
				case "up":    this.setForce( "movement", force,   0 ); break;
				case "right": this.setForce( "movement", force,  90 ); break;
				case "down":  this.setForce( "movement", force, 180 ); break;
				default:      
                    this.applyImpulse( 200,  60 );
					world.createEntity( birdConfig, { x: 3 } ).applyImpulse( 200,  60 );
					world.createEntity( birdConfig, { x: 4 } ).applyImpulse( 200,  60 );
			}
			this.friction( 0.1 );
		},
		onKeyUp: function( e ) {
			this.clearForce( "movement" );
		}
	};
	var bird = world.createEntity( birdConfig, {
		x: 2,
		onRender: function( ctx ) {
			ctx.font = "20pt Arial";
			ctx.fillText( "Score: " + this._ops.score, 20, 20 );
		},
		score: 0
	});

    $( canvasElem ).on( "click", function() {
        bird._ops.onKeyDown.apply( bird, [ { keyCode: 50 } ] )
    });
    
	world.createEntity({
		name: "ground",
		shape: "square",
		type: "static",
		color: "rgb(0,100,0)",
		width: 22,
		height: 0.5,
		y: 12
	});

	var block = {
		name: "block",
		shape: "square",
		color: "brown",
		width: 0.5,
		height: 4,
		y: 10,
		onImpact: function( entity, force ) {
			if ( entity.name() === "bird" ) {
				bird._ops.score++;
				this.color( "black" );
			}
			if ( force > 100 && entity.name() !== "ground" ) {
				this.destroy();
			}
		}
	};

	world.createEntity( block, { x: 13 } );

	world.createEntity( block, { x: 19 } );

	world.createEntity( block, {
		x: 16,
		y: 7,
		width: 7,
		height: 0.5
	});

	var pig = world.createEntity({
		name: "pig",
		shape: "circle",
		radius: 1,
		image: "https://dl.dropbox.com/u/200135/imgs/soldier-pig.png",
		imageStretchToFit: true,
		density: 4,
		x: 16.5,
		y: 11,
		onImpact: function( entity, force ) {
			if ( force > 75 && entity.name() !== "ground" ) {
				pig.destroy();
			}
		}
	});

	world.createEntity( block, { x: 14, y: 6, height: 3 } );
	world.createEntity( block, { x: 18, y: 6, height: 3 } );
	world.createEntity( block, { x: 16, y: 4, width: 5, height: 0.5 } );

	var smallPig = world.createEntity({
		name: "pig",
		shape: "circle",
		radius: 1,
		image: "https://dl.dropbox.com/u/200135/imgs/happy-pig.png",
		imageStretchToFit: true,
		density: 4,
		x: 16.5,
		y: 6.3,
		onImpact: function( entity, force ) {
			if ( force > 75 && entity.name() !== "ground" ) {
				smallPig.destroy();
			}
		}
	});

	world.createEntity({
		x: 20.75,
		y: 0,
		type: "static",
		height: 23.5,
		name: "block",
		shape: "square",
		color: "black",
		borderColor: "black",
		width: 0.1
	});
    
}( this ));

