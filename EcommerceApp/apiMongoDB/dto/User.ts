// Thông tin giao hàng
export interface userAddressProps {
    _id?: string;
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    deliveryInfo: string;
    region: string;
    city: string;
}
// thông tin người dùng
export interface userModelParams {
    firstName: string;
    lastName: string;
    email: string;
    mobileNo: string;
    password: string;
    confirmPassword?: string;
    userAddressInfo: userAddressProps[];
    userId?: string;
}

export interface userLoginParams {
    email: string;
    password: string;
}

export interface userAddressParams {
    userAddressForm: userAddressProps;
    getUserId?: string;
}