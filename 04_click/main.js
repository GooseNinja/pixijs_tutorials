(function() {
    /**
     * Set up Pixi.js
     */
    var renderer = PIXI.autoDetectRenderer(660, 500, {backgroundColor: 0x34495e});
    document.body.appendChild(renderer.view);

    // Create the stage
    var stage = new PIXI.Container();

    // Create textures from our images
    var gooseIdle = PIXI.Texture.fromImage('images/idle.png');
    var gooseHurt = PIXI.Texture.fromImage('images/hurt.png');
    var gooseAngry = PIXI.Texture.fromImage('images/angry.png');

    // Create our goose with the gooseIdle texture
    var goose = new PIXI.Sprite(gooseIdle)

    // Center the anchor and place in the center of our stage
    goose.anchor.x = 0.5;
    goose.anchor.y = 0.5;
    goose.position.x = renderer.width / 2;
    goose.position.y = renderer.height / 2;

    // Make the goose interactive
    goose.interactive = true;
    
    // Set interactions on our goose 
    goose
        .on('mousedown', onButtonDown)
        .on('mouseup', onButtonUp)
        .on('mouseupoutside', onButtonUp)
        .on('touchstart', onButtonDown)
        .on('touchend', onButtonUp)
        .on('touchendoutside', onButtonUp);
    
    // Add goose to the stage
    stage.addChild(goose);

    animate();

    // Create a variable to assign our timeout to later
    var gooseTimeout;
    
    function animate() {
        // Render the stage
        renderer.render(stage);
        requestAnimationFrame(animate);
    }
    
    function onButtonDown() {
        // Change the texture to gooseHurt
        this.texture = gooseHurt;
    
        // Clears the timeout 
        clearTimeout(gooseTimeout);
    }

function onButtonUp() {
    // Change the texture to gooseAngry
    this.texture = gooseAngry;

    // Set timeout to change the texture back to idle after 3 seconds
    gooseTimeout = setTimeout(function(gooseSprite) {
        // Change the texture to gooseIdle
        gooseSprite.texture = gooseIdle;
    }, 3000, this);
}
})();