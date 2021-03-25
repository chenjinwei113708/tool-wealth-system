<script>
export default {
  name: 'v-button',

  props: {
    type: {
      type: String,
      default: 'default',
      validator (value) {
        return ['default', 'primary', 'link', 'dark'].indexOf(value) !== -1;
      }
    },
    href: {
      type: String,
    },
    // 当 type === 'link' 时生效
    route: {
      type: Boolean,
      default: false,
    },
    // 当 type === 'link' 时生效
    linkType: {
      type: String,
      default: 'default',
      validator (value) {
        return ['default', 'primary', 'dark'].indexOf(value) !== -1;
      }
    },
    size: {
      type: String,
      default: 'medium',
      validator (value) {
        return ['medium', 'small'].indexOf(value) !== -1;
      }
    },
    disabled: Boolean,
  },

  methods: {
    onClick (e) {
      if (this.disabled) {
        return;
      }
      this.$emit('click', e);
    }
  },

  render (h) {
    if (this.type === 'link' && !this.href) {
      process.env.NODE_ENV === 'development' && console.error('当type为link时 href 为必须');
    }

    const disabledClass = this.disabled ? 'disabled' : '';

    if (this.type === 'link') {
      if (this.route) {
        return (
          <nuxt-link to={this.localePath(this.href)} tag="a" class={`v_button ${this.size} ${this.linkType} ${disabledClass}`} onClick={this.onClick}>
            {this.$slots.default}
          </nuxt-link>
        )
      }
      return (
        <a class={`v_button ${this.size} ${this.linkType} ${disabledClass}`} href={this.href} onClick={this.onClick}>
          {this.$slots.default}
        </a>
      )
    }

    return (
      <button class={`v_button ${this.size} ${this.type} ${disabledClass}`} onClick={this.onClick}>
        {this.$slots.default}
      </button>
    )
  }
}
</script>

<style lang="scss" scoped>
.v_button {
  display: inline-block;
  padding: px2rem(20px) px2rem(80px);
  line-height: 1;
  text-align: center;
  font-size: px2rem(26px);
  outline: none;
  border: 1px solid #005fd5;
  color: #005fd5;
  background-color: #fff;
  border-radius: px2rem(8px);
  cursor: pointer;
  transition: all .3s; 

  &:not(.disabled):hover {
    color: #fff;
    border-color: #005fd5;
    background-color: #0072FF; 
  }

  &.disabled {
    cursor: default;
    background-color: rgb(233, 233, 233);
    opacity: 0.8;
  }

  &.small {
    padding: px2rem(16px) px2rem(62px);
    font-size: px2rem(24px);
  }

  &.primary {
    border-color: #005fd5;
    background-color: #005fd5;
    color: #fff;
    &:not(.disabled):hover {
      border-color: #0072FF;
      background-color: #0072FF; 
    }
  }
  &.dark {
    border-color: #111b28;
    background-color: #111b28;
    color: #fff;
    &:not(.disabled):hover {
      border-color: rgba($color: #111b28, $alpha: 0.8);
      background-color: rgba($color: #111b28, $alpha: 0.8); 
    }
  }
}

@media only screen and (max-width: 750px) {
  .v_button {
    $design-width: 750px;
    @import '@/assets/scss/mixin.scss';

    padding: px2rem(12px) px2rem(38px);
    font-size: px2rem(26px);
    border-radius: px2rem(6px);

    &.small {
      padding: px2rem(12px) px2rem(38px);
      font-size: px2rem(26px);
    }
  }
}
</style>
