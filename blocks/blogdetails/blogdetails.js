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

    const apiUrl = "/blog-form.json?sheet=blogs";

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
                                    
                                    <div class="blog-text">
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