const socket = io("http://localhost:5000");

class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        }

        this.state = false;
        this.messages = [];

        // Initialize socket connection
        this.socket = socket; // Connect to the WebSocket server

        // Listen for responses from the server
        this.socket.on("response", (data) => {
            console.log('Received response:', data); // Debug log
            let msg = { name: "ChaMi", message: data }; // Assume "ChaMi" is the bot
            this.messages.push(msg);
            this.updateChatText(this.args.chatBox);
        });
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        const node = chatBox.querySelector('input');
        node.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") {
                this.onSendButton(chatBox);
            }
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;

        // Show or hide the box
        if (this.state) {
            chatbox.classList.add('chatbox--active');
        } else {
            chatbox.classList.remove('chatbox--active');
        }
    }

    onSendButton(chatbox) {
        var textField = chatbox.querySelector('input');
        let text1 = textField.value;
        if (text1 === "") {
            return;
        }

        console.log('Sending message:', text1); // Debug log
        let msg1 = { name: "User", message: text1 };
        this.messages.push(msg1);

        // Send the user's message to the WebSocket server
        this.socket.emit("message", text1);

        this.updateChatText(chatbox);
        textField.value = ""; // Clear input field
    }

    updateChatText(chatbox) {
        var html = '';
        this.messages.slice().reverse().forEach(function(item, number) {
            if (item.name == "ChaMi") {
                html += '<div class="messages__item messages__item--visitor">' + item.message + '</div>';
            } else {
                html += '<div class="messages__item messages__item--operator">' + item.message + '</div>';
            }
        });

        const chatmessage = chatbox.querySelector('.chatbox__messages');
        chatmessage.innerHTML = html;
    }
}

const chatbot = new Chatbox();
chatbot.display();