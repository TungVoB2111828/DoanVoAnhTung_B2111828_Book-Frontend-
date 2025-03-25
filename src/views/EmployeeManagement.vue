<template>
    <div class="container">
        <h2>Quản lý nhân viên</h2>

        <!-- Nút Thêm Nhân Viên -->
        <div class="mb-3">
            <button class="btn btn-success" @click="addEmployee">Thêm nhân viên</button>
        </div>

        <div class="row">
            <div class="col-md-4">
                <EmployeeList :employees="employees" v-model:activeIndex="activeIndex" />
            </div>
            <div class="col-md-8">
                <EmployeeCard v-if="activeEmployee" :employee="activeEmployee" />
                <EmployeeForm 
                    v-if="activeEmployee || isAdding" 
                    :employee="activeEmployee || newEmployee"
                    @submit:employee="saveEmployee"
                    @delete:employee="deleteEmployee"
                />
            </div>
        </div>
    </div>
</template>

<script>
import EmployeeList from "@/components/EmployeeList.vue";
import EmployeeCard from "@/components/EmployeeCard.vue";
import EmployeeForm from "@/components/EmployeeForm.vue";
import EmployeeService from "@/services/employee.service.js";

export default {
    components: {
        EmployeeList,
        EmployeeCard,
        EmployeeForm,
    },
    data() {
        return {
            employees: [],
            activeIndex: -1,
            isAdding: false,
            newEmployee: {
                MSNV: "", // Mã số nhân viên
                HoTen: "",
                ChucVu: "",
                Email: "",
                SoDienThoai: "",
            },
        };
    },
    computed: {
        activeEmployee() {
            return this.activeIndex !== -1 ? this.employees[this.activeIndex] : null;
        },
    },
    async created() {
        await this.fetchEmployees();
    },
    methods: {
        async fetchEmployees() {
            try {
                this.employees = await EmployeeService.getAll();
            } catch (error) {
                console.error("Lỗi khi lấy danh sách nhân viên:", error);
            }
        },
        addEmployee() {
            this.isAdding = true;
            this.activeIndex = -1; // Không chọn nhân viên nào cả
        },
        async saveEmployee(employee) {
            try {
                if (employee.MSNV) {
                    await EmployeeService.update(employee.MSNV, employee);
                } else {
                    await EmployeeService.create(employee);
                }
                this.isAdding = false;
                await this.fetchEmployees();
            } catch (error) {
                console.error("Lỗi khi lưu nhân viên:", error);
            }
        },
        async deleteEmployee(employeeId) {
            try {
                await EmployeeService.delete(employeeId);
                await this.fetchEmployees();
                this.activeIndex = -1;
                this.isAdding = false;
            } catch (error) {
                console.error("Lỗi khi xóa nhân viên:", error);
            }
        },
    },
};
</script>
