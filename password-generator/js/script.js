const passwordEl = document.getElementById("password");
const copyEl = document.getElementById("copy");
const lenghtEl = document.getElementById("lenght");
const upperEl = document.getElementById("upper");
const lowerEl = document.getElementById("lower");
const numberEl = document.getElementById("number");
const symbolEl = document.getElementById("symbol");
const generateEl = document.getElementById("generate");
const strenghtEl = document.getElementById("strenght");

const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercase = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&&*()_-+=";

const getUpper = () => {
    return uppercase[Math.floor(Math.random() * uppercase.length)];
};
const getLower = () => {
    return lowercase[Math.floor(Math.random() * lowercase.length)];
};
const getNumbers = () => {
    return numbers[Math.floor(Math.random() * numbers.length)];
};
const getSymbols = () => {
    return symbols[Math.floor(Math.random() * symbols.length)];
};

// create passcode
const generateCode = () => {
    const codeLenght = lenghtEl.value;
    let pass = "";
    for (i = 0; i < codeLenght; i++) {
        const code = password();
        pass += code;
    }
    passwordEl.innerText = pass;
    security();
};

// what user might want passcode to contain
const password = () => {
    const passcode = [];
    if (upperEl.checked) {
        passcode.push(getUpper());
    }
    if (lowerEl.checked) {
        passcode.push(getLower());
    }
    if (numberEl.checked) {
        passcode.push(getNumbers());
    }
    if (symbolEl.checked) {
        passcode.push(getSymbols());
    }
    if (passcode.length === 0) {
        return "";
    }
    return passcode[Math.floor(Math.random() * passcode.length)];
};

// check password strenght
const security = () => {
    const integrity = ["Invalid", "Weak", "Strong", "Unbelievable"];
    if (lenghtEl.value == "") {
        strenghtEl.innerText = integrity[0];
    }
    if (lenghtEl.value > 0 & lenghtEl.value <= 15) {
        strenghtEl.innerText = integrity[1];
    }
    if (lenghtEl.value > 15 & lenghtEl.value <= 128) {
        strenghtEl.innerText = integrity[2];
    }
    if (lenghtEl.value > 128 & lenghtEl.value <= 2048) {
        strenghtEl.innerText = integrity[3];
    }
};

// only digits allowed in text input
const isNumberKey = (evt) => {
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
};

// limit passcode lenght
const maxLenght = (object) => {
    if (object.value.length > object.maxLength)
        object.value = object.value.slice(0, object.maxLength);
};

// copy to clipboard
copyEl.addEventListener("click", () => {
    const textArea = document.createElement("textarea");
    const password = passwordEl.innerText;
    if (!password) {
        return "";
    }
    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    textArea.remove();
    alert("secret key copied to clipboard!");
});

generateEl.addEventListener("click", generateCode);