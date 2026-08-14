namespace SpriteKind{
    export const Cursor = SpriteKind.create()
}
let playerSprite: Sprite = null
let cursorSprite: Sprite = null
let canJump: boolean = true
let isTethered: boolean = false
let spring_force_magnitude: number = 15
let stiffness: number = 1
let restLength: number = 10
let dampening: number = 1

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
        // let distanceToCursor: number = spriteutils.distanceBetween(playerSprite, cursorSprite)

        // let playerPosition: Vector2 = new Vector2(playerSprite.x, playerSprite.y)
        // let cursorPosition: Vector2 = new Vector2(cursorSprite.x, cursorSprite.y)
        // let targetDirection: Vector2 = cursorPosition.subtract(playerPosition)
        // let targetDistance = spriteutils.distanceBetween(playerSprite, cursorSprite)

        // let displacement = targetDistance - restLength

        // let net_force = Vector2.ZERO()

        // if (displacement > 0){

        //      let spring_force_magnitude = stiffness * displacement
        // }
        // let spring_force = targetDirection * spring_force_magnitude

        // // let projected_velocity = velocity_component.get_velocity().dot(targetDirection)
        // // let dampening = -dampening_scalar * projected_velocity * targetDirection

        // net_force = spring_force + dampening

        // velocity_component.velocity += net_force * game.getDeltaTime()
       
    }
}