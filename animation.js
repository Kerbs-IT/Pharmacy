const boxes = document.querySelectorAll('.box');

window.addEventListener('scroll', checkBoxes);
window.addEventListener('DOMContentLoaded', checkBoxes); // Run on page load

function checkBoxes() {
    const triggerBottom = window.innerHeight / 5 * 4; // Recalculate on each call
    console.log(`Updated triggerBottom: ${triggerBottom}`);

    boxes.forEach(box => {
        const boxTop = box.getBoundingClientRect().top;
        // console.log(`boxTop: ${boxTop}`);

        if (boxTop < triggerBottom) {
            // console.log('added');
            box.classList.add('show');
        } else {
            // console.log('remove');
            box.classList.remove('show');
        }
    });
}
