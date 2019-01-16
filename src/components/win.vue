<template>
    <div>
        <div class="win">
            <div class="head">head
                <slot name="head"></slot>
            </div>
            <slot></slot>
            <div class="foot">foot</div>
        </div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>