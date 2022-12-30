const imageElement = document.querySelectorAll(".nasaImage");
const paraElement = document.querySelectorAll(".nasaTitle");
const viewElement = document.querySelectorAll(".view-anc");
const viewBtnElement = document.querySelectorAll(".view-btn");
const articleImage = document.getElementById("articleImage");
const articlePara = document.getElementById("articlePara");
const heartElement = document.querySelectorAll(".heart-btn");
const heartColor = document.querySelectorAll(".heart-btn-clicked");
const dataElement = document.querySelector(".event-list");

const url = "https://api.spaceflightnewsapi.net/v3/articles";

const fetchNasaData = async()=>{
    try
    {
      const response = await fetch(url);
      const data = await response.json();
      let post;
      
      for(let i = 0; i<heartElement.length ;i++)
      {
        heartElement[i].addEventListener("click",async ()=>{
          post = {
            id: data[i].id,
            index: i,
            isLiked: true
          }
          heartColor[i].style.setProperty("display","block");
          const response = await fetch("/explore",{
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(post)
          });
        });
      
        heartColor[i].addEventListener("click",async()=>{
          post = {
            id: data[i].id,
            index: i,
            isLiked: false
          }
          heartColor[i].style.setProperty("display","none");
          const response = await fetch("/explore",{
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(post)
          });
        });

        fetch('/fetch')
        .then(response => response.json())
        .then(likedDatas => {
          if(likedDatas[i].isLiked)
          {
            heartColor[likedDatas[i].index].style.setProperty("display","block");
          }
        });       
      }

      for(let i=0;i<data.length;i++)
      {
        imageElement[i].src = data[i].imageUrl;
        paraElement[i].textContent = data[i].title;
        
        viewBtnElement[i].addEventListener("click",()=>{
          viewElement[i].href = `/explore/${data[i].id}`;
        });
      }
    }
    catch(err)
    {
      console.log("Error: "+err);
    }
};

fetchNasaData();