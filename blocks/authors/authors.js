import { createOptimizedPicture } from '../../scripts/aem.js';

let jsonData = "";
export default async function decorate(block) {
  const url = block.children?.[0]?.children?.[0]?.textContent;
  const ul = document.createElement('ul');
  try {
    const response = await fetch(url);
    const { data = [] } = await response.json();   
    ul.classList.add("author-list");

    data.forEach(el => {
      const li = document.createElement('li');
      li.classList.add("author-list-item")
      li.innerHTML = `<div class="author-card">
        <a href="/authorprofile?name=${el.name}">
        <div class="author-picture"><img src=${el.profilepic}></div>
        <div class="author-name">${el.name}</div>
        <div class="author-profile">
        ${el.designation}
        ${el.skills}
        </div>
        <div class="social-profile">
       
        </div>
        </a>
        </div>`;

      ul.append(li);
    });
  } catch {

  }
  block.innerHTML = '';
  block.appendChild(ul);
}