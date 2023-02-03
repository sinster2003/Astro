const imageElement = document.querySelectorAll(".nasaImage");
const paraElement = document.querySelectorAll(".nasaTitle");
const viewElement = document.querySelectorAll(".view-anc");
const viewBtnElement = document.querySelectorAll(".view-btn");
const articleImage = document.getElementById("articleImage");
const articlePara = document.getElementById("articlePara");
const heartElement = document.querySelectorAll(".heart-btn");
const heartColor = document.querySelectorAll(".heart-btn-clicked");
const dataElement = document.querySelector(".event-list");

//Url of the api
const url = "https://api.spaceflightnewsapi.net/v3/articles";

const fetchNasaData = async()=>{
    try
    {
      //Calling the api using fetch(url)
      const response = await fetch(url);
      const data = await response.json();
      let post;
      
      for(let i = 0; i<heartElement.length ;i++)
      {
        //Event handlers for like feature
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
      }

      //to fetch the session array of liked articles
      fetch('/fetch')
      .then(response => response.json())
      .then(likedDatas => {
        for(let i=0;i<likedDatas.length;i++)
        {
          if(likedDatas[i].isLiked && likedDatas[i].id==data[likedDatas[i].index].id)
          {
            heartColor[likedDatas[i].index].style.setProperty("display","block");
          }
        }
        
      });  

      //for the view button and image features from the api
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