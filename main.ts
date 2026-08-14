namespace SpriteKind{

}

function onStart() : void {
    setLevel()
    createPlayer()
}

function createPlayer() : void{
    let playerSprite: Sprite = sprites.create(assets.image`player`, SpriteKind.Player)
    controller.moveSprite(playerSprite, 100, 0)
    playerSprite.ay = 300
    scene.cameraFollowSprite(playerSprite)
    
}
function setLevel() : void {
    tiles.setCurrentTilemap(tilemap`test`)
}
onStart()