<template>
    <div>
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
            <strong>Tác giả / Nguồn gốc:</strong> {{ book.NguonGocTacGia }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        book: { type: Object, required: true }
    }
};
</script>
