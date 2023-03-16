const API = require('./api.user')

const routes = [
    {
        method: 'GET',
        path: '/test-get',
        config: API.userSignUp
    },
    {
        method: 'POST',
        path: '/test-delete',
        config: API.Delete
    },

    {
        method: 'POST',
        path: '/test-find',
        config: API.testfind
    },
    
    // Menu Start
    {
        method: 'POST',
        path: '/create-menu',
        config: API.createmenu
    },
    {
        method: 'POST',
        path: '/category-menu',
        config: API.findmenu
    },
    {
        method: 'POST',
        path: '/all-menu',
        config: API.findAllmenu
    },
    {
        method: 'POST',
        path: '/delete-menu',
        config: API.deletemenu
    },
    {
        method: 'POST',
        path: '/update-menu',
        config: API.updateMenu
    },
    // Menu End

    // Admin start
    {
        method: 'POST',
        path: '/create-admin',
        config: API.createadmin
    },
    {
        method: 'POST',
        path: '/auth-admin',
        config: API.authadmin
    },

    {
        method: 'POST',
        path: '/find-admin',
        config: API.findadmin
    },

    {
        method: 'POST',
        path: '/delete-admin',
        config: API.deleteAdmin
    },
    // Admin End

    // Order Start
    {
        method: 'POST',
        path: '/create-order',
        config: API.createorder
    },
    {
        method: 'POST',
        path: '/order',
        config: API.customerOrder
    },
    {
        method: 'POST',
        path: '/update-order-status',
        config: API.Order_statusUpdate
    },
    {
        method: 'POST',
        path: '/All-Order',
        config: API.oneOrder
    },
    {
        method: 'POST',
        path: '/get-Orders',
        config: API.getOrders
    },
    {
        method: 'POST',
        path: '/deliver-Orders',
        config: API.deliverOrder
    },
    //Order End

    //booking start
    {
        method: 'POST',
        path: '/create-booking',
        config: API.createbooking
    },
    {
        method: 'POST',
        path: '/booking',
        config: API.findAllBooking
    },
    {
        method: 'POST',
        path: '/delete-booking',
        config: API.deleteBooking
    },
    {
        method: 'POST',
        path: '/FindOne-booking',
        config: API.findOneBooking
    },
    {
        method: 'POST',
        path: '/booking_status-update',
        config: API.bkstatus_update
    },
    {
        method: 'POST',
        path: '/late_status-update',
        config: API.updateBklate
    },
    {
        method: 'POST',
        path: '/Create_time',
        config: API.createTime
    },
    {
        method: 'POST',
        path: '/Find_WalkIn',
        config: API.findOneWalkin
    },
    {
        method: 'POST',
        path: '/Find_time',
        config: API.findBktime
    },
    {
        method: 'POST',
        path: '/booking_time',
        config: API.Bktime
    },
    {
        method: 'POST',
        path: '/Delete_time',
        config: API.deleteBktime
    },
    //booking  end

    // Category start
    {
        method: 'POST',
        path: '/create-category',
        config: API.createCategory
    },
    {
        method: 'POST',
        path: '/find-category',
        config: API.findCategory
    },
    {
        method: 'POST',
        path: '/update-category',
        config: API.updateCategory
    },
    {
        method: 'POST',
        path: '/delete-category',
        config: API.deleteCategory
    },
    // Category end

    //table start
    {
        method: 'POST',
        path: '/create-table',
        config: API.createtable
    },
    {
        method: 'POST',
        path: '/findAll-table',
        config: API.findTable
    },
    {
        method: 'POST',
        path: '/update-table',
        config: API.updateTable
    },
    //table end

    //shop start
    {
        method: 'POST',
        path: '/create-shop',
        config: API.createshop
    },
    {
        method: 'POST',
        path: '/update-shop',
        config: API.UpdateShop
    },
    {
        method: 'POST',
        path: '/show-shop',
        config: API.findShop
    },
    {
        method: 'POST',
        path: '/loop-shop',
        config: API.createShopLoopImg
    },
    {
        method: 'POST',
        path: '/find-shop-img',
        config: API.findImg
    },
    {
        method: 'POST',
        path: '/delete-loop',
        config: API.deleteImg
    },
    //shopend
     
    {
        method: 'POST',
        path: '/report-and-excel',
        config: API.excelFile
    },

    {
        method: 'POST',
        path: '/QR-code',
        config: API.getQRcode
    },
]

module.exports = routes