import { INavbarData } from "./helper";

export const navbarData:INavbarData[]=[
    {
        routeLink:'dashboard',
        icon:'fal fa-home',
        label:'Dashboard'
    },
    // {
    //     routeLink:'products',
    //     icon:'fal fa-box-open',
    //     label:'Products',
    //     items:[
    //         {
    //             routeLink:'products/list',
    //             label:'Product List',
    //             icon:'fal fa-minus',
    //         },
    //         {
    //             routeLink:'products/list',
    //             label:'Product List',
    //             icon:'fal fa-plus',
    //             items:[
    //                 {
    //                 routeLink:'products/list1',
    //                 label:'Product List2',
    //                 icon:'fal fa-plus'
    //                 },
    //                 {
    //                     routeLink:'products/list2',
    //                     label:'Product List2',
    //                     icon:'fal fa-plus'
    //                 }
    //             ]
    //         },
    //         {
    //             routeLink:'products/add',
    //             label:'Add Product',
    //             icon:'fal fa-plus'
    //         }
    //     ]
    // },
    // {
    //     routeLink:'statistics',
    //     icon:'fal fa-chart-bar',
    //     label:'Statistics'
    // },
    // {
    //     routeLink:'pages',
    //     icon:'fal fa-file',
    //     label:'Pages',
    // },
    // {
    //     routeLink:'media',
    //     icon:'fal fa-camera',
    //     label:'Media'
    // },
    // {
    //     routeLink:'settings',
    //     icon:'fal fa-cog',
    //     label:'Settings',
    //     items:[
    //         {
    //         routeLink:'settings/profile',
    //         icon:'fal fa-user',
    //         label:'Profile'
    //         },
    //         {
    //             routeLink:'settings/customize',
    //             icon:'fal fa-cog',
    //             label:'Customize'
    //         }
    //     ]
    // },

    {
        routeLink:'users',
        icon:'fal fa-user',
        label:'User ',
        items:[
            {
            routeLink:'users/manager',
            icon:'fal fa-users',
            label:'Managers List'
            },

            {
                routeLink:'users/branch-admins',
                icon:'fal fa-users',
                label:'Branch Admin'
                },

            {
                routeLink:'users/customer',
                icon:'fal fa-user',
                label:'Customers List'
                },
            // {
            //     routeLink:'users/add',
            //     icon:'fal fa-user-plus',
            //     label:'Add User'
            // },
            {
                routeLink:'users/trash',
                icon:'fal fa-trash',
                label:'Trash'
            }
        ]
    },

    {
        routeLink:'products',
        icon:'far fa-box-open',
        label:'Product ',
        items:[
            {
            routeLink:'products/list',
            icon:'fal fa-list',
            label:'Product List'
            },
            {
                routeLink:'products/add',
                icon:'fal fa-plus-circle',
                label:'Add Product'
            }
        ]
    },
    {
        routeLink:'order',
        icon:'far fa-cart-plus',
        label:'Order ',
        items:[
            {
                routeLink:'order/list',
                icon:'fal fa-list',
                label:'Order List'
            },
        ]
    },

    {
        routeLink:'category',
        icon:'fal fa-folder-open',
        label:'Category ',
        items:[
            {
            routeLink:'category/cat-list',
            icon:'fal fa-list',
            label:'Category List'
            },
            {
                routeLink:'category/sub-list',
                icon:'fal fa-list',
                label:'SubCategory List'
            }
        ]
    },
    {
        routeLink:'reward',
        icon:'fal fa-gift',
        label:'Reward '
    },

    {
        routeLink:'gallery',
        icon:'fal fa-camera',
        label:'Media ',
        items:[
            {
            routeLink:'gallery/list',
            icon:'fal fa-list',
            label:'Media List'
            },
            {
                routeLink:'gallery/add',
                icon:'fal fa-plus-circle',
                label:'Add Media'
            }
        ]

    },

    {
        routeLink:'branch',
        icon:'fal fa-user',
        label:'Branch ',
        items:[
            {
            routeLink:'branch/list',
            icon:'fal fa-list',
            label:'Branch List'
            },
            {
                routeLink:'branch/add',
                icon:'fal fa-plus-circle',
                label:'Add Branch'
            }
        ]
    },

    {
        routeLink:'settings',
        icon:'fal fa-cog',
        label:'Settings',
        items:[
            {
            routeLink:'settings/profile',
            icon:'fal fa-user',
            label:'Profile'
            },
            {
                routeLink:'settings/customize',
                icon:'fal fa-power-off',
                label:'Logout'
            }
        ]
    },
]