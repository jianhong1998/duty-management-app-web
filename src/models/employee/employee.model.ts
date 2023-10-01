export enum EmploymentType {
    FULL_TIME = 'Full Time',
    PART_TIME = 'Part Time'
}

export enum EmployeeRole {
    LEAD = 'Lead Service Crew',
    MID = 'Service Crew',
    JUNIOR = 'Junior Service Crew'
}

export interface IEmployee {
    id: number;
    name: string;
    employmentType: EmploymentType;
    role: EmployeeRole;
    contactNumber: number;
    isActive: boolean;
    weeklyAvailabilityTimeSlotIds: {
        mon: number | null;
        tue: number | null;
        wed: number | null;
        thu: number | null;
        fri: number | null;
        sat: number | null;
        sun: number | null;
    };
    createdAt?: string;
    updatedAt?: string;
}
