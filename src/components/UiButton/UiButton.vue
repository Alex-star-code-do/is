<template>
  <button :class="$style.button" :data-layout="props.layout" :disabled="props.isDisabled" :type="props.type">
    <slot></slot>
  </button>
</template>

<script setup lang="ts">
interface IProps {
  layout?: 'primary' | 'secondary';
  type?: 'submit' | 'button';
  isDisabled?: boolean;
}

const props = withDefaults(defineProps<IProps>(), {
  layout: 'primary',
  type: 'button',
});
</script>

<style module lang="scss">
.button {
  position: relative;
  display: inline-flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  height: 40px;
  padding: 16px 32px;
  font-size: 1rem;
  line-height: 1.5;
  font-weight: 600;
  color: var(--color-white);
  background-color: var(--color-success); 
  border: none;
  border-radius: 17px;
  cursor: pointer;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-in-out;
  user-select: none; 

  &:hover:not(:disabled) {
    background-color: #01a86a; 
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.25); 
  }

  &:active:not(:disabled) {
    background-color: #008c57; 
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }

  &:disabled {
    opacity: 0.5; 
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
    background-color: var(--color-success); 
  }

  &[data-layout='secondary'] {
    color: var(--color-primary);
    background-color: transparent;
    border: 2px solid var(--color-primary);
    box-shadow: none;

    &:hover:not(:disabled) {
      background-color: rgba(0, 120, 212, 0.08); 
      transform: none; 
      box-shadow: 0 2px 4px rgba(0, 120, 212, 0.15); 
    }

    &:active:not(:disabled) {
      background-color: rgba(0, 120, 212, 0.15); 
      box-shadow: 0 1px 2px rgba(0, 120, 212, 0.2);
    }

    &:disabled {
      opacity: 0.45;
      border-color: var(--color-gray-light);
      color: var(--color-gray-light);
      background-color: transparent;
    }
  }
}

</style>
