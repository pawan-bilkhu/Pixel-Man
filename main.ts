namespace SpriteKind{
    export const Cursor = SpriteKind.create()
}
let playerSprite: Sprite = null
let cursorSprite: Sprite = null
let canJump: boolean = true
let isTethered: boolean = false

function onStart() {
    setLevel()
    createPlayer()
    createCursor()
}

function createPlayer() {
    playerSprite = sprites.create(assets.image`player`, SpriteKind.Player)
    scene.cameraFollowSprite(playerSprite)
    resetPlayerMovement()
    controller.A.onEvent(ControllerButtonEvent.Pressed, function(){
        if(canJump){
            playerSprite.vy = -75
            canJump = false
        }
    })
    forever(function(){
        if(playerSprite.isHittingTile(CollisionDirection.Bottom)){
            canJump = true
        }
    })
    
}
function resetPlayerMovement(){
    controller.moveSprite(playerSprite, 100, 0)
    playerSprite.ay = 300
    isTethered = false
}
function createCursor() {
    cursorSprite = sprites.create(assets.image`cursor`, SpriteKind.Cursor)
    browserEvents.setCursorVisible(false)
    browserEvents.onMouseMove(function(x: number, y: number){
        if(isTethered){
            return
        }
        cursorSprite.setPosition(scene.cameraProperty(CameraProperty.Left) + x, scene.cameraProperty(CameraProperty.Top) + y)
    })

}
function getGlobalMousePosition() : spriteutils.Position {
    return spriteutils.point(scene.cameraProperty(CameraProperty.Left) + cursorSprite.x, scene.cameraProperty(CameraProperty.Top) + cursorSprite.y)
}
function setLevel() {
    tiles.setCurrentTilemap(tilemap`test`)
}
onStart()

namespace Tether{
    
    browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Pressed, function(x: number, y: number) {
        activateTether()
    })
    browserEvents.MouseLeft.onEvent(browserEvents.MouseButtonEvent.Released, function (x: number, y: number) {
        resetPlayerMovement()
    })

    function activateTether() {
        controller.moveSprite(playerSprite, 0, 0)
        canJump = false
        isTethered = true
    }
    forever(function(){
        if(!isTethered){
            return
        }

        calculateTether()
    })
    function calculateTether() {
        let distanceToCursor: number = spriteutils.distanceBetween(playerSprite, cursorSprite)
        let angleToCursor: number = spriteutils.angleFrom(playerSprite, cursorSprite)

        if(distanceToCursor > 10){
            spriteutils.setVelocityAtAngle(playerSprite, angleToCursor, 100)
        }
    }
}