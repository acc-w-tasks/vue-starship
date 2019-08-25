<template>
  <article class="overlay">
    <section class="modal">
      <div class="modal__head">
        <div class="modal__close">
          <button @click="$emit('close')">CLOSE</button>
        </div>
      </div>
      <div class="modal__body">
        <form @submit="onSubmit">
          <label>
            <p>Name</p>
            <input required type="text" placeholder="Your name" />
          </label>
          <label>
            <p>Race</p>
            <input disabled type="text" placeholder="It doesn't matter" />
          </label>
          <label>
            <p>Date</p>
            <input required type="date" placeholder="Choose delivery date" />
          </label>
          <div class="modal__submit">
            <button type="submit" class="primary">Pay</button>
          </div>
        </form>
      </div>
    </section>
  </article>
</template>

<script>
export default {
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.$emit("modalSubmit");
    }
  }
};
</script>

<style lang="scss">
.overlay {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  .modal {
    z-index: 10;
    background: white;
    padding: 15px;
    width: 600px;
    &__head {
      display: flex;
      justify-content: flex-end;
      padding-bottom: 15px;
      button {
        margin: 0;
      }
    }
    &__submit {
      text-align: center;
      button {
        width: 150px;
        padding: 10px;
        font-size: 1.1rem;
      }
    }
    label {
      margin-bottom: 5px;
      display: block;
      p {
        margin-bottom: 5px;
        font-weight: bolder;
      }
    }
  }
}
</style>