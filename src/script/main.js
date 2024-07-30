const nextBtn = document.querySelectorAll("#right")
const prevBtn = document.querySelectorAll("#left")
const frontImg = document.querySelectorAll("#front")
const backImg = document.querySelectorAll("#back")

const imgs = [
    {
        images: ["src/img/1.png", "src/img/2.png", "src/img/3.png"],
        // The src of img will be stored here.
        pos: 0
        // Will be used for marking the current img has been showing, following the images.lenght
    },
    {
        images: ["src/img/3.png", "src/img/2.png", "src/img/1.png"],
        pos: 0
    }
]

function next(number) {
    // This func will be used on the next buttons, for start the slide switch program
    let {images, pos} = imgs[number]
    // Putting the properties of imgs as variables, just for more readability and ease handly coding
    const currentFrontImg = frontImg[number]
    const currentBackImg = backImg[number]
    // There same objective as above, but with the imgs inside the div
    /*
    Note all the variables has the number parameter inside of square bracket, it's because I created this script with these things in mind: (1) each slide on the page has a different behaviour of each other, (2) use a pattern for identify each one and (3) write a sript following these principles of pattern.
    With this, I called all the elements (buttons and imgs) with the same id with querySelectorAll as in there in head of script, resulting in a NodeList. This NodeList corresponds naturally with the imgs array order and them the 'number' as we'll se as parameter in the funcs will correspond with these two.
    The arguments are set inside the HTML by onclick call.
    */
    if (pos === images.length - 1) {
    // A way to prevent corrupt the 'pos' counter beyound the 'images' lenght
        return null
    } else {
        onOffBtn(number)
        // This little guy was a way that I found to protect the user against himself, we'll see more about it below.

        pos += 1
        imgs[number].pos = pos
        // Here we add one in the pos variable and then we add inside the pos property too.

        currentBackImg.setAttribute("src", `${images[pos]}`)
        // This is just for guarantee the back img will be the desired one. The reason is the back img will be set as per button clicked (if prev, the back img will be a previous img in comparison with the front one and, if next pressed, the back img will be a next one) and when we're in the middle of the array and press a different button than we pressed in beginning, the transition will show the back image prepared for the other button (which we pressed in the start) and not for the current one, only when the slideSwitch occurs the correct front image will appear and totally diferent of the transitioned one, giving an abrupt switch of image (α). Sorry if I've confused you!
        // To be honest, this thing seems a "bad programming" or "bug" for me. Run it every time the button is clicked, looks like is stealing the slideSwitch func job and a waste of "process"! I think the correct should be this line executes inside the slideSwitch only when the behaviour above explained ocurrs (α).
        // "Why didn't you did it?" Because I need to go forward with my studies, I'll never go forward while I'm trying to turn in perfect programs and scripts in this learning phase. I think the most important thing is learn the fundamentals and not the code itself, the self-critic above show this.

        currentFrontImg.classList.add("transition")
        // It will make a 2s fade-out on the currentFrontImg, adding the class transition on the currentFrontImg
        setTimeout(() => {
            slideSwitch(number, pos, pos+1)
        }, 1500);
        // There is the big boss, before the fade-out animation ends it will change the currentFrontImg and currentBackImg in time for the next interaction with the buttons. The just in time is tuned by the setTimeout func aligned with the transition class in CSS.
    }
}

function prev(number) {
    // Is a mirror of the next func.
    // While I write this I thought if was possible to write the prev and next button inside of the same func...
    let {images, pos} = imgs[number]
    const currentFrontImg = frontImg[number]
    const currentBackImg = backImg[number]

    if (pos === 0) {
        return null
    } else {
        onOffBtn(number)

        pos -= 1
        imgs[number].pos = pos

        currentBackImg.setAttribute("src", `${images[pos]}`)

        currentFrontImg.classList.add("transition")
        setTimeout(() => {
            slideSwitch(number, pos, pos-1)
        }, 1500);
    }
}

function slideSwitch(number, pos1, pos2) {
    // The func responsible switching the front and back image. As I said above, this synced with the transition CSS animation, will give the feeling of fade-out image and, the specification of this func is just changing the front and back imgs.
    // It goes three arguments: the first is the so know 'number', determining which element of imgs array will work with. The pos1 will receive a number too, but this one will determine which front image will be considered inside the images array. The pos2 receives a number also for determine the back image, as pos1 procedure.
    let {images} = imgs[number]
    const currentFrontImg = frontImg[number]
    const currentBackImg = backImg[number]

    const currentNextBtn = nextBtn[number]
    const curretPrevBtn = prevBtn[number]

    onOffBtn(number)
    // Note, the little guy is used here too. To be more clear, the prev/next func calls it and the slideSwitch, the slideSwitch release!
    
    if (imgs[number].pos === imgs[number].images.length - 1 ) {
        // This if and else block will do the front/back img change accordingly with three stats:
        // In this first if, it will check if the actual image (based on the pos property, inside the imgs array) is the last
        currentFrontImg.setAttribute("src", `${images[pos1]}`)
            // Based on the pos set by the caller func (next/prev), the atribute src will be changed. Giving a new img for the front.
        currentBackImg.setAttribute("src", `${images[pos1-1]}`)
            // There, as this if will be executed when the last image are achieved, the back image will be set as pos1 minus 1. Why?
            // If we arrived the last image, logically we don't have anything beyond it and the only way is backwards. This ensure the back img (who holds up the display on screen) will be set and not an 'undefined' one, broking up everithing.
        currentFrontImg.classList.remove("transition")
            // Will remove the transition applied by next/prev func
        currentNextBtn.toggleAttribute("disabled")
            // Same logic of currentBackImg but for button, when we're in the last img there no way to go and then the next btn will be disabled
    } else if (imgs[number].pos === 0) {
        // In this else if, it will check if the actual image is the first
        currentFrontImg.setAttribute("src", `${images[pos1]}`)
        currentBackImg.setAttribute("src", `${images[pos1+1]}`)
        currentFrontImg.classList.remove("transition")
        curretPrevBtn.toggleAttribute("disabled")
        // The same above logic, but when we back for the first image. Look and seed the similarities, here we sum the back img pos and disable the prev btn.
    } else {
        // Here, when the showed img is not in the extreme of images array, is the standard behaviour
        currentFrontImg.setAttribute("src", `${images[pos1]}`)
        currentBackImg.setAttribute("src", `${images[pos2]}`)
        currentFrontImg.classList.remove("transition")
    }
}

function onOffBtn(number) {
    // This cutie disable the buttons during the transitions to avoid user breaks the slide, clicking multiple times like a crazy!
    const currentNextBtn = nextBtn[number]
    const currentPrevBtn = prevBtn[number]

    if (currentNextBtn.attributes.disabled && !currentPrevBtn.attributes.disabled) {
        // This if and else block checks if a button is already disabled, due the first and second if/else statement on slideSwitch. So, we'll check inside the NodeList of the two buttons for disable property.
        currentPrevBtn.toggleAttribute("disabled")
        // Here, when the next btn is disabled and the prev not, it will disabling only the prev button.
    } else if (currentPrevBtn.attributes.disabled && !currentNextBtn.attributes.disabled) {
        currentNextBtn.toggleAttribute("disabled")
        // This one do the same thing that we saw above, but reversed.
    } else {
        currentNextBtn.toggleAttribute("disabled")
        currentPrevBtn.toggleAttribute("disabled")
        // Finally, the standard statement. Will disable both buttons during transition.
    }
}
// I'm very glad if you came till here, sorry if I commited a JS Programming Crime™.