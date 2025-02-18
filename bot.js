const sendMessage = document.getElementById("send-message");
const chatCon = document.querySelector('.chat-con');
let textArea = document.getElementById("user_message");
const messageCon = document.querySelector('.bot-con');
const botIconCon = document.querySelector('.bot-icon');
const loading = document.querySelector(".loading");


const messageIcon = document.querySelector('.bot-icon i');

// handle close and open of the message box
botIconCon.addEventListener('click', () =>{
    messageIcon.classList.remove('rotate-once');

    void messageIcon.offsetWidth;

    if(messageIcon.classList.contains('fa-message')){
        messageCon.style.scale = 1;
        
        messageIcon.classList.remove('fa-message');
        messageIcon.classList.add('fa-x');
        messageIcon.classList.add('rotate-once');
    }else if(messageIcon.classList.contains('fa-x')){
        messageCon.style.scale = 0;

        messageIcon.classList.remove('fa-x');
        messageIcon.classList.add('fa-message');
        messageIcon.classList.add('rotate-once');
        console.log('working');
    }
});

sendMessage.addEventListener('click', () =>{
    let chat = document.createElement("div");
    let message = document.createElement("p");

    // add classes on new div
    chat.classList.add("chat");
    chat.classList.add("outgoing");

    // add value to the p
    message.textContent = textArea.value;

    chat.appendChild(message);
    chatCon.appendChild(chat);
    
    textArea.value = "";
});


textArea.addEventListener("keydown", async (event) =>{
    if(event.key === "Enter"){
        event.preventDefault(); 

        let chat = document.createElement("div");
        let message = document.createElement("p");
        let botIcon = document.createElement("i");
    
        // add classes on new div
        chat.classList.add("chat");
        chat.classList.add("outgoing");
    
        // add value to the p
        message.textContent = textArea.value;
        let userChat = textArea.value;
    
        chat.appendChild(message);
        chatCon.appendChild(chat);
        
        textArea.value = "";

        chatCon.scrollTop = chatCon.scrollHeight; // used to go on the latest message
        


        // bot variables
        let botChat = document.createElement("div");
        let botMessage = document.createElement("p");

        // get the bot response
        // always remember to use async in the event listener since it is async it need to follow 
        
        loadingAnimation();
    
        
        const reply = await getResponse(userChat); // use to get the reply from the JSOn file.
        console.log(reply);


            setTimeout(() =>{
                botChat.classList.add("chat");
                botChat.classList.add("incoming");
    
                // add class to bot icon
                botIcon.classList.add("fa-solid");
                botIcon.classList.add("fa-robot");
    
                // add content to the response of bot
                botMessage.textContent = reply;
                // append the icon and message
                botChat.appendChild(botIcon);
                botChat.appendChild(botMessage);
                chatCon.appendChild(botChat);

                chatCon.scrollTop = chatCon.scrollHeight; // used to go on the latest message
        
            },1000);

        
        
    }
});

// get response from json file
async function loadResponse() {
    try {
        const response = await fetch("response.json");
        const data = await response.json();

        return data;
        
    } catch (error) {
        console.log("Error loading JSON: ", error);
    }
}

async function getResponse(input) {
    const responses = await loadResponse();
    const userInput = input.toLowerCase();

    for( const categories in responses){
        const match = Object.keys(responses[categories]).find(keyword => userInput.includes(keyword));

        if(match){
            const replies = responses[categories][match];

            return replies[Math.floor(Math.random()* replies.length)];
        }
    }

    return "Sorry i dont have enough knowledge 😢 ";
}

function loadingAnimation(){
    const container = document.createElement('div');
    const dot = document.createElement('div');


    container.classList.add("loading");

    for(let i = 0; i < 3; i++){
        dot.classList.add("dot");
        container.appendChild(dot);
    }


    chatCon.appendChild(container);
}