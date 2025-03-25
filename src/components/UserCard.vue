<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ user.Ten }} {{ user.HoLot }}</h5>
            <p class="card-text"><strong>Ngày sinh:</strong> {{ user.NgaySinh }}</p>
            <p class="card-text"><strong>Giới tính:</strong> {{ user.Phai }}</p>
            <p class="card-text"><strong>Địa chỉ:</strong> {{ user.DiaChi }}</p>
            <p class="card-text"><strong>Điện thoại:</strong> {{ user.DienThoai }}</p>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: { type: Object, required: true },
    },
};
</script>
