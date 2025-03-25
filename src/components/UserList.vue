<template>
    <ul class="list-group">
        <li class="list-group-item"
            v-for="(user, index) in users"
            :key="user.MaDocGia"
            :class="{ active: index === activeIndex }"
            @click="updateActiveIndex(index)">
            {{ user.Ten }} {{ user.HoLot }}
        </li>
    </ul>
</template>

<script>
export default {
    props: {
        users: { type: Array, default: [] },
        activeIndex: { type: Number, default: -1 },
    },
    emits: ["update:activeIndex"],
    methods: {
        updateActiveIndex(index) {
            this.$emit("update:activeIndex", index);
        }
    }
};
</script>
