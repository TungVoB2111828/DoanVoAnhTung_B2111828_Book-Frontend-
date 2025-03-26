<template>
    <div v-if="publisher && publisher.MaNXB" class="card p-3">
        <div class="card-body">
            <h5 class="card-title">{{ publisher.TenNXB }}</h5>
            <p class="card-text"><strong>Địa chỉ:</strong> {{ publisher.DiaChi }}</p>

            <!-- Nút xóa -->
            <button class="btn btn-danger mt-3" @click="deletePublisher">Xóa</button>
        </div>
    </div>
    <div v-else class="alert alert-warning">
        📌 Không có dữ liệu nhà xuất bản hợp lệ.
    </div>
</template>

<script>
export default {
    props: {
        publisher: {
            type: Object,
            required: true,
            default: () => ({}) // Đảm bảo object luôn có giá trị
        }
    },
    emits: ["deletePublisher"], // Đảm bảo sự kiện được phát ra từ component con
    methods: {
        deletePublisher() {
            console.log("📌 ID nhà xuất bản cần xóa:", this.publisher._id); // Ghi log _id thay vì MaNXB
            if (!this.publisher._id) {
                console.error("❌ Lỗi: _id không hợp lệ!", this.publisher);
                return;
            }
            if (confirm("Bạn có chắc chắn muốn xóa nhà xuất bản này?")) {
                // Phát sự kiện xóa nhà xuất bản lên component cha (PublisherManagement)
                this.$emit("deletePublisher", this.publisher._id); // Truyền _id
            }
        }
    }
};
</script>
