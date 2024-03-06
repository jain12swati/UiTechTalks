export default async function decorate(block) {

    const columns = block.querySelector("div > div");
    columns.classList.add("blog-page");
    const [contentBlock, sidebar] = columns.querySelectorAll("div");
   
    contentBlock.classList.add("blog-container");
    sidebar.classList.add("profilebar");

    
    const currentPageURL = window.location.search;    
    const readParam = "name";    
    const urlParams = new URLSearchParams(currentPageURL);    
    let searchParamValue = "";
    if (urlParams.has(readParam)) {
        searchParamValue = urlParams.get(readParam);
    }    

    const apiUrl = "/writers.json?sheet=authors";

    let email = "";
    let mediumUser = "";

    /**profile details fetch call */
    try {
        const response = await fetch(apiUrl);
        const { data = [] } = await response.json();
        // console.log("data", response)
        data.forEach(element => {

            if (element.name.toLowerCase() === searchParamValue.toLowerCase()) {
                // console.log("matched", element);
                email = element.email;
                mediumUser = element.mediumusername;
                let blogArticle = document.createElement("div");
                blogArticle.classList.add("profile-details");
                blogArticle.innerHTML = ` <div class="profile-image"> 
                                    <img src="${element.profilepic}" alt="banner-image">
                                     </div>
                                    <h3>${element.name}</h3>
                                    <div class="profile-designation">
                                    ${element.designation}
                                    </div>
                                    <div class="social-profile">
                                         <span>${email} </span>                                        
                                    </div>                                  
                                    
                                    `;
                sidebar.innerHTML = "";
                sidebar.append(blogArticle);
            }

        });

    } catch {
        //console.log("error")
    }

    //api call for fetching blogs from medium 
    let mediumblogArticle = ""
    const ul = document.createElement('ul');
    if (mediumUser) {
        try {
            const mediumApiUrl = `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${mediumUser}`;
            const response = await fetch(mediumApiUrl);
            const data = await response.json();
            console.log("data", data.items)
            let a = data.items;
            console.log("a", a)

            ul.classList.add("latestblog-list");

            (a).forEach(element => {

                // console.log("tle", element)

                // if(element.name.toLowerCase() === searchParamValue.toLowerCase()){


                mediumblogArticle = document.createElement("li");
                mediumblogArticle.classList.add("blog-article");
                mediumblogArticle.innerHTML = ` 
           <div class="blog-card">
           <div><a href="${element.link}"  class="blog-title" target="_blank">${element.title}</a></div>
       
          <div class="blog-body">
        
           <div class="blog-details">${(element.content).slice(0, 250)}...</div>
          
          </div>
          <a href="${element.link}" class="read-more">Read More...</a>
          
          </div> `;
                
                ul.append(mediumblogArticle);              

            });

        } catch {
            //console.log("error")
        }

    }

     //api call for fetching inhouse blogs 

     const blogUrl = contentBlock.querySelector("a").href;   
    const ul2 = document.createElement('ul');
    try {
      const response = await fetch(blogUrl);
      const { data = [] } = await response.json();
      ul2.classList.add("latestblog-list");
      console.log("data", data);
      data.forEach((el) => { 
        if(el.email.toLowerCase() === email.toLowerCase() ){
            console.log("hi");
       
        console.log("li", el);        
        const li2 = document.createElement('li');
        li2.classList.add("bloglist-item")
        li2.innerHTML = `<div class="blog-card">
                       <div><a href="/blog-details?title=${el.title}"  class="blog-title">${el.title}</a></div>
                      <div class="blog-credit">by <span>${el.firstname} ${el.lastname}</span> ${el.date} </div>
                      <div class="blog-body">
                       <div class="blog-image">
                       <img src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="">
                        </div>
                       <div class="blog-details">${(el.blogdetails).slice(0, 200)+"..."}</div>
                      
                      </div>
                      <a href="/blog-details?title=${el.title}" class="read-more">Read More...</a>
                      </div>`;
  
        ul2.append(li2);
        }
      });
    } catch {
  
    }
        


    contentBlock.innerHTML = "";
    contentBlock.append(ul);
    contentBlock.append(ul2);




}