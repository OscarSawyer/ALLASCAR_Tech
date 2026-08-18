document.addEventListener('DOMContentLoaded',()=>{
  const btn=document.querySelector('.menu-btn');
  const nav=document.querySelector('.main-nav');
  if(btn&&nav){btn.addEventListener('click',()=>nav.classList.toggle('open'));}

  const search=document.querySelector('#blogSearch');
  const cat=document.querySelector('#blogCategory');
  const cards=[...document.querySelectorAll('.blog-card')];
  function filter(){
    const q=(search?.value||'').toLowerCase();
    const c=cat?.value||'all';
    cards.forEach(card=>{
      const text=card.innerText.toLowerCase();
      const okText=text.includes(q);
      const okCat=c==='all'||card.dataset.category===c;
      card.style.display=okText&&okCat?'block':'none';
    });
  }
  search?.addEventListener('input',filter);
  cat?.addEventListener('change',filter);
});

// Premium scroll reveal + compact rotating social media carousel
(function(){
  function icon(name){
    const icons={
      ig:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.7A4.3 4.3 0 1 1 12 16.3 4.3 4.3 0 0 1 12 7.7Zm0 2A2.3 2.3 0 1 0 12 14.3 2.3 2.3 0 0 0 12 9.7Zm5.05-3.25a1.05 1.05 0 1 1-1.05 1.05 1.05 1.05 0 0 1 1.05-1.05Z"/></svg>',
      fb:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06Z"/></svg>',
      tt:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 5.82c1.2.86 2.42 1.31 3.74 1.39v3.09a8.23 8.23 0 0 1-3.63-.85v5.72c0 3.1-2.24 5.35-5.42 5.35-3.03 0-5.42-2.13-5.42-5.07 0-3.16 2.62-5.37 5.8-5.06v3.18c-1.49-.33-2.62.47-2.62 1.82 0 1.12.91 1.92 2.08 1.92 1.32 0 2.16-.78 2.16-2.41V3.5h3.31c.08.96.45 1.76 1 2.32Z"/></svg>'
    };
    return icons[name]||'';
  }

 const socials=[
  {key:'ig', label:'Follow us on IG', url:'https://www.instagram.com/allascar_tech/', className:'social-ig'},
  {key:'fb', label:'Follow us on FB', url:'https://www.facebook.com/share/1JVAM7Pbcp/', className:'social-fb'},
  {key:'tt', label:'Follow us on TikTok', url:'https://www.tiktok.com/@allascar_tech', className:'social-tt'}
];

  document.addEventListener('DOMContentLoaded',()=>{
    const revealTargets=document.querySelectorAll('.card,.package,.hero-card,.check-list p,.faq details,.pill-grid span,.contact-form,.author-box,.in-article-cta');
    revealTargets.forEach(el=>el.classList.add('reveal'));
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          entry.target.classList.add('revealed');
          io.unobserve(entry.target);
        }
      });
    },{threshold:.12,rootMargin:'0px 0px -40px 0px'});
    revealTargets.forEach(el=>io.observe(el));

    if(!document.querySelector('.social-carousel')){
      let index=0;
      const dock=document.createElement('div');
      dock.className='social-carousel';
      dock.setAttribute('aria-label','Follow ALLASCAR_Tech on social media');
      dock.innerHTML=`
        <div class="social-carousel-label">Follow ALLASCAR_Tech</div>
        <a class="social-slide ${socials[0].className}" href="${socials[0].url}" aria-label="${socials[0].label}">
          ${icon(socials[0].key)}<span>${socials[0].label}</span>
        </a>`;
      document.body.appendChild(dock);

      const link=dock.querySelector('.social-slide');
      const update=()=>{
        link.classList.remove('slide-in');
        link.classList.add('slide-out');
        setTimeout(()=>{
          index=(index+1)%socials.length;
          const item=socials[index];
          link.className=`social-slide ${item.className}`;
          link.href=item.url;
          link.setAttribute('aria-label',item.label);
          link.innerHTML=`${icon(item.key)}<span>${item.label}</span>`;
          requestAnimationFrame(()=>link.classList.add('slide-in'));
        },320);
      };

      let timer=setInterval(update,5200);
      dock.addEventListener('mouseenter',()=>clearInterval(timer));
      dock.addEventListener('mouseleave',()=>{timer=setInterval(update,5200);});
      dock.addEventListener('focusin',()=>clearInterval(timer));
      dock.addEventListener('focusout',()=>{timer=setInterval(update,5200);});
    }
  });
})();
