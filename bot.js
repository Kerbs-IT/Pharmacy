const sendMessage = document.getElementById("send-message");
const chatCon = document.querySelector('.chat-con');
let textArea = document.getElementById("user_message");
const messageCon = document.querySelector('.bot-con');
const botIconCon = document.querySelector('.bot-icon');


const messageIcon = document.querySelector('.bot-icon i');


function loadingAnimation(){
    const loadingCon = document.createElement("div");
    // class list
    loadingCon.classList.add('loading');

    // make it visible


    for(let i = 0; i < 3; i++){
        const dot = document.createElement("div");
        dot.classList.add("dot");
        loadingCon.appendChild(dot);
    }


    chatCon.appendChild(loadingCon);
    console.log("hi");
    setTimeout(()=>{
        loadingCon.remove();
    },3000);
};


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

sendMessage.addEventListener('click', async () =>{
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
    chatCon.scrollTop = chatCon.scrollHeight; // used to go on the latest message
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
    
        },3000);

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
        chatCon.scrollTop = chatCon.scrollHeight; // used to go on the latest message
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
        
            },3000);


        
        
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
    let compiledMessage = "";

    for( const categories in responses){ // run through every categories
        const match = Object.keys(responses[categories]); // get all the key from each categories

       let matches = match.filter(word => userInput.toLowerCase().includes(word.toLowerCase()))

       console.log(matches);
        if(matches.length > 0){
            matches.forEach(match =>{
                const replies = responses[categories][match];

                compiledMessage += (compiledMessage ? " " : "") + replies[Math.floor(Math.random() * replies.length)];

            })

            
        }
    }

    if(compiledMessage.length > 0){
        return compiledMessage;
    }else{
        return "Sorry i dont have enough knowledge 😢 ";
    }
}