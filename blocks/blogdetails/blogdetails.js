export default async function decorate(block) {
    const blogWrapper = block.querySelector("div");
    
    // Current page URL
    const currentPageURL = window.location.search;

    // Parameter that needs to read from URL
    const readParam = "title";

    // URLSearchParams Object
    const urlParams = new URLSearchParams(currentPageURL);

    // Check parameter exists and read value
    let searchParamValue = "";
    if (urlParams.has(readParam)) {
        searchParamValue = urlParams.get(readParam);
    }

   //    console.log("searchparam=", searchParamValue);

    const apiUrl = "/blog-form.json?sheet=incoming";

    /**blog details fetch call */
    try {
        const response = await fetch(apiUrl);
        const { data = [] } = await response.json();
       // console.log("data", response)
        data.forEach(element => {

        if(element.title.toLowerCase() === searchParamValue.toLowerCase()){
            console.log("matched", element)
           let blogArticle = document.createElement("div");
           blogArticle.classList.add("blog-article");
           blogArticle.innerHTML = `<h1>${element.title}</h1>
                                    <div class="credit">
                                        by <span>${element.firstname} ${element.lastname}</span>
                                        date
                                    </div>
                                    <div class="banner-image"> 
                                        <img src="https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="banner-image">
                                    </div>
                                    <div class="">
                                    ${element.blogdetails}
                                    </div>
                    `;
           blogWrapper.innerHTML = "";
    blogWrapper.append(blogArticle);
        }
       
       });
       
      } catch {
        //console.log("error")
      }

    



}