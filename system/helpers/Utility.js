'use strict';
const config = require('../../config/config').getConfig();
    module.exports.slugify = (text) => {
        return text.toString().toLowerCase()
            .replace(/\s+/g, '-') // Replace spaces with -
            .replace(/[^\w\-\.]+/g, '') // Remove all non-word chars
            .replace(/\-\-+/g, '-') // Replace multiple - with single -
            .replace(/^-+/, '') // Trim - from start of text
            .replace(/-+$/, ''); // Trim - from end of text
    };

module.exports.formatDate = (a, type, b) => {
    let date = new Date(a);
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    month = month.toString().length === 1 ? '0' + month : month;
    let day = date.getDate().toString().length === 1 ?
        '0' + date.getDate().toString() : date.getDate().toString();
    if (type == 1) {
        return day + '-' + month + '-' + year;
    }
    let h = date.getHours();
    let m = date.getMinutes();
    h = h.toString().length === 1 ? '0' + h : h;
    m = m.toString().length === 1 ? '0' + m : m;
    return year + '-' + month + '-' + day + 'T' + h + ':' + m;
}

module.exports.formatTime = (a, type, b) => {
    let date = new Date(a);
    let h = date.getHours();
    let m = date.getMinutes();
    h = h.toString().length === 1 ? '0' + h : h;
    m = m.toString().length === 1 ? '0' + m : m;
    if (type == 1) {
        return h + ':' + m + ':' + '00';
    }
    return '';
}

module.exports.index = (a, b) => a + 1;

module.exports.getEventStatus = (a, b) => {
    switch (a) {
        case config.EVENT_STATUS.WAITING:
            return 'Chờ duyệt';
        case config.EVENT_STATUS.APPROVED:
            return 'Đã duyệt';
        case config.EVENT_STATUS.WAITING:
            return 'Đã từ chối';
        default:
            break;
    }
}

module.exports.getRole = (a, b) => {
    switch (a) {
        case config.USER_ROLE.ADMIN:
            return 'Quản trị';
        case config.USER_ROLE.GENERAL_DIRECTOR:
            return 'Tổng giám đốc';
        case config.USER_ROLE.UNIT_DIRECTOR:
            return 'Giám đốc đơn vị';
        case config.USER_ROLE.MANAGER:
            return 'Trưởng ban';
        case config.USER_ROLE.EMPLOYEE:
            return 'Nhân viên';
        case config.USER_ROLE.STUDENT:
            return 'Sinh viên';
        default:
            break;
    }
}

module.exports.checkPermission = (userId, userRole, loginId, loginRole, b) => {
    if (loginRole == config.USER_ROLE.ADMIN) {
        if (userId.toString().toLowerCase() == loginId.toString().toLowerCase()) {
            return false;
        } else if(loginRole == userRole) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }   
}
