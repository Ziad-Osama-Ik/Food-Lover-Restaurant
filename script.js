/* script.js
   - Slider for offers
   - Menu generation from array
   - Gallery lightbox
   - Contact form validation
*/

/* ==== MENU DATA ==== */
const menuItems = [
  { name: "LASAL CHEESE", price: "$18.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "./images/food1.png" },
  { name: "JUMBO CRAB SHRIMP", price: "$24.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "./images/food2.png" },
  { name: "KOKTAIL JUICE", price: "$12.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "./images/food3.png" },
  { name: "CAPO STEAK", price: "$60.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "./images/food4.png" },
  { name: "ORGANIC FRUIT SALAD", price: "$8.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "./images/food5.png" },
  { name: "CHEESE PIZZA", price: "$18.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "./images/food6.png" },
  { name: "KOFTA MEAT", price: "$40.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "./images/food7.jpeg" },
  { name: "SPANISH PIES", price: "$14.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "./images/food8.jpeg" },
  { name: "CHEESE TOST", price: "$6.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "./images/food9.jpeg" },
  { name: "FRUIT SALAD", price: "$14.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "./images/food10.jpeg" },
  { name: "CHICKEN SHAWARMA", price: "$20.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "./images/food11.jpeg" },
  { name: "MEGA CHEESE PIZZA", price: "$30.00", description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. At, explicabo.", image: "./images/food12.jpeg" }
];

/* ==== RENDER MENU ==== */
(function renderMenu(){
  const left = document.querySelector('.menu-items-left');
  const right = document.querySelector('.menu-items-right');

  for(let i=0;i<6;i++){
    left.insertAdjacentHTML('beforeend', `
      <div class="menu-item">
        <img src="${menuItems[i].image}" alt="${menuItems[i].name}">
        <div>
          <h3>${menuItems[i].name} <span>${menuItems[i].price}</span></h3>
          <p>${menuItems[i].description}</p>
        </div>
      </div>
    `);
  }

  for(let i=6;i<12;i++){
    right.insertAdjacentHTML('beforeend', `
      <div class="menu-item">
        <img src="${menuItems[i].image}" alt="${menuItems[i].name}">
        <div>
          <h3>${menuItems[i].name} <span>${menuItems[i].price}</span></h3>
          <p>${menuItems[i].description}</p>
        </div>
      </div>
    `);
  }
})();

/* ==== OFFERS SLIDER ==== */
(function offersSlider(){
  const offers = document.querySelector('.offers-items');
  const prev = document.querySelector('#offers .prev') || document.querySelector('.prev');
  const next = document.querySelector('#offers .next') || document.querySelector('.next');
  let index = 0;

  function slide(to){
    const total = offers.children.length;
    index = (index + to + total) % total;
    offers.style.transform = `translateX(-${index * 100}%)`;
  }

  if(next) next.addEventListener('click', ()=> slide(1));
  if(prev) prev.addEventListener('click', ()=> slide(-1));

  // auto-slide every 5 seconds
  setInterval(()=> slide(1), 5000);
})();

/* ==== GALLERY LIGHTBOX ==== */
(function galleryBox(){
  const BoxContainer = document.getElementById("boxContainer");
  const boxItem = document.getElementById("boxItem");
  const images = document.querySelectorAll(".img-gallery img");
  const btnClose = document.getElementById("close");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  const imagesArr = Array.from(images);
  let currentIndex = 0;

  function showImage(index){
    boxItem.style.backgroundImage = `url("${imagesArr[index].src}")`;
  }

  imagesArr.forEach((img, idx) => {
    img.addEventListener('click', () => {
      BoxContainer.style.display = 'flex';
      BoxContainer.setAttribute('aria-hidden','false');
      currentIndex = idx;
      showImage(currentIndex);
    });
  });

  btnClose && btnClose.addEventListener('click', ()=> {
    BoxContainer.style.display = 'none';
    BoxContainer.setAttribute('aria-hidden','true');
  });

  nextBtn && nextBtn.addEventListener('click', ()=> {
    currentIndex = (currentIndex + 1) % imagesArr.length;
    showImage(currentIndex);
  });

  prevBtn && prevBtn.addEventListener('click', ()=> {
    currentIndex = (currentIndex - 1 + imagesArr.length) % imagesArr.length;
    showImage(currentIndex);
  });

  // close when clicking outside
  BoxContainer && BoxContainer.addEventListener('click', (e) => {
    if(e.target === BoxContainer){
      BoxContainer.style.display = 'none';
      BoxContainer.setAttribute('aria-hidden','true');
    }
  });
})();

/* ==== CONTACT FORM VALIDATION ==== */
(function formValidation(){
  const form = document.getElementById('contactForm');
  if(!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const nameError = document.getElementById('name-error');
    const emailError = document.getElementById('email-error');
    const subjectError = document.getElementById('subject-error');
    const messageError = document.getElementById('message-error');

    // clear
    nameError.textContent = '';
    emailError.textContent = '';
    subjectError.textContent = '';
    messageError.textContent = '';

    let valid = true;

    if(name === ''){
      nameError.textContent = 'Please enter your name.';
      valid = false;
    } else if(name.length < 3 || name.length > 15){
      nameError.textContent = 'Name must be 3–15 characters.';
      valid = false;
    }

    if(email === ''){
      emailError.textContent = 'Please enter your email.';
      valid = false;
    } else {
      // simple email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if(!emailRegex.test(email)){
        emailError.textContent = 'Please enter a valid email.';
        valid = false;
      }
    }

    if(subject !== '' && subject.length < 3){
      subjectError.textContent = 'Subject must be at least 3 characters.';
      valid = false;
    }

    if(message !== '' && message.length < 5){
      messageError.textContent = 'Message must be at least 5 characters.';
      valid = false;
    }

    if(valid){
      alert('Form submitted successfully!');
      // if you want real submission, either:
      // 1) set form.action and call form.submit()
      // 2) send via fetch/ajax here
      // form.submit();
    }
  });
})();
