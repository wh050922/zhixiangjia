/**
 * Uni-app 组件 → 标准 HTML 兼容映射
 */
import { h, defineComponent } from 'vue'

// view → div
const View = defineComponent({
  props: ['class', 'style', 'hoverClass'],
  setup(props, { slots }) {
    return () => h('div', { class: props.class, style: props.style }, slots?.default?.())
  }
})

// text → span
const Text = defineComponent({
  props: ['class', 'style'],
  setup(props, { slots }) {
    return () => h('span', { class: props.class, style: props.style }, slots?.default?.())
  }
})

// image → img
const Image = defineComponent({
  props: ['src', 'mode', 'class', 'style'],
  setup(props) {
    return () => h('img', {
      src: props.src,
      class: props.class,
      style: { ...(props.style || {}), objectFit: props.mode === 'aspectFill' ? 'cover' : props.mode === 'aspectFit' ? 'contain' : 'fill' }
    })
  }
})

// scroll-view → div with overflow
const ScrollView = defineComponent({
  props: ['scrollX', 'scrollY', 'class', 'style', 'showScrollbar', 'enhanced'],
  setup(props, { slots }) {
    return () => h('div', {
      class: props.class,
      style: {
        ...(props.style || {}),
        overflowX: props.scrollX ? 'auto' : 'hidden',
        overflowY: props.scrollY ? 'auto' : 'hidden',
        whiteSpace: props.scrollX ? 'nowrap' : 'normal',
        scrollbarWidth: props.showScrollbar === false ? 'none' : 'auto',
        WebkitOverflowScrolling: 'touch'
      }
    }, slots?.default?.())
  }
})

// swiper → simple carousel (just show first slide)
const Swiper = defineComponent({
  props: ['class', 'style', 'circular', 'autoplay', 'interval'],
  setup(props, { slots }) {
    return () => h('div', { class: props.class, style: { ...(props.style || {}), overflow: 'hidden' } }, slots?.default?.())
  }
})

const SwiperItem = defineComponent({
  props: ['class', 'style'],
  setup(props, { slots }) {
    return () => h('div', { class: props.class, style: { ...(props.style || {}), flexShrink: 0, width: '100%' } }, slots?.default?.())
  }
})

// input → native input
const Input = defineComponent({
  props: ['value', 'placeholder', 'type', 'class', 'style', 'modelValue', 'placeholderStyle'],
  emits: ['update:modelValue', 'confirm'],
  setup(props, { emit }) {
    return () => h('input', {
      value: props.modelValue ?? props.value,
      placeholder: props.placeholder,
      type: props.type || 'text',
      class: props.class,
      style: { ...(props.style || {}), border: 'none', outline: 'none', background: 'transparent', width: '100%' },
      onInput: (e) => emit('update:modelValue', e.target.value),
      onKeydown: (e) => { if (e.key === 'Enter') emit('confirm') }
    })
  }
})

// picker → select
const Picker = defineComponent({
  props: ['mode', 'class', 'style'],
  emits: ['change'],
  setup(props, { slots, emit }) {
    return () => h('div', {
      class: props.class,
      style: props.style,
      onClick: () => {
        // For region picker, show a prompt
        if (props.mode === 'region') {
          const val = window.prompt('请输入省/市/区（用 / 分隔）：')
          if (val) {
            emit('change', { detail: { value: val.split('/').map(s => s.trim()) } })
          }
        }
      }
    }, slots?.default?.())
  }
})

// button → native button styled
const Button = defineComponent({
  props: ['class', 'style', 'disabled'],
  setup(props, { slots }) {
    return () => h('button', {
      class: props.class,
      style: { ...(props.style || {}), border: 'none', cursor: 'pointer' },
      disabled: props.disabled
    }, slots?.default?.())
  }
})

export default {
  install(app) {
    app.component('view', View)
    app.component('text', Text)
    app.component('image', Image)
    app.component('scroll-view', ScrollView)
    app.component('swiper', Swiper)
    app.component('swiper-item', SwiperItem)
    app.component('input', Input)
    app.component('picker', Picker)
    app.component('button', Button)
  }
}
