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
                <EmployeeCard 
                    v-if="activeEmployee && activeEmployee._id" 
                    :employee="activeEmployee" 
                    @deleteEmployee="deleteEmployee" 
                />
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
                _id: "", // Sử dụng _id thay vì MSNV
                HoTenNV: "",
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
                const employeesFromApi = await EmployeeService.getAll();
                this.employees = employeesFromApi.map(employee => ({
                    ...employee,
                    _id: employee._id || employee.MSNV, // Đảm bảo luôn có _id
                }));
                console.log("📌 Danh sách nhân viên đã tải:", this.employees);
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
                if (employee._id) {
                    await EmployeeService.update(employee._id, employee); // Dùng _id khi cập nhật
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
                if (!employeeId) {
                    console.error("❌ Lỗi: ID nhân viên cần xóa không hợp lệ!");
                    return;
                }
                await EmployeeService.delete(employeeId); // Dùng _id khi xóa
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
