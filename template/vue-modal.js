// 增加一个自定义组件的dialog，可考虑改成Vue-ele版本modal
exports.createModal = (name) => `
<template>

    <b-dialog :open="visible" :close-on-click-outside="false" title="${name}" @close="cancel">
        <div class="${name}-body">
            <p>Body Here</p>
        </div>

        <button slot="actions" class="simple lg" @click="cancel()">取消</button>
        <button slot="actions" class="simple lg" @click="confirm()">确定</button>
    </b-dialog>

</template>

<script type="text/babel">

export default {
    name: '${name}',

    data() {
        return {
            visible: false
        }
    },

    methods: {
        cancel() {
            const vm = this;
            vm.reject();
        },

        confirm() {
            const vm = this;
            vm.resolve();
        }
    }
}

</script>
`