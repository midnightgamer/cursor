import {gsap} from 'gsap';

const getMousePos = e => {
    return {
        x: e.clientX,
        y: e.clientY
    };
};


// Linear interpolation
const lerp = (a, b, n) => (1 - n) * a + n * b;


//Grab mouse position and set it to mouse state
let mouse = {x: 0, y: 0};
window.addEventListener('mousemove', (ev) => (mouse = getMousePos(ev)));

export default class Cursor {
    constructor(el) {
        this.Cursor = el;
        this.Cursor.style.opacity = 0;

        this.cursorCnfigs = {
            x: {previous: 0, current: 0, amt: 0.2},
            y: {previous: 0, current: 0, amt: 0.2}
        };

        this.onMouseMoveEv = () => {
            this.cursorCnfigs.x.previous = this.cursorCnfigs.x.current = mouse.x;
            this.cursorCnfigs.y.previous = this.cursorCnfigs.y.current = mouse.y;

            // Set cursor opacity to 1 when hovered on the screen
            gsap.to(this.Cursor, {
                duration: 1, ease: 'Power3.easeInOut',
                opacity: 1,
            })

            //    requestAnimationFrame
            requestAnimationFrame(() => this.render())

            //    Cleanup function
            window.removeEventListener('mousemove', this.onMouseMoveEv)
        }
        //    Assign the mouse function
        window.addEventListener('mousemove', this.onMouseMoveEv)
    }

    render() {
        this.cursorCnfigs.x.current = mouse.x;
        this.cursorCnfigs.y.current = mouse.y;
        for (const key in this.cursorCnfigs) {
            this.cursorCnfigs[key].previous = lerp(
                this.cursorCnfigs[key].previous,
                this.cursorCnfigs[key].current,
                this.cursorCnfigs[key].amt
            )

        }
        //    setting the cursor x and y to our cursor html element
        this.Cursor.style.transform = `
        translateX(${this.cursorCnfigs.x.previous}px) 
        translateY(${this.cursorCnfigs.y.previous}px)
        `;

        requestAnimationFrame(() => this.render())

    }
}
