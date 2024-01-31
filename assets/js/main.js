console.log("Welcome to AlphaSpace");

const welcomeSection = document.getElementById("welcome-section");
const conversationSection = document.getElementById("conversation-section");

const userDetails = document.getElementById("user-details");
const userChatList = document.getElementById("user-chat-list");
const selectedUserDetails = document.getElementById("selected-user-details");
const selectedUserConversation = document.getElementById("selected-user-conversation");
const userMenuContainer = document.getElementById("user-menu-container");
const selectedItemContainer = document.getElementById("selected-item-container");


const usernameInputBox = document.getElementById("username-input-box");

let USERNAME = localStorage.getItem("username");

function _renderPages() {
    var hash = window.location.hash.substring(1);

    console.log("USERNAME", USERNAME);
    console.log("hash", hash);

    welcomeSection.style.display = "none";
    conversationSection.style.display = "none";

    console.log(hash.includes("/conversation"));

    if (hash.includes("/conversation") && USERNAME) {
        _renderUserDetails();
        _renderUserChatItem();
        const selectedChat = _getQueryParamValue("selectedChat");
        if (selectedChat) {
            _onChatSelection(selectedChat);
        } else {
            _onChatSelection("global-chats");
        }
        conversationSection.style.display = "inherit";
    } else if (USERNAME) {
        _renderUserDetails();
        _renderUserChatItem();
        _onChatSelection("global-chats");
        conversationSection.style.display = "inherit";
    } else {
        window.location.hash = "";
        welcomeSection.style.display = "inherit";
        // _renderPages();
    }

    // window.addEventListener('hashchange', _renderPages);
}

_renderPages();

function _getQueryParamValue(name) {
    const hash = window.location.hash.substring(1);
    const urlParams = new URLSearchParams(hash);

    return urlParams.get(name);
}

function _joinChat() {
    _setUserName(usernameInputBox.value);
    usernameInputBox.value = "";

    window.location.hash = "/conversation";
    _renderPages();
}

function _setUserName(name) {
    USERNAME = name;
    localStorage.setItem("username", USERNAME);
}

function _logOut() {
    _setUserName("");
    localStorage.clear();

    window.location.hash = "";
    _renderPages();
}

function _renderUserDetails() {
    const userDetailsHTML = `
    <div id="user-avatar" class="relative">
        <div class="flex justify-center items-center text-xl uppercase min-w-10 min-h-10 bg-cyan-700 text-white rounded-full">
            ${USERNAME[0]}
        </div>
        <div class="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0 cursor-pointer"></div>
    </div>
    <p id="username-component" class="text-lg font-medium">
        #${USERNAME}
    </p>`

    userDetails.innerHTML = userDetailsHTML;
}

function _getChats() {
    const currentDate = new Date();
    const tempData = [
        {
            username: "sunny-mountain-garden",
            lastMessage: "hey hi",
            unread_count: 4,
            created_at: currentDate,
        },
        {
            username: "playful-river-zebra",
            lastMessage: "it was nice taking to you",
            unread_count: 4,
            created_at: new Date(currentDate.getTime() - (3 * 60 * 60 * 1000)),
        },
        {
            username: "cosmic-dreamer-meadow",
            lastMessage: "let's catch up soon",
            unread_count: 4,
            created_at: new Date(currentDate.getTime() - (5 * 60 * 60 * 1000)),
        }
    ]

    return tempData;
}

