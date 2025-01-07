<template>
  <footer>
    <div class="footer__company mb-3 mr-5">
      <img src="../assets/images/Logo(7).png" alt="logo">
      <p class="my-10">
        Copyright © 2020 Nexcent ltd. <br>
        All rights reserved
      </p>
      <div class="footer__socials flex justify-between w-44">
        <a
          href="#"
          class="footer__social"
          v-for="img in social"
          :key="img" 
        >
          <img :src="img.img" alt="icon" :id="img.id">
        </a>
      </div>
    </div>
    <div class="footer__content">
      <div class="footer__links">
        <span>Company</span>
        <ul>
          <li><a href="#">About us</a></li>
          <li><a href="#">Blog</a></li>
          <li><a href="#">Contact us</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Testimonials</a></li>
        </ul>
      </div>
      <div class="footer__links">
        <span>Support</span>
        <ul>
          <li><a href="#">Help center</a></li>
          <li><a href="#">Terms of service</a></li>
          <li><a href="#">Legal</a></li>
          <li><a href="#">Privacy policy</a></li>
          <li><a href="#">Status</a></li>
        </ul>
      </div>
      <div class="footer__email">
        <span>Stay up to date</span>
        <div class="footer__send-email mt-6 w-64 h-10 relative">
          <input type="text" placeholder="Your email address">
          <button><img src="../assets/images/Vector.png" alt="send"></button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    social: [
      {
        img: '/src/assets/images/Path1.png',
        id: 'instagram'
      },
      {
        img: '/src/assets/images/Path2.png',
        id: 'dribble'
      },
      {
        img: '/src/assets/images/Path3.png',
        id: 'twitter'
      },
      {
        img: '/src/assets/images/Path4.png',
        id: 'youtube'
      }
    ]
  })
}
</script>