<template>
    <div class="container">
        <h2>Quản lý nhà xuất bản</h2>

        <!-- Nút Thêm Nhà Xuất Bản -->
        <div class="mb-3">
            <button class="btn btn-success" @click="addPublisher">Thêm nhà xuất bản</button>
        </div>

        <div class="row">
            <div class="col-md-4">
                <PublisherList :publishers="publishers" v-model:activeIndex="activeIndex" />
            </div>
            <div class="col-md-8">
                <PublisherCard v-if="activePublisher" :publisher="activePublisher" />
                <PublisherForm 
                    v-if="activePublisher || isAdding"
                    :publisher="activePublisher || newPublisher"
                    @submit:publisher="savePublisher"
                    @delete:publisher="deletePublisher"
                />
            </div>
        </div>
    </div>
</template>

<script>
import PublisherList from "@/components/PublisherList.vue";
import PublisherCard from "@/components/PublisherCard.vue";
import PublisherForm from "@/components/PublisherForm.vue";
import PublisherService from "@/services/publisher.service.js";

export default {
    components: {
        PublisherList,
        PublisherCard,
        PublisherForm,
    },
    data() {
        return {
            publishers: [],
            activeIndex: -1,
            isAdding: false, // Kiểm tra trạng thái thêm mới
            newPublisher: {
                MaNXB: "", // Mã nhà xuất bản
                TenNXB: "",
                DiaChi: "",
                Email: "",
                SoDienThoai: "",
            },
        };
    },
    computed: {
        activePublisher() {
            return this.activeIndex !== -1 ? this.publishers[this.activeIndex] : null;
        },
    },
    async created() {
        await this.fetchPublishers();
    },
    methods: {
        async fetchPublishers() {
            try {
                this.publishers = await PublisherService.getAll();
            } catch (error) {
                console.error("Lỗi khi lấy danh sách nhà xuất bản:", error);
            }
        },
        addPublisher() {
            this.isAdding = true;
            this.activeIndex = -1; // Không chọn nhà xuất bản nào cả
        },
        async savePublisher(publisher) {
            try {
                if (publisher.MaNXB) {
                    await PublisherService.update(publisher.MaNXB, publisher);
                } else {
                    await PublisherService.create(publisher);
                }
                this.isAdding = false;
                await this.fetchPublishers();
            } catch (error) {
                console.error("Lỗi khi lưu nhà xuất bản:", error);
            }
        },
        async deletePublisher(publisherId) {
            try {
                await PublisherService.delete(publisherId);
                await this.fetchPublishers();
                this.activeIndex = -1;
                this.isAdding = false;
            } catch (error) {
                console.error("Lỗi khi xóa nhà xuất bản:", error);
            }
        },
    },
};
</script>
