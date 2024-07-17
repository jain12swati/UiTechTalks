export default async function decorate(block) {
  const columns = block.querySelector("div > div");
 // console.log(columns)
  columns.classList.add("blog-page");
  const [contentBlock, sidebar] = columns.querySelectorAll("div");
  contentBlock.classList.add("blog-container");
  sidebar.classList.add("left-sidebar");

  const loader = document.createElement("div");
  loader.classList.add("loader");
  loader.innerHTML = `<div></div>
                      <div></div>
                      <div></div>`;
  //console.log("loader", loader)


  const sidebarContent = sidebar.querySelectorAll("table");
  //console.log("sidebar", sidebarContent);
  sidebarContent.forEach((sidebarEl, idy) => {
    sidebarEl.classList.add(`table-${idy + 1}`);
  })
  let offset = 0;
  let limit = 4;
  let totalResult;
  const url = contentBlock.querySelector("a").href;

  if (url) {
    contentBlock.innerHTML = "";
    contentBlock.append(loader);
  }

  // console.log(blogUrl);
  const hideLoader = () => {
    loader.classList.remove('show');
  };

  const showLoader = () => {
    loader.classList.add('show');
  };

  const getBlogs = async (offset, limit) => {
    const API_URL = `${url}&offset=${offset}&limit=${limit}`;
    const response = await fetch(API_URL);
    // handle 404
    if (!response.ok) {
      throw new Error(`An error occurred: ${response.status}`);
    }
   // console.log("a", response)
    return await response.json();

  }

  const ul = document.createElement('ul');

  const showBlogs = (data) => {
    ul.classList.add("latestblog-list");
    data.forEach((el) => {

      const li = document.createElement('li');
      li.classList.add("bloglist-item")
      li.innerHTML = `<div class="blog-card">
                             <div><a href="/blog-details?title=${el.title}"  class="blog-title">${el.title}</a></div>
                            <div class="blog-credit">By <span><a href='/authorprofile?name=${el.firstname}%20${el.lastname}'>${el.firstname} ${el.lastname}</a></span> ${el.timestamp != 0 ? el.timestamp : ''} </div>
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
  };



  const loadQuotes = async (offset, limit) => {

    // show the loader
    showLoader();

    // 0.5 second later
    setTimeout(async () => {
      try {

        const { total, data = [] } = await getBlogs(offset, limit);

        showBlogs(data);

        totalResult = total;

      } catch (error) {
        console.log(error.message);
      } finally {
        hideLoader();
      }
    }, 1000);

  };



  loadQuotes(offset, limit);
  contentBlock.insertBefore(ul, contentBlock.firstChild);

  window.addEventListener('scroll', () => {
    const {
      scrollTop,
      scrollHeight,
      clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 5) {

      offset = parseInt(offset) + parseInt(limit);
      if ((offset - 1) <= totalResult) {
        loadQuotes(offset, limit);
      }

    }
  }, {
    passive: true
  });




  contentBlock.insertBefore(ul, contentBlock.firstChild);
}