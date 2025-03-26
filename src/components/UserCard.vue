<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ user.Ten }} {{ user.HoLot }}</h5>
            <p class="card-text"><strong>Ngày sinh:</strong> {{ user.NgaySinh }}</p>
            <p class="card-text"><strong>Giới tính:</strong> {{ user.Phai }}</p>
            <p class="card-text"><strong>Địa chỉ:</strong> {{ user.DiaChi }}</p>
            <p class="card-text"><strong>Điện thoại:</strong> {{ user.DienThoai }}</p>

            <!-- Nút xóa -->
            <button class="btn btn-danger mt-3" @click="deleteUser">Xóa</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        user: { type: Object, required: true },
    },
    methods: {
        deleteUser() {
            console.log("📌 ID người dùng cần xóa:", this.user._id); // Sử dụng _id thay vì MaDocGia
            if (!this.user._id) {
                console.error("❌ Lỗi: _id không hợp lệ!", this.user);
                return;
            }
            // Phát sự kiện xóa người dùng lên component cha (UserManagement)
            this.$emit("deleteUser", this.user._id); // Truyền _id để xóa
        }
    }
};
</script>
