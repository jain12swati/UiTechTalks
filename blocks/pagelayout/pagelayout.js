export default async function decorate(block) {
    const columns = block.querySelector("div > div");
    columns.classList.add("blog-page");
    const [contentBlock, sidebar] = columns.querySelectorAll("div");
   // console.log("columns :: ", contentBlock, sidebar);
    contentBlock.classList.add("blog-container");
    sidebar.classList.add("left-sidebar");   

    
    const sidebarContent =  sidebar.querySelectorAll("table");
    console.log("sidebar", sidebarContent);
    sidebarContent.forEach((sidebarEl, idy)=>
    {
        sidebarEl.classList.add(`table-${idy+1}`);
    })
  
    const blogUrl = contentBlock.querySelector("a").href;   
    const ul = document.createElement('ul');
    try {
      const response = await fetch(blogUrl);
      const { data = [] } = await response.json();
      ul.classList.add("latestblog-list");
  
      data.forEach((el, idx) => {         
        const li = document.createElement('li');
        li.classList.add("bloglist-item")
        li.innerHTML = `<div class="blog-card">
                       <div class="blog-title">${el.title}</div>
                      <div class="blog-credit">by <span>${el.firstname} ${el.lastname}</span> ${el.date} </div>
                      <div class="blog-body">
                      <img src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
                      <p class="blog-details">Lorem ipsum dolor sit, 
                      amet consectetur adipisicing elit. Nulla illo consequatur saepe ratione cupiditate illum, 
                      explicabo neque adipisci consectetur alias?</p>
                      </div>
    
                      </div>`;
  
        ul.append(li);
      });
    } catch {
  
    }

    contentBlock.innerHTML = "";
    contentBlock.append(ul);
}