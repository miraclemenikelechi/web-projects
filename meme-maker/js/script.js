const memeImageEl = document.getElementById("memeImage");
const topEl = document.getElementById("top");
const bottomEl = document.getElementById("bottom");
const memeEl = document.getElementById("meme");
let image;

memeImageEl.addEventListener("change", () => {
    // create new object for user input image
    const imageUrl = URL.createObjectURL(memeImageEl.files[0]);
    image = new Image();
    image.src = imageUrl;

    // pass selected image to meme maker function
    image.addEventListener("load", () => {
        memeCanvas(memeEl, image, topEl.value, bottomEl.value);
    }, { once: true });
});

const memeCanvas = (memeEl, image, topText, bottomText) => {
    const context = memeEl.getContext("2d");
    const width = image.width;
    const height = image.height;
    const textHeight = height / 10;
    const fontSize = Math.floor(width / 10);

    // image output
    memeEl.width = width;
    memeEl.height = height;
    context.drawImage(image, 0, 0);

    // text output
    context.fillStyle = "white";
    context.strokeStyle = "black";
    context.lineWidth = Math.floor(fontSize / 4);
    context.textAlign = "center";
    context.lineJoin = "round";
    context.font = `${fontSize}px sans-serif`;

    // top text
    context.textBaseline = "top";
    context.strokeText(topText, width / 2, textHeight);
    context.fillText(topText, width / 2, textHeight);

    // bottom text
    context.textBaseline = "bottom";
    context.strokeText(bottomText, width / 2, height - textHeight);
    context.fillText(bottomText, width / 2, height - textHeight);
};

// user updates text on meme
topEl.addEventListener("change", () => {
    memeCanvas(memeEl, image, topEl.value, bottomEl.value);
});

bottomEl.addEventListener("change", () => {
    memeCanvas(memeEl, image, topEl.value, bottomEl.value);
});