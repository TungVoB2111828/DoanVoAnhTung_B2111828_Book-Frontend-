<template>
    <div class="card">
        <div class="card-body">
            <h5 class="card-title">{{ employee.HoTenNV }}</h5>
            <p class="card-text"><strong>Chức vụ:</strong> {{ employee.ChucVu }}</p>
            <p class="card-text"><strong>Địa chỉ:</strong> {{ employee.DiaChi }}</p>
            <p class="card-text"><strong>Số điện thoại:</strong> {{ employee.SoDienThoai }}</p>

            <!-- Nút xóa -->
            <button class="btn btn-danger mt-3" @click="deleteEmployee">Xóa</button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        employee: { type: Object, required: true },
    },
    methods: {
        deleteEmployee() {
            console.log("📌 ID nhân viên cần xóa:", this.employee._id); // Sử dụng _id thay vì MSNV
            if (!this.employee._id) {
                console.error("❌ Lỗi: _id không hợp lệ!", this.employee);
                return;
            }
            // Phát sự kiện xóa nhân viên lên component cha (EmployeeManagement)
            this.$emit("deleteEmployee", this.employee._id); // Truyền _id để xóa
        }
    }
};
</script>
