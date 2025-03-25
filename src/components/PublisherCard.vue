<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ publisher.TenNXB }}</h5>
            <p class="card-text"><strong>Địa chỉ:</strong> {{ publisher.DiaChi }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        publisher: { type: Object, required: true },
    },
};
</script>
