const profileImageElement = document.getElementById("profile");
const imageInputElement = document.getElementById("userpic");
const paraElement = document.getElementById("instruction");
const defaultPic = profileImageElement.src;

// change the input image and preview feature
imageInputElement.addEventListener("change",()=>{
    const imageFile = imageInputElement.files[0];
    const imagePath = URL.createObjectURL(imageFile);
    profileImageElement.src=imagePath;

    if(imagePath !== defaultPic)
    {
        paraElement.style.setProperty("visibility","hidden");
    }
    else
    {
        paraElement.style.setProperty("visibility","visible");
    }
});