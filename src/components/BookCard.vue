<template>
    <div v-if="book && book.MaSach" class="card p-3">
        <div class="p-1">
            <strong>Mã sách:</strong> {{ book.MaSach }}
        </div>
        <div class="p-1">
            <strong>Tên sách:</strong> {{ book.TenSach }}
        </div>
        <div class="p-1">
            <strong>Đơn giá:</strong> {{ book.DonGia }} VND
        </div>
        <div class="p-1">
            <strong>Số quyển:</strong> {{ book.SoQuyen }}
        </div>
        <div class="p-1">
            <strong>Năm xuất bản:</strong> {{ book.NamXuatBan }}
        </div>
        <div class="p-1">
            <strong>Nhà xuất bản:</strong> {{ book.MaNXB }}
        </div>
        <div class="p-1">
            <strong>Tác giả / Nguồn gốc:</strong> {{ book.TacGia }}
        </div>

        <!-- Nút xóa -->
        <button class="btn btn-danger mt-3" @click="deleteBook">Xóa</button>
    </div>
    <div v-else class="alert alert-warning">
        📌 Không có dữ liệu sách hợp lệ.
    </div>
</template>

<script>
export default {
    props: {
        book: { 
            type: Object, 
            required: true,
            default: () => ({}) // Đảm bảo luôn có object mặc định
        }
    },
    emits: ["deleteBook"],
    methods: {
        deleteBook() {
            if (!this.book || !this.book.MaSach) {
                console.error("❌ Lỗi: Không thể xóa, book hoặc MaSach không hợp lệ!", this.book);
                return;
            }
            console.log("📌 Xóa sách với ID:", this.book.MaSach);
            if (confirm("Bạn có chắc chắn muốn xóa sách này?")) {
                this.$emit("deleteBook", this.book.MaSach);
            }
        }
    }
};
</script>
