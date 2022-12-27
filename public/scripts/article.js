const imageElement = document.getElementById("articleImage");
const paraElement = document.getElementById("articlePara");
const headerElement = document.getElementById("heading");
const div = document.querySelector(".events-article");

const url = "https://api.spaceflightnewsapi.net/v3/articles";

async function fetchImage(){
    try
    {
      const response = await fetch(url);
      const data = await response.json();
      const id = div.dataset.articleid;
      
      for(let i=0;i<data.length;i++)
      {
        if(id == data[i].id)
        {
          imageElement.src = data[i].imageUrl;
          paraElement.textContent = data[i].summary;
          headerElement.textContent = data[i].title; 
        }
      }
    }
    catch(err)
    {
      console.log("Error: "+err);
    }
}

fetchImage();