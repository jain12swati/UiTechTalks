export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row, idy) => {   
    row.classList.add(`row-${idy + 1}`);
    [...row.children].forEach((col, idx) => {
      col.classList.add(`column-${idx + 1}`);     
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  //const blogUrl = document.querySelector("column-1").textContent;
 // console.log("b", blogUrl)
}
