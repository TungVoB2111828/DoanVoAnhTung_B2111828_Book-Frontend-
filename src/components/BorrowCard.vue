<template>
    <div>
        <div class="p-1">
            <strong>Mã độc giả:</strong> {{ borrow.MaDocGia }}
        </div>
        <div class="p-1">
            <strong>Mã sách:</strong> {{ borrow.MaSach }}
        </div>
        <div class="p-1">
            <strong>Ngày mượn:</strong> {{ borrow.NgayMuon }}
        </div>
        <div class="p-1">
            <strong>Ngày trả:</strong> {{ borrow.NgayTra }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        borrow: { type: Object, required: true }
    }
};
</script>
