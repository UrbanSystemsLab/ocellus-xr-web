<!-- 
  Configurable off-canvas menu
-->

<template> 
    <div class="sidebar" style="position: fixed; top: 0; bottom: 0; height: 100vh;" :style="[setHorizontal, { 'max-width': maxWidth, 'transform': translateWidth }]">
        <slot v-if="visible"></slot>
    </div>
</template>

<script> 
export default {
    data() {
        return {
        visible: false
        }
    },
    props: {
        value: {
        type: Boolean
        },
        hideOnEsc: {
        type: Boolean,
        default: true
        },
        hideOnClickOutside: {
        type: Boolean,
        default: true
        },
        sidebarId:{
        type: String
        },
        align: {
        type: String,
        default: 'left'
        },
        width: {
        type: Number,
        default: 270
        },
        units: {
        type: String,
        default: 'px'
        },
        push: {
        type: Boolean,
        default: false
        },
        duration: {
        type: Number,
        default: 0.2
        },
        effect: {
        type: String,
        default: 'linear'
        }
    },
    watch: {
        'value'(val){ setTimeout(() => this.toggle(val)) }
    },
    computed: {
        setHorizontal() {
        return this.align === 'right' ? { right: 0 } : { left: 0 }
        },
        maxWidth() {
        var units = this.units === 'percent' ? '%' : 'px'
        return this.width + units 
        },
        translateWidth() {
        if (this.units === 'px'){
            var units = 'px'
            return this.align === 'right' ? 'translateX(' + this.width + units + ')' : 'translateX(-' + this.width + units + ')'
        } else if (this.units === 'percent') {
            var units = '%'
            return this.align === 'right' ? 'translateX(100' + units + ')' : 'translateX(-100'+ units + ')'
        }
        }
    },

    methods: {
        setupBody() {
        let timingFunction = ''   
        switch(this.effect) {
            case 'bounce':
            timingFunction = 'cubic-bezier(0, 1.1, 0.8, 1.1)'
            break
            default:
            timingFunction = this.effect
            break
        }
        document.getElementById(this.sidebarId).style.transition = 'transform '+this.duration+'s '+timingFunction
        if (this.push) {
            document.body.style.transition = 'transform '+this.duration+'s '+timingFunction
            // Move Map
            // document.getElementById('mapbox-canvas').style.transition = 'transform '+this.duration+'s '+timingFunction
            document.getElementById('mapbox').style.transition = 'width '+this.duration/2+'s '+timingFunction
        }
        },
        clickOutside(e) {
        if(!this.$el.contains(e.target) && this.visible) {
            this.$emit('sidebarWasClosed', false)
            this.toggle(false)
        }
        },
        esc(e) {
        if(e.keyCode === 27) {
            this.$emit('sidebarWasClosed', false)
            return this.toggle(false)
        }
        },
        toggle(show) {
        var units = this.units === 'percent' ? '%' : 'px'
        if(show) {
            if (this.hideOnClickOutside) {
            document.addEventListener('click', this.clickOutside)
            }
            if (this.hideOnEsc) {
            document.addEventListener('keydown', this.esc)
            }
            if (this.push)
            {
            document.body.style.transform = this.align === 'right' ? 'translateX(-'+this.width+units+')' : 'translateX('+this.width+units+')'
            // Move Map
            // document.getElementById('mapbox-canvas').style.transform = this.align === 'right' ? 'translateX('+this.width/2+units+')' : 'translateX(-'+this.width/2+units+')'
            document.getElementById('mapbox').style.width = '50%'
            if (this.units === 'px'){
                var units = 'px'
                // To Test
                document.getElementById(this.sidebarId).style.transform = this.align === 'right' ? 'translateX('+this.width+units+')' : 'translateX(-'+this.width+units+')'
            } else if (this.units === 'percent') {
                var units = '%'
                document.getElementById('mapbox').style.transform = this.align === 'right' ? 'translateX('+100+units+')' : 'translateX(-'+100+units+')'
            }


            }
            else
            document.getElementById(this.sidebarId).style.transform = this.align === 'right' ? 'translateX(-'+ 0 +units+')' : 'translateX('+ 0 +units+')'
            this.setupBody()
            this.visible = true
        } else {
            if (this.push) {
            document.body.style.transform = 'translateX(0)'
            // Move Map
            // document.getElementById('mapbox-canvas').style.transform = 'translateX(0)'
            document.getElementById('mapbox').style.transform = 'translateX(0)'
            document.getElementById('mapbox').style.width = '100%'
            }
            else
            {
            if (this.units === 'px'){
                var units = 'px'
                document.getElementById(this.sidebarId).style.transform = this.align === 'right' ? 'translateX('+this.width+units+')' : 'translateX(-'+this.width+units+')'
            } else if (this.units === 'percent') {
                var units = '%'
                document.getElementById(this.sidebarId).style.transform = this.align === 'right' ? 'translateX(100'+units+')' : 'translateX(-100'+units+')'
                document.getElementById('mapbox').style.transform = 'translateX(0)'
            }
            }

            setTimeout(() => this.visible = false, this.duration * 500)
        }
        }
    }
}
</script>

<style scoped>

</style>