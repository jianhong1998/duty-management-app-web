import { IEmployee } from '../../models/employee/employee.model';

export default class EmployeeMapUtil {
    public employeeIdMap: Map<IEmployee['id'], IEmployee>;

    constructor(employees: IEmployee[]) {
        this.employeeIdMap = new Map(
            employees.map((employee) => [employee.id, employee]),
        );
    }
}
