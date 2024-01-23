import { createOptimizedPicture } from '../../scripts/aem.js';
/* fetching data for contributors */
//const url = "/contributors.json";

let jsonData = "";
export default async function decorate(block) {
  const url = block.children?.[0]?.children?.[0]?.textContent;
  const ul = document.createElement('ul');
  try {
    const response = await fetch(url);
    const { data = [] } = await response.json();
    ul.classList.add("latestblog-list");
// console.log("data", data)
    data.forEach((el, idx) => {
       // console.log("el", el)
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
  block.innerHTML = '';
  block.appendChild(ul);
}