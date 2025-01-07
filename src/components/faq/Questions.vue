<template>
  <div class="faq__content">
    <h2 class="font-bold text-3xl pb-10">Frequently Asked Questions</h2>
    <div class="faq__questions">
      <div 
        v-for="question in questions"  
        :key="question.question"
        :class="question.active ? 'faq__question_active' : 'faq__question'"
      >
        <h3 class="font-bold text-lg w-11/12">{{ question.question }}</h3>
        <img 
          @click="question.active = !question.active" 
          src="../../assets/images/xmark.png" 
          alt="more"
        >
        <p class="w-full">
          Nibh quisque suscipit fermentum netus nulla cras 
          porttitor euismod nulla. Orci, dictumst nec aliquet 
          id ullamcorper venenatis. 
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      questions: [
        {
          question: 'Where can I watch?',
          active: false
        },
        {
          question: 'Mauris id nibh eu fermentum mattis purus?',
          active: false
        },
        {
          question: 'Eros imperdiet rhoncus?',
          active: false
        },
        {
          question: 'Fames imperdiet quam fermentum?',
          active: false
        },
        {
          question: 'Varius vitae, convallis amet lacus sit aliquet nibh?',
          active: false
        },
        {
          question: 'Tortor nisl pellentesque sit quis orci dolor?',
          active: false
        },
        {
          question: 'Vestibulum mauris mauris elementum proin amet auctor ipsum nibh sollicitudin?',
          active: false
        }
      ]
    }
  }
}
</script>