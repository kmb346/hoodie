// Type definitions for data.
export type User = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    status: 'active' | 'inactive';
    joined:  Date;
    last_login: Date;
};

export type Staff = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: 'admin' | 'teacher' | 'all';
    status: 'active' | 'inactive';
};

export type Student = {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    dob: Date;
    grade: string;

};

export type Class = { 
    id: number;
    name: string;
    room_id: number;
    teacher_id: number;
    
};

export type Location = {
    id: number;
    name: string;
    postal_code: string;
    prefecture: string;
    city: string;
    address: string;
    building: string;
    phone: string;
};

export type Room = {
    id: number;
    name: string;
    location_id: number;
    type: string;
};

export type Class_session = {
    id: number;
    class_id: number;
    start_time: string;
    duration: number;
    room_id: number;
    assignment: string;
};

export type Class_record = {
    id: number;
    student_id: number;
    class_id: number;
    attended: 'yes' | 'no';
    early_late: number;
    note: string;
    assignment: 'yes' | 'no';
    score: number;
};

export type Class_credit = {
    id: number;
    student_id: number;
    session_id: number;
    amount: number;
    created_date: Date;
    expiry_date: Date;
    used_date: Date;
};

export type Assignment = {
    id: number;
    session_id: number;
    created_date: Date;
    due_date: Date;
};

export type Event = {
    id: number;
    type: String;
    student_id: number;
    credit_id: number;
    created_date: Date;
    updated_date: Date;
};