function _renderUserChatItem() {
    const chatItems = _getChats();

    userChatList.innerHTML = '';
    let innerHTML = "";

    chatItems.forEach(element => {
        innerHTML += `

        <div id="${element.username}" class="flex items-center bg-gray-100 gap-x-3 w-full rounded-2xl px-5 py-3 cursor-pointer  user-chat-item" onclick="_onChatSelection('${element.username}')">
            <div
                class="min-w-10 min-h-10 bg-cyan-700 rounded-full relative flex justify-center items-center uppercase text-xl text-white">
                ${element.username[0]}
                <div class="w-3 h-3 rounded-full bg-green-500 absolute bottom-0 right-0 cursor-pointer">
                </div>
            </div>
            <div class="w-full">
                <p class="flex justify-between font-medium items-center">
                    <span>
                        #${element.username}
                    </span>
                    <span class="text-xs">
                        ${element.created_at.toLocaleTimeString()}
                    </span>
                </p>
                <p class="text-sm flex justify-between font-medium items-center mt-1">
                    <span>
                        ${element.lastMessage}
                    </span>
                    <span class="flex justify-center items-center rounded-full text-xs bg-black text-white w-5 h-5">
                        ${element.unread_count}
                    </span>
                </p>
            </div>
        </div>
        `
    });

    userChatList.innerHTML = innerHTML;
}

function _onChatSelection(id) {

    userMenuContainer.classList.add("lg:flex", "hidden",);
    userMenuContainer.classList.remove("basis-full");

    selectedItemContainer.classList.add("basis-full");
    selectedItemContainer.classList.remove("lg:flex", "hidden");

    const userChatItems = document.querySelectorAll('.user-chat-item');
    userChatItems.forEach(item => {
        item.classList.remove('bg-gray-900', 'text-white');
    });

    window.location.hash = `/conversation/&selectedChat=${id}`;

    document.getElementById(id).classList.add('bg-gray-900', 'text-white');

    selectedUserDetails.innerHTML = `
        <div class="min-w-12 min-h-12 bg-purple-700 rounded-full 
            relative flex justify-center items-center text-2xl text-white uppercase">
            ${id[0]}
            <div class="w-4 h-4 rounded-full bg-green-500 absolute bottom-0 right-0 cursor-pointer">
            </div>
            </div>
            <div class="w-full">
            <p class="flex justify-between font-medium items-center text-xl">
                #${id}
            </p>
            <p class="text-sm mt-1">
                Online
            </p>
        </div>
    `

    _renderSelectedUserConversation();
}


function _getUserConversations() {
    const tempData = extendArrayRandomly([], Math.floor(Math.random() * (15 - 3 + 1)) + 3)
    return tempData;
}

function _renderSelectedUserConversation() {
    const conversationData = _getUserConversations();
    let innerHTML = "";
    conversationData.forEach((element) => {
        innerHTML += `
        <div class="flex items-start gap-x-3">
            <div class="min-w-8 min-h-8 bg-yellow-700 rounded-full relative flex justify-center items-center uppercase text-white">
                ${element.from[0]}
            </div>
            <div>
                <p class="text-lg flex gap-x-3 items-center">
                    ${element.from}
                    <span class="text-xs font-light text-bg-300 mt-1">${element.created_at.toLocaleTimeString()}</span>
                </p>
                <p class=" max-w-2xl mt-1 text-base font-light">
                    ${element.message}
                </p>
            </div>
        </div>
        `
    });

    selectedUserConversation.innerHTML = innerHTML;


}


function _unCheckSelection() {
    userMenuContainer.classList.remove("lg:flex", "hidden",);
    userMenuContainer.classList.add("basis-full", "flex");

    selectedItemContainer.classList.remove("basis-full");
    selectedItemContainer.classList.add("lg:flex", "hidden");
    userChatList.forEach(item => {
        item.classList.remove('bg-gray-900', 'text-white');
    });
    window.location.hash = "/conversation";
}




/////////// JUNK

// Function to generate a random string
function generateRandomString() {
    return Math.random().toString(36).substring(2, 15);
}

// Function to generate a random message
function generateRandomMessage() {
    const messages = ["Hello!", "How are you?", "Nice to meet you!", "Greetings!", "Random message!"];
    const randomIndex = Math.floor(Math.random() * messages.length);
    return messages[randomIndex];
}

// Function to extend the array with random data
function extendArrayRandomly(array, count) {
    const currentDate = new Date();
    for (let i = 0; i < count; i++) {
        array.push({
            from: generateRandomString(),
            message: generateRandomMessage(),
            created_at: new Date(currentDate.getTime() - (Math.floor(Math.random() * i) * 60 * 60 * 1000)),
        });
    }

    return array;
}