import { INavbarData } from "./helper";

export const navbarData:INavbarData[]=[
    {
        routeLink:'dashboard',
        icon:'fal fa-home',
        label:'Dashboard',
        roles:['Admin','Branch_Admin','Finance'],

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
        roles: ['Admin'],
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
        roles:['Admin','Branch_Admin','Finance'],
        items:[
            {
            routeLink:'products/list',
            icon:'fal fa-list',
            label:'Product List'
            },
            {
                routeLink:'products/ingredients-list',
                icon:'fal fa-list',
                label:'Ingredient List'
                },

            {
                routeLink:'products/availability',
                icon:'fal fa-list',
                label:'Availability'
                },

        ]
    },
    {
        routeLink:'order',
        icon:'far fa-cart-plus',
        label:'Order ',
        roles:['Admin','Branch_Admin','Finance'],
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
        roles:['Admin','Branch_Admin','Finance'],
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
        label:'Reward ',
        roles:['Admin','Branch_Admin','Finance'],

        items:[
            {
                routeLink:'reward/list',
                icon:'fal fa-list',
                label:'User List'
            },
        ]
    },

    {
        routeLink:'gallery',
        icon:'fal fa-camera',
        label:'Media ',
        roles:['Admin'],
        items:[
            {
            routeLink:'gallery/list',
            icon:'fal fa-list',
            label:'Media List'
            },

        ]

    },

    {
        routeLink:'branch',
        icon:'fal fa-user',
        label:'Branch ',
        roles:['Admin','Branch_Admin','Finance'],
        items:[
            {
            routeLink:'branch/list',
            icon:'fal fa-list',
            label:'Branch List'
            },

        ]
    },

    {
        routeLink:'settings',
        icon:'fal fa-cog',
        label:'Settings',
        roles:['Admin','Branch_Admin','Finance'],

        items:[
            {
            routeLink:'settings/profile',
            icon:'fal fa-user',
            label:'Profile'
            },
            {
                routeLink:'settings/karavan',
                icon:'fal fa-user',
                label:'Settings'
                },
            {
                routeLink:'logout',
                icon:'fal fa-power-off',
                label:'Logout'
            }
        ]
    },
]

