export default async function decorate(block) {
  const columns = block.querySelector("div > div");
  columns.classList.add("blog-page");
  const [contentBlock, sidebar] = columns.querySelectorAll("div");
  contentBlock.classList.add("blog-container");
  sidebar.classList.add("left-sidebar");


  const sidebarContent = sidebar.querySelectorAll("table");
  //console.log("sidebar", sidebarContent);
  sidebarContent.forEach((sidebarEl, idy) => {
    sidebarEl.classList.add(`table-${idy + 1}`);
  })
let offset = 0;
let limit = 2;
let totalResult ;
  const url = contentBlock.querySelector("a").href;
  
 // console.log(blogUrl);

  const ul = document.createElement('ul');

  async function createArticles(offset, limit) {
    const blogUrl = `${url}&offset=${offset}&limit=${limit}`;
  
    try {
      const response = await fetch(blogUrl);
      const { total , data = [] } = await response.json();
      //totalResult = response.offset;
      totalResult = total;
     // console.log("toaat", totalResult)
      ul.classList.add("latestblog-list");        
        data.forEach((el) => {
         
          const li = document.createElement('li');
          li.classList.add("bloglist-item")
          li.innerHTML = `<div class="blog-card">
                           <div><a href="/blog-details?title=${el.title}"  class="blog-title">${el.title}</a></div>
                          <div class="blog-credit">by <span>${el.firstname} ${el.lastname}</span> ${el.timestamp !=0 ? el.timestamp : ''} </div>
                          <div class="blog-body">
                           <div class="blog-image">
                           <img src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
                            </div>
                           <div class="blog-details">${(el.blogdetails).slice(0, 200) + "..."}</div>
                          
                          </div>
                          <a href="/blog-details?title=${el.title}" class="read-more">Read More...</a>
                          </div>`;
  
          ul.append(li);        
      
  
        });

       
          
    } catch {

    }
  }
  createArticles(offset, limit);

  contentBlock.innerHTML = "";
  contentBlock.append(ul);

   window.addEventListener('scroll', () => {
   // console.log("toa inside scr at", totalResult)
    //console.log("a", window.scrollY) //scrolled from top
   //console.log("b", window.innerHeight) //visible part of screen
   //console.log("c", document.documentElement.scrollHeight)
    if ((window.scrollY + window.innerHeight + 1) >=
      document.documentElement.scrollHeight) {
      offset = parseInt(offset) + parseInt(limit);
      if((offset-1) <= totalResult){
        createArticles(offset, limit);
      }           
    }
    
  })
  
  
  contentBlock.append(ul);
}