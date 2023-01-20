const API = require('./api.user')

const routes = [
    {
        method: 'GET',
        path: '/test-get',
        config: API.userSignUp
    },

    {
        method: 'GET',
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
        path: '/menu',
        config: API.findOnemenu
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
        config: API.Order
    },
    {
        method: 'POST',
        path: '/update-order',
        config: API.updateOrder
    },
    {
        method: 'POST',
        path: '/delete-order',
        config: API.deleteOrder
    },
    {
        method: 'POST',
        path: '/update-order-status',
        config: API.Order_statusUpdate
    },
    //Order End

    //booking start
    {
        method: 'POST',
        path: '/create-booking',
        config: API.createbooking
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
    //table end

    //shop start
    {
        method: 'POST',
        path: '/create-shop',
        config: API.createshop
    },
    //shopend
]

module.exports = routes