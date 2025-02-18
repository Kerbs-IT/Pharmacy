const searchBarElement = document.querySelector(".search-bar");
const searchIconElement = document.getElementById("magnifying-glass");

if(searchBarElement.addEventListener('keydown', function (){

    if(searchBarElement.value){
        searchIconElement.style.display = 'none';
        searchBarElement.style.padding = '15px 15px 15px 30px';
    }else{
        searchIconElement.style.display = 'block';
        searchBarElement.style.padding = '15px 15px 15px 30px';
    }
}));

// animation section

// create an object containing the reviews
// get element name

const quotationNameCon = document.querySelector('.text-container q');
const nameCon = document.querySelector('.review-name');
const reviewData ={
    1:{
        name: "-Gerald Maldiliene",
        review: "The ease of delivery is one that i depended on when i was bedriden and couldn't even walk.Their services is awesome"
    },
    2:{
        name: "-Dante Gulapa",
        review: "The ease of delivery is one that i depended on when i was bedriden and couldn't even walk.Their services is awesome"
    },
    3:{
        name: "-Gabriel Mentos",
        review: "The ease of delivery is one that i depended on when i was bedriden and couldn't even walk.Their services is awesome"
    },
    4:{
        name: "-Cheeze Weeze",
        review: "The ease of delivery is one that i depended on when i was bedriden and couldn't even walk.Their services is awesome"
    }
}

let index = 1;
let reviewLength = Object.keys(reviewData).length;

setInterval(function (){
    if(index > reviewLength){
        index = 1;
    }
    quotationNameCon.style.opacity = 0;
    nameCon.style.opacity = 0;

    setTimeout(function() {
        // Update content
        console.log(`name: ${reviewData[index].name} index: ${index}`);
        quotationNameCon.innerHTML = reviewData[index].review;
        // nameCon.innerHTML = reviewData[index].name;

        // Fade in after updating the content
        quotationNameCon.style.transition = "opacity 1s"; // 1 second fade-in transition
        nameCon.style.transition = "opacity 1s"; // 1 second fade-in transition

        // Set opacity to 1 (fully visible)
        quotationNameCon.style.opacity = 1;
        nameCon.style.opacity = 1;
    }, 500); // Small delay before fading in to ensure fade-out effect is visible (adjust as needed)

    // make the index = 1 if the index is equal to 4 to avoid conflict on the next run
    if(index === 4){
        index = 1;
    }else{
        index++;
    }
}, 6000);

// For responsive hamburger
const hamburger = document.getElementById('hamburger');
const hamburgerContent = document.querySelector('.hamburger-content')

hamburger.addEventListener('click',() =>{
    if(hamburger.classList.contains('fa-bars')){
        hamburger.classList.remove('fa-bars');
        hamburger.classList.add('fa-x');
        hamburgerContent.style.right = '0';
        // hamburgerContent.style.display = 'block';
    }else{
        hamburger.classList.remove('fa-x');
        hamburger.classList.add('fa-bars');
        if(window.innerWidth <= 567){
            hamburgerContent.style.right = '-547px';
        }else if(window.innerWidth > 567 && window.innerWidth <= 767){
            hamburgerContent.style.right = '-767px';
        }else if(window.innerWidth > 768 && window.innerWidth <= 992){
            hamburgerContent.style.right = '-992px';
        }
        
        // hamburgerContent.style.display = 'none';
    }
});
    