<template>
    <div class="container">
        <h2>Quản lý mượn sách</h2>

        <!-- Nút thêm đơn mượn -->
        <button class="btn btn-primary mb-3" @click="addNewBorrow">+ Thêm đơn mượn</button>

        <div class="row">
            <div class="col-md-4">
                <BorrowList :borrows="borrows" @selectBorrow="selectBorrow" />
            </div>
            <div class="col-md-4">
                <BorrowCard v-if="selectedBorrow" :borrow="selectedBorrow" @deleteBorrow="deleteBorrow" />
            </div>
            <div class="col-md-4">
                <BorrowForm v-if="showForm || selectedBorrow" :borrow="selectedBorrow || {}" @saveBorrow="saveBorrow" />
            </div>
        </div>
    </div>
</template>

<script>
import BorrowList from "@/components/BorrowList.vue";
import BorrowCard from "@/components/BorrowCard.vue";
import BorrowForm from "@/components/BorrowForm.vue";
import BorrowService from "@/services/borrow.service.js";

export default {
    components: {
        BorrowList,
        BorrowCard,
        BorrowForm,
    },
    data() {
        return {
            borrows: [],
            selectedBorrow: null,
            showForm: false,
        };
    },
    async created() {
        await this.fetchBorrows();
    },
    methods: {
        async fetchBorrows() {
            try {
                this.borrows = await BorrowService.getAll();
            } catch (error) {
                console.error("Lỗi khi lấy danh sách đơn mượn:", error);
            }
        },
        selectBorrow(borrow) {
            this.selectedBorrow = borrow;
            this.showForm = false;
        },
        addNewBorrow() {
            this.selectedBorrow = null;
            this.showForm = true;
        },
        async saveBorrow(borrowData) {
            try {
                if (borrowData._id) {
                    await BorrowService.update(borrowData._id, borrowData);
                } else {
                    await BorrowService.create(borrowData);
                }
                await this.fetchBorrows();
                this.showForm = false;
            } catch (error) {
                console.error("Lỗi khi lưu đơn mượn:", error);
            }
        },
        async deleteBorrow(borrowId) {
            try {
                await BorrowService.delete(borrowId);
                await this.fetchBorrows();
                this.selectedBorrow = null;
            } catch (error) {
                console.error("Lỗi khi xóa đơn mượn:", error);
            }
        }
    }
};
</script>
