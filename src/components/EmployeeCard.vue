<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ employee.HoTenNV }}</h5>
            <p class="card-text"><strong>Chức vụ:</strong> {{ employee.ChucVu }}</p>
            <p class="card-text"><strong>Địa chỉ:</strong> {{ employee.DiaChi }}</p>
            <p class="card-text"><strong>Số điện thoại:</strong> {{ employee.SoDienThoai }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        employee: { type: Object, required: true },
    },
};
</script>
