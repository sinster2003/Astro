const imageElement = document.querySelectorAll(".nasaImage");
const paraElement = document.querySelectorAll(".nasaTitle");
const viewElement = document.querySelectorAll(".view-anc");
const viewBtnElement = document.querySelectorAll(".view-btn");
const articleImage = document.getElementById("articleImage");
const articlePara = document.getElementById("articlePara");
let index;

const url = "https://api.spaceflightnewsapi.net/v3/articles";

const fetchNasaData = async()=>{
    try
    {
      const response = await fetch(url);
      const data = await response.json();
      
